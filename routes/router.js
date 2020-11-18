const express = require('express')
const path = require ('path')
const router = express.Router()
const axios = require('axios')



router.get('/',(req,res)=>
{
    res.render('./user/loginpage',{ title: 'Login', layout: false })
})

router.get('/index', (req, res) => {
    res.render('./user/loginpage', { title: 'Login', layout: false})
  })

  router.get('/Home', (req, res, next) => {
    res.render('./partials/index', { title: 'The Hunt' })
  })
  
  router.get('/user/Login', (req, res, next) => {
    res.render('./user/loginpage', { title: 'Login', layout: false})
  })
  
  router.get('/user/Register', (req, res, next) => {
    res.render('./user/signuppage', { title: 'Register', layout: false})
  })
  
  router.get('/user/forgotpassword', (req, res, next) => {
    res.render('./user/forgotpassword', { title: 'Forgot password', layout: false})
  })
  
  router.get('/user/forgotemail', (req, res, next) => {
    res.render('./user/forgotemail', { title: 'Fotgot email', layout: false})
  })
  
  router.get('/user/newPassword', (req, res, next) => {
    res.render('./user/newpassword', { title: 'New Password', layout: false})
  })
  
  router.get('/404' , (req, res, next) => {
    res.render('./partials/error', { title: 'Error', layout: false})
  })
  
  router.get('/create_competition', (req, res, next) => {
    res.render('./competition/create', { title: 'Register'})
  })
  
  router.get('/createScreen', (req, res, next) => {
    res.render('createScreen', { title: 'Create Screen'})
  })
  
  router.get('/quest/createQuest', (req, res, next) => {
    res.render('./quest/create', { title: "Quest"})
  })
  
  router.get('/user/profile', (req, res, next) => {
    res.render('./player/details', { title: "profile"})
  })
  
  // router.get('/team/getTeam',(req,res, next) => {
  //   res.render('./team/details', { title: "Teams", require: axios, teams: teams})
  // })
  
  router.get('/team', (req, res, next) => {
    res.render('./team/create', { title: "Team", require: axios})
  })
  
  // router.get('/team/details', (req, res, next) => {
  //   res.render('./team/details')
  // })
  
  router.get('/team/invitePlayers', (req, res, next) => {
    res.render('./team/invitePlayers', { title: "Invite Players"})
  }) 
  router.get('/location/delete', (req, res, next) => {
    res.render('./location/delete', { title: "Locationdelete"})
  })

  // Route requests that start with an expression to a controller
  router.use('/user',require('../controllers/user/userController'))
  router.use('/team',require('../controllers/team/teamController'))

  // catch 404 and forward to error handler
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

// error handler
// router.use((err, req, res, next) => {
//   // render the error page
//   res.status(err.status || 500)
//   res.render('error', { status: err.status, message: err.message })
// })

module.exports = router;