
const express = require('express')
const app = express();
const engines = require('consolidate')
const path = require('path')
//const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const expressLayouts = require('express-ejs-layouts')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
// process.title = myApp;

// app.use(bodyParser.json);
// app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config({ path: '.env' })
console.log('Environment variables loaded into process.env.')

const isProduction = process.env.NODE_ENV === 'production'
console.log(`Environment isProduction = ${isProduction}`)

//set the root view folder
app.set('views', path.join(__dirname, './views'))

// specify desired view engine (EJS)
app.set('view engine', 'ejs')
// app.engine('ejs', engines.ejs)

app.use(expressLayouts);
app.use(express.static("public"));

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
  if (err) { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)) }
  console.log('MongoDB connection succeeded.')
})

// Get the default connection
const connection = mongoose.connection

// Resusable function to seed a collection of documents
function seed(collectionName) {
  console.log(`Seeding collection = ${collectionName}`)
  connection.db.collection(collectionName, (err, c) => {
    if (err) { console.log('Error adding collection.') }
    c.countDocuments((err, count) => {
      if (err) { console.log('Error counting documents in collection.') }
      if (count === 0) { c.insertMany(require('./data/' + collectionName + '.json')) }
    })
    c.find({}).toArray((err, data) => {
      if (err) { console.log('Error adding data to collection.') }
      console.log(data)
    })
  })
}
// Mongoose connections emit events
connection.once('open', function () {
  console.log('MongoDB event open')
  console.log(`MongoDB connected ${dbURI}\n`)

  seed('user')
  seed('team')
})

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