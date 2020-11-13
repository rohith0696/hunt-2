const express = require('express')
const api = express.Router()

const bodyParser = require('body-parser');
api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: true }));
const Model = require('../../models/user')

api.post('/Register',(req,res)=>{
    const body = req.body
    const user = new Model(body)
    console.log(user,"body is here")
    user.save((err) => {
        if(err){
            return res.status().json({"msg": err})
        }else{
          return res.json({
              "error": false,
              data: user
          })
        }
      
    })
})

module.exports = api