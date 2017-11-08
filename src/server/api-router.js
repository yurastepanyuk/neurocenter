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
          admin: result.admin,
          role: result.role,
          enabled: result.enabled,
          userview: result.userview,
          email: result.email
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });

        return res.json({
          message: 'successfuly authenticated',
          token: token
        });
      });
  });

  /// presa-aboutus ROUTES ///

  router.get('/presa-aboutus', (req, res) => {
    const contactsCollection = database.collection('presa-aboutus');

    contactsCollection.find({}).toArray((err, docs) => {
      return res.json(docs);
    });
  });

  // router.post('/presaaboutusdelete', (req, res) => {
  //   const user = req.body;
  //   console.log('/presa-aboutus-delete');
  //
  //   res.send({delete: 'presa-aboutus-delete ' + req.body});
  //
  // });

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

  /// feedback ROUTES ///

  router.get('/feedback-clients', (req, res) => {
    const feedbackCollection = database.collection('feedback-clients');

    feedbackCollection.find({}).toArray((err, docs) => {
      return res.json(docs);
    });
  });

  router.post('/feedback-clients', (req, res) => {
    const feedback = req.body;

    const feedbackCollection = database.collection('feedback-clients');

    feedbackCollection.insertOne(feedback, (err, r) => {
      if (err) {
        return res.status(500).json({ error: 'Error inserting new record.' });
      }

      const newRecord = r.ops[0];

      return res.status(201).json(newRecord);
    });

  });

  router.put('/feedback-clients', (req, res) => {
    const updContent = req.body.data;
    const idObject = req.body.idObject;

    const feedbackCollection = database.collection('feedback-clients');

    const obId = new ObjectID(idObject);

    feedbackCollection
      .findOneAndUpdate({"_id": obId}, {
        $set: {
          context: updContent.context
        }
      }, {
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err);
        res.send(result)
      });

  });

  router.delete('/feedback-clients', (req, res) => {

    console.log('delete /feedback ' + req.body.idObject);

    const idObject = req.body.idObject;

    const feedbackCollection = database.collection('feedback-clients');

    const obId = new ObjectID(idObject);

    feedbackCollection
      .findOneAndDelete({"_id": obId}, (err, result) => {
        if (err) return res.send(err);
        res.send(result)
      });

  });

/// TEAM-CLINIC ROUTES ///

  router.get('/team-clinic', (req, res) => {
    const teamclinicCollection = database.collection('team-clinic');

    teamclinicCollection.find({}).toArray((err, docs) => {
      return res.json(docs);
    });
  });

  router.post('/team-clinic', (req, res) => {
    const teamclinic = req.body;

    const teamclinicCollection = database.collection('team-clinic');

    teamclinicCollection.insertOne(teamclinic, (err, r) => {
      if (err) {
        return res.status(500).json({ error: 'Error inserting new record.' });
      }

      const newRecord = r.ops[0];

      return res.status(201).json(newRecord);
    });

  });

  router.put('/team-clinic', (req, res) => {
    const updContent = req.body.data;
    const idObject = req.body.idObject;

    const teamclinicCollection = database.collection('team-clinic');

    const obId = new ObjectID(idObject);

    teamclinicCollection
      .findOneAndUpdate({"_id": obId}, {
        $set: {
          context: updContent.context
        }
      }, {
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err);
        res.send(result)
      });

  });

  router.delete('/team-clinic', (req, res) => {

    console.log('delete /team-clinic ' + req.body.idObject);

    const idObject = req.body.idObject;

    const teamclinicCollection = database.collection('team-clinic');

    const obId = new ObjectID(idObject);

    teamclinicCollection
      .findOneAndDelete({"_id": obId}, (err, result) => {
        if (err) return res.send(err);
        res.send(result)
      });

  });

  /// ABOUT-CLINIC ROUTES ///

  router.get('/about-clinic', (req, res) => {
    const aboutClinicCollection = database.collection('about-clinic');

    aboutClinicCollection.find({}).toArray((err, docs) => {
      return res.json(docs);
    });
  });

  router.post('/about-clinic', (req, res) => {
    const aboutClinic = req.body;

    const aboutClinicCollection = database.collection('about-clinic');

    aboutClinicCollection.insertOne(aboutClinic, (err, r) => {
      if (err) {
        return res.status(500).json({ error: 'Error inserting new record.' });
      }

      const newRecord = r.ops[0];

      return res.status(201).json(newRecord);
    });

  });

  router.put('/about-clinic', (req, res) => {
    const updContent = req.body.data;
    const idObject = req.body.idObject;

    const aboutClinicCollection = database.collection('about-clinic');

    const obId = new ObjectID(idObject);

    aboutClinicCollection
      .findOneAndUpdate({"_id": obId}, {
        $set: {
          context: updContent.context
        }
      }, {
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err);
        res.send(result)
      });

  });

  router.delete('/about-clinic', (req, res) => {

    console.log('delete /about-clinic ' + req.body.idObject);

    const idObject = req.body.idObject;

    const aboutClinicCollection = database.collection('about-clinic');

    const obId = new ObjectID(idObject);

    aboutClinicCollection
      .findOneAndDelete({"_id": obId}, (err, result) => {
        if (err) return res.send(err);
        res.send(result)
      });

  });

  // PREOPERATIVE-PREPARATION ROUTES //

  router.get('/preoperative-preparation', (req, res) => {
    const aboutClinicCollection = database.collection('preoperative-preparation');

    preoperativeCollection.find({}).toArray((err, docs) => {
      return res.json(docs);
    });
  });

  router.post('/preoperative-preparation', (req, res) => {
    const preoperative = req.body;

    const preoperativeCollection = database.collection('preoperative-preparation');

    preoperativeCollection.insertOne(aboutClinic, (err, r) => {
      if (err) {
        return res.status(500).json({ error: 'Error inserting new record.' });
      }

      const newRecord = r.ops[0];

      return res.status(201).json(newRecord);
    });

  });

  router.put('/preoperative-preparation', (req, res) => {
    const updContent = req.body.data;
    const idObject = req.body.idObject;

    const preoperativeCollection = database.collection('preoperative-preparation');

    const obId = new ObjectID(idObject);

    preoperativeCollection
      .findOneAndUpdate({"_id": obId}, {
        $set: {
          context: updContent.context
        }
      }, {
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err);
        res.send(result)
      });

  });

  router.delete('/preoperative-preparation', (req, res) => {

    console.log('delete /preoperative-preparation ' + req.body.idObject);

    const idObject = req.body.idObject;

    const preoperativeCollection = database.collection('preoperative-preparation');

    const obId = new ObjectID(idObject);

    preoperativeCollection
      .findOneAndDelete({"_id": obId}, (err, result) => {
        if (err) return res.send(err);
        res.send(result)
      });

  });

  return router;
}

module.exports = apiRouter;
