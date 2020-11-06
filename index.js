const express = require('express')
const app = express();
const engines = require('consolidate')
const path = require('path')
const port = 8000;

//set the root view folder
app.set('views', path.join(__dirname, './views'))

// specify desired view engine (EJS)
app.set('view engine', 'ejs')
app.engine('ejs', engines.ejs)

const router = require('./routes/router')
app.use('/', router)

app.listen(port,()=>
  {
    console.log(`\nApp running at localhost:${port}!`)
  }
);