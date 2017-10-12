const express = require('express');
const jwt =require('jsonwebtoken');
const bcrypt = require('bcrypt');
const checkJwt = require('express-jwt');
const ObjectID = require('mongodb-core').BSON.ObjectID;

function apiRouter(database) {
  const router = express.Router();

  router.use(
    checkJwt({ secret: process.env.JWT_SECRET }).unless({ path: '/api/authenticate'})
  );

  router.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send({ error: err.message });
    }
  });

  router.get('/presa-aboutus', (req, res) => {
    const contactsCollection = database.collection('presa-aboutus');

    contactsCollection.find({}).toArray((err, docs) => {
      return res.json(docs);
    });
  });

  router.post('/presaaboutusdelete', (req, res) => {
    const user = req.body;
    console.log('/presa-aboutus-delete');

    res.send({delete: 'presa-aboutus-delete ' + req.body});

  });

  router.post('/presa-aboutus', (req, res) => {
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

  router.post('/authenticate', (req, res) => {
    const user = req.body;

    const usersCollection = database.collection('users');

    usersCollection
      .findOne({ username: user.username }, (err, result) => {
        if (!result) {
          return res.status(404).json({ error: 'user not found' })
        }

        if (!bcrypt.compareSync(user.password, result.password)) {
          return res.status(401).json({ error: 'incorrect password '});
        }

        const payload = {
          username: result.username,
          admin: result.admin
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });

        return res.json({
          message: 'successfuly authenticated',
          token: token
        });
      });
  });

  router.put('/presa-aboutus', (req, res) => {
    const updContent = req.body.data;
    const idObject = req.body.idObject;

    const contactsCollection = database.collection('presa-aboutus');

    const obId = new ObjectID(idObject);

    contactsCollection
      .findOneAndUpdate({"_id": obId}, {
        $set: {
          headerTopic: updContent.headerTopic,
          context: updContent.context,
          typecontent: updContent.typecontent,
          idcontent: updContent.idcontent
        }
      }, {
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err);
        res.send(result)
      });

  });


  router.delete('/presa-aboutus', (req, res) => {

    console.log('delete /presa-aboutus ' + req.body.idObject);

    const idObject = req.body.idObject;

    const contactsCollection = database.collection('presa-aboutus');

    const obId = new ObjectID(idObject);

    contactsCollection
      .findOneAndDelete({"_id": obId}, (err, result) => {
        if (err) return res.send(err);
        res.send(result)
      });

  });


  return router;
}

module.exports = apiRouter;
