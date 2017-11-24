const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const path = require('path');
const createExpressApp = require('./create-express-app');

require('dotenv').config();

// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/profiles', express.static(path.join(__dirname, 'profiles')));
// app.use(bodyParser.json());

MongoClient.connect(process.env.DB_CONN, (err, db) => {

  console.log('connected to mongodb...');

  // app.listen(3000, () => {
  //   database = db;
  //   console.log('listening on port 3000..');
  // });

  createExpressApp(db)
    .listen(3000, () => {
      database = db;
      console.log('listening on port 3000...');
    });

});


