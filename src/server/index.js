const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const path = require('path');

require('dotenv').config();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/profiles', express.static(path.join(__dirname, 'profiles')));
app.use(bodyParser.json());

MongoClient.connect(process.env.DB_CONN, (err, db) => {

  console.log('connected to mongodb...');

  app.listen(3000, () => {
    database = db;
    console.log('listening on port 3000..');
  });

});

// app.get('*', (req, res) => {
//   return res.sendFile(path.join(__dirname, 'public/index.html'))
// });

app.get('/api/presa-aboutus', (req, res) => {
  const contactsCollection = database.collection('presa-aboutus');

  contactsCollection.find({}).toArray((err, docs) => {
    return res.json(docs);
  });
});

app.post('/api/presa-aboutus', (req, res) => {
  const user = req.body;

  const contactsCollection = database.collection('presa-aboutus');

  contactsCollection.insertOne(user, (err, r) => {
    if (err) {
      return res.status(500).json({ error: 'Error inserting new record.' });
    }

    const newRecord = r.ops[0];

    return res.status(201).json(newRecord);
  });

});
