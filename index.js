const http = require("http")
const express = require('express')
const app = express();
const engines = require('consolidate')
const path = require('path')
const port = process.env.PORT || 3000;
const dotenv = require('dotenv')
const mongoose = require('mongoose')
// process.title = myApp;


dotenv.config({ path: '.env' })
console.log('Environment variables loaded into process.env.')

const isProduction = process.env.NODE_ENV === 'production'
console.log(`Environment isProduction = ${isProduction}`)

//set the root view folder
app.set('views', path.join(__dirname, './views'))

// specify desired view engine (EJS)
app.set('view engine', 'ejs')
app.engine('ejs', engines.ejs)

const router = require('./routes/router')
app.use('/', router)


// Connect to NoSQL datastore........................

// choose the connection
const dbURI = isProduction ? encodeURI(process.env.ATLAS_URI) : encodeURI(process.env.LOCAL_MONGODB_URI)
console.log('MongoDB URL = ' + dbURI)

// get dbName
const DB_NAME = process.env.DB_NAME

// set connection options
const connectionOptions = {
  dbName: DB_NAME,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}

// use mongoose to connect & create a default connection
mongoose.connect(dbURI, connectionOptions, (err, client) => {
  if (err) { LOG.error('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)) }
  console.log('MongoDB connection succeeded.')
})

// Get the default connection
const connection = mongoose.connection


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