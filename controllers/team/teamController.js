const express = require('express')
const api = express.Router()
const Model = require('../../models/team.js')
const notfoundstring = 'team not found'

// RESPOND WITH JSON DATA  --------------------------------------------

// GET all JSON
api.get('/findall', (req, res) => {
    console.log(`Handling /findall ${req}`)
    Model.find({}, (err, data) => {
        if(err){
            return res.end(notfoundstring)
        }
      res.json(data)
    })
  })
  
  // GET one JSON by ID
  api.get('/findone/:id', (req, res) => {
    console.log(`Handling /findone ${req}`)
    const id = parseInt(req.params.id)
    Model.find({ _id: id }, (err, results) => {
      if (err) { return res.end(notfoundstring) }
      res.json(results[0])
    })
  })
  
  // RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
api.get('/', (req, res) => {
    console.log(`Handling GET / ${req}`)
    Model.find({}, (err, data) => {
        if (err) {
            return res.end('error on create')
        }
      res.locals.team = data
      res.render('user/index.ejs')
    })
  })
  
// GET create
api.get('/create', (req, res) => {
    console.log(`Handling GET /create ${req}`)
    Model.find({}, (err, data) => {
      res.locals.team = data
      res.locals.team = new Model()
      res.render('team/create')
    })
  })

  // GET /delete/:id
  api.get('/delete/:id',(req, res)=>{
    console.log(`Handling GET /delete/:id ${req}`)
    const id = parseInt(req.params.id)
    TeamModel.find({teamid:id},(err, results) =>{
        if(err) {
            return res.end(`Could not find the record to delete`)
        }
        console(`RETURNING VIEW FOR ${JSON.stringify(results)}`)
        res.locals.team = results[0]
        return res.render(`team/delete.ejs`)
    })
})


module.exports = api