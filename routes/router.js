const express = require('express')
const path = require ('path')
const router = express.Router()

router.get('/',(req,res)=>
{
    res.render('./user/loginpage',{ title: 'Login', layout: false })
})

module.exports = router;