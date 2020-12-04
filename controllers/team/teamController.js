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
      return res.render('team/create')
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


api.post('/edit/:teamId', (req, res) => {
  console.log(`Handling EDIT`)
    var teamid= req.params.teamId
    console.log(teamid)

    teamModel.find({ teamId: teamid }, (err, results) => {
      if (err) { return res.end('could not find') }
      // res.json(results[0])
      console.log(results) 
      // res.locals.student = results[0]
      var teamName = results[0].teamName;
      res.render('team/edit.ejs',{ teamid, teamName})
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
            console.log("team save")
          //   res.render('team/details')
          //  return res.redirect("team/teams")
            return res.json({
                "error": false,
                data: team
            })
          }
      
      })
  })

// POST update with id
api.post('/update/:id', (req, res) => {
  console.log(` update request ${req.body}`)
    const tId = parseInt(req.params.id)
    // console.log(`Handling SAVING ID:${id}`)
    console.log(tId)
    console.log(req.body.tName)
    teamModel.updateOne({teamId: tId },
      { 
        // use mongoose field update operator $set
        $set: {
          teamName: req.body.tName
        }
      },
      (err, item) => {
        if (err) { return res.end(`Record with the specified id not found`) }
        // console.log(`ORIGINAL VALUES ${JSON.stringify(item)}`)
        // console.log(`UPDATED VALUES: ${JSON.stringify(req.body)}`)
        // console.log(`SAVING UPDATED team ${JSON.stringify(item)}`)
        return res.redirect('/team/teams')
      })
  })



module.exports = api