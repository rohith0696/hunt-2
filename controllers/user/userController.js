const express = require('express')
const api = express.Router()
const bcrypt = require('bcrypt')

const bodyParser = require('body-parser');
api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: true }));
const Model = require('../../models/user')

api.post('/try', (req,res) => {
    console.log("login here")
   Model.findOne({"email": req.body.email}).then(user => {
     if(!user) res.status(404).json({'err': "user not there"})
     else{
       bcrypt.compare(req.body.password, user.password, (error, match) => {
         if(error) res.status(500).json(error)
         if(match) res.status(200).json({"user": user})
       })
     }
   })
   .catch(err => {
     console.log(err,"error is here")
   })
 })

api.post('/signup',async(req,res)=>{
    const body = req.body
    const user = new Model(body)
    console.log(user,"body is here")
    await user.save((err) => {
        if(err){
            return res.status().json({"msg": err})
        }else{
          return res.json({
              "error": false,
              data: user
          })
        }
      9
    })
})

module.exports = api