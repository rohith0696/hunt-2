const express = require('express')
const api = express.Router()
const teamModel = require('../../models/team.js')
const notfoundstring = 'team not found'
const bodyParser = require('body-parser');
const cons = require('consolidate');
api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: true }));

// RESPOND WITH JSON DATA  --------------------------------------------

// GET all JSON
api.get('/findall', (req, res) => {
    console.log(`Handling /findall ${req}`)
    teamModel.find({}, (err, data) => {
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
    teamModel.find({ teamid: id }, (err, results) => {
      if (err) { return res.end(notfoundstring) }
      res.json(results[0])
    })
  })
  
  // RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
api.get('/teams', async (req,res)=>{
  console.log(`Handling GET / ${req}`)
   await teamModel.find({},(err,data)=>{
        if (err) {
            return res.end('error on create')
        }
        res.locals.teams = data
        var teams = res.locals.teams;
        console.log(res.locals.teams, "teams are here")
        res.render('team/details', {title: 'teamslTest', teams})
    })
})

  
// GET create
api.get('/create', (req, res) => {
    console.log(`Handling GET /create ${req}`)
    teamModel.find({}, (err, data) => {
      res.locals.teams = data
      console.log(`teams ${res.locals.teams}`)
      res.locals.team = new Model()
      console.log(`team ${res.locals.team}`)
      res.render('team/create')
    })
  })

  // GET /delete/:id
  api.post('/delete/:id',(req, res)=>{
    console.log(req.params,'Handling delete')
    const id = parseInt(req.params.id)
    console.log(id,'id')
    teamModel.deleteOne({teamId:id}).setOptions({single:true}).exec((err, deleted) =>{
        if(err) {
            return res.end("Could not find the record to delete")
        }
        console.log(`RETURNING VIEW FOR ${JSON.stringify(deleted)}`)
        return res.redirect('/team/teams')
    })
})


api.post('/edit/:id', (req, res) => {
  console.log(`Handling EDIT`)
    const id = parseInt(req.params.id)
    teamModel.find({ teamId: id }, (err, results) => {
      if (err) { 
          return res.end(`Could not find the record`) 
        }
        const tname = 
        console.log(`RETURNING VIEW FOR${JSON.stringify(results)}`)
      res.locals.student = results[0]
      return res.render('team/teams')
    })
  })

  // RESPOND WITH DATA MODIFICATIONS 

  // POST new

  api.post('/save',(req,res)=>{
    console.log('into the save')
      const body = req.body
      console.log(body)
      const team = new teamModel(body)
      console.log(team,"body is here")
      team.save((err) => {
          if(err){
              return res.status().json({"msg": err})
          }else{
            return res.json({
                "error": false,
                data: team
            })
          }
      
      })
  })

// POST update with id
api.post('/save/:id', (req, res) => {
  console.log(`Handling SAVE request ${req}`)
    const id = parseInt(req.params.id)
    console.log(`Handling SAVING ID:${id}`)
    teamModel.updateOne({teamid: id },
      { 
        // use mongoose field update operator $set
        $set: {
          teamid: parseInt(req.body.teamid),
          teamname: req.body.teamname,
        }
      },
      (err, item) => {
        if (err) { return res.end(`Record with the specified id not found`) }
        console.log(`ORIGINAL VALUES ${JSON.stringify(item)}`)
        console.log(`UPDATED VALUES: ${JSON.stringify(req.body)}`)
        console.log(`SAVING UPDATED team ${JSON.stringify(item)}`)
        return res.redirect('/teamController')
      })
  })

  // DELETE id (uses HTML5 form method POST)
api.post('/delete/:id', (req, res) => {
  console.log(`Handling DELETE request ${req}`)
    const id = parseInt(req.params.id)
    console.log(`Handling REMOVING ID=${id}`)
    teamModel.remove({ teamid: id }).setOptions({ single: true }).exec((err, deleted) => {
      if (err) { return res.end(`Id not found`) }
      console.log(`Permanently deleted item ${JSON.stringify(deleted)}`)
      return res.redirect('/team/teams')
    })
  })

module.exports = api