const http = require("http")
const express = require('express')
const app = express();
const engines = require('consolidate')
const path = require('path')
const port = process.env.PORT || 3000;
// process.title = myApp;

//set the root view folder
app.set('views', path.join(__dirname, './views'))

// specify desired view engine (EJS)
app.set('view engine', 'ejs')
app.engine('ejs', engines.ejs)

const router = require('./routes/router')
app.use('/', router)

app.listen(port,()=>
  {
    try{
    console.log(`\nApp running at http://localhost:3000/`)
  }catch(err)
  {
    console.error(err.message);
  }
  }
);

module.exports = router;