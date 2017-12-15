const express = require('express');
const jwt =require('jsonwebtoken');
const bcrypt = require('bcrypt');
const checkJwt = require('express-jwt');
const ObjectID = require('mongodb-core').BSON.ObjectID;
const actions = require('./actions');

function apiRouter(database) {
  const router = express.Router();

  router.use(
    checkJwt({ secret: process.env.JWT_SECRET }).unless({ path: '/api/authenticate'})
  );

  router.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send({ error: err.message }) ;
    }
  });

  router.post('/authenticate', (req, res) => {
    const user = req.body;
    console.log(user);
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

    var idObject;

    if (req.body) {
      idObject = req.body.idObject;
    }

    if (req.query) {
      idObject = req.query.id;
    }

    console.log('delete /presa-aboutus: ' + idObject);

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

    var idObject;

    if (req.body) {
      idObject = req.body.idObject;
    }

    if (req.query) {
      idObject = req.query.id;
    }

    console.log('delete /feedback-clients ' + idObject);

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

    var idObject;

    if (req.body) {
      idObject = req.body.idObject;
    }

    if (req.query) {
      idObject = req.query.id;
    }
    console.log('delete /team-clinic ' + idObject);

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

    var idObject;

    if (req.body) {
      idObject = req.body.idObject;
    }

    if (req.query) {
      idObject = req.query.id;
    }

    console.log('delete /about-clinic ' + idObject);

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
    const preoperativeCollection = database.collection('preoperative-preparation');

    preoperativeCollection.find({}).toArray((err, docs) => {
      return res.json(docs);
    });
  });

  router.post('/preoperative-preparation', (req, res) => {
    const preoperative = req.body;

    const preoperativeCollection = database.collection('preoperative-preparation');

    preoperativeCollection.insertOne(preoperative, (err, r) => {
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

    var idObject;

    if (req.body) {
      idObject = req.body.idObject;
    }

    if (req.query) {
      idObject = req.query.id;
    }

    console.log('delete /preoperative-preparation ' + idObject);

    const preoperativeCollection = database.collection('preoperative-preparation');

    const obId = new ObjectID(idObject);

    preoperativeCollection
      .findOneAndDelete({"_id": obId}, (err, result) => {
        if (err) return res.send(err);
        res.send(result)
      });

  });

  // MATERIALS ROUTES //

  router.get('/materials', (req, res) => {
    const materialsCollection = database.collection('materials');

    materialsCollection.find({}).toArray((err, docs) => {
      return res.json(docs);
    });
  });

  router.post('/materials', (req, res) => {
    const materials = req.body;

    const materialsCollection = database.collection('materials');

    materialsCollection.insertOne(materials, (err, r) => {
      if (err) {
        return res.status(500).json({ error: 'Error inserting new record.' });
      }

      const newRecord = r.ops[0];

      return res.status(201).json(newRecord);
    });

  });

  router.put('/materials', (req, res) => {
    const updContent = req.body.data;
    const idObject = req.body.idObject;

    const materialsCollection = database.collection('materials');

    const obId = new ObjectID(idObject);

    materialsCollection
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

  router.delete('/materials', (req, res) => {

    var idObject;
    // if (req.body.idObject) {
    //   console.log('delete /materials ' + req.body.idObject);
    // }


    if (req.body) {
      console.log('delete /materials params: There is the body');
      idObject = req.body.idObject;
    }

    // if (req.body.params) {
    //   console.log('delete /materials params: There is req.body.params' + req.body.params);
    // }

    // if (req.params) {
    //   console.log('delete /materials params: There is req.params' + JSON.stringify(req.params, null, 2));
    // }

    if (req.query) {
      console.log('delete /materials params: There is req.query' + JSON.stringify(req.query, null, 2));
      console.log('delete /materials params: There is req.query.id' + req.query.id);
      idObject = req.query.id;
    }
    //
    // const idObject = req.body.idObject;

    const materialsCollection = database.collection('materials');

    const obId = new ObjectID(idObject);

    materialsCollection
      .findOneAndDelete({"_id": obId}, (err, result) => {
        if (err) return res.send(err);
        res.send(result)
      });

  });

  // CONTACTS-OUR ROUTES //

  router.get('/contacts-our', (req, res) => {
    const contactsOurCollection = database.collection('contacts-our');

    contactsOurCollection.find({}).toArray((err, docs) => {
      return res.json(docs);
    });
  });

  router.post('/contacts-our', (req, res) => {
    const contactsOur = req.body;

    const contactsOurCollection = database.collection('contacts-our');

    contactsOurCollection.insertOne(contactsOur, (err, r) => {
      if (err) {
        return res.status(500).json({ error: 'Error inserting new record.' });
      }

      const newRecord = r.ops[0];

      return res.status(201).json(newRecord);
    });

  });

  router.put('/contacts-our', (req, res) => {
    const updContent = req.body.data;
    const idObject = req.body.idObject;

    const contactsOurCollection = database.collection('contacts-our');

    const obId = new ObjectID(idObject);

    contactsOurCollection
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

  router.delete('/contacts-our', (req, res) => {

    var idObject;

    if (req.body) {
      idObject = req.body.idObject;
    }

    if (req.query) {
      idObject = req.query.id;
    }

    console.log('delete /contacts-our ' + idObject);

    const contactsOurCollection = database.collection('contacts-our');

    const obId = new ObjectID(idObject);

    contactsOurCollection
      .findOneAndDelete({"_id": obId}, (err, result) => {
        if (err) return res.send(err);
        res.send(result)
      });

  });

  // ONLINE-CONSULTATION online-consultation ROUTES//

  router.get('/online-consultation', (req, res) => {
    const onlineConsultationCollection = database.collection('online-consultation');

    onlineConsultationCollection.find({}).toArray((err, docs) => {
      return res.json(docs);
    });
  });

  router.post('/online-consultation', (req, res) => {
    const onlineConsultation = req.body;

    const onlineConsultationCollection = database.collection('online-consultation');

    onlineConsultationCollection.insertOne(onlineConsultation, (err, r) => {
      if (err) {
        return res.status(500).json({ error: 'Error inserting new record.' });
      }

      const newRecord = r.ops[0];

      return res.status(201).json(newRecord);
    });

  });

  router.put('/online-consultation', (req, res) => {
    const updContent = req.body.data;
    const idObject = req.body.idObject;

    const onlineConsultationCollection = database.collection('online-consultation');

    const obId = new ObjectID(idObject);

    onlineConsultationCollection
      .findOneAndUpdate({"_id": obId}, {
        $set: {
          answers: updContent.answers
        }
      }, {
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err);
        res.send(result)
      });

  });

  router.delete('/online-consultation', (req, res) => {

    var idObject;

    if (req.body) {
      idObject = req.body.idObject;
    }

    if (req.query) {
      idObject = req.query.id;
    }

    console.log('delete /online-consultation ' + idObject);

    const onlineConsultationCollection = database.collection('online-consultation');

    const obId = new ObjectID(idObject);

    onlineConsultationCollection
      .findOneAndDelete({"_id": obId}, (err, result) => {
        if (err) return res.send(err);
        res.send(result)
      });

  });

  // SCHEDULE //

  router.get('/schedule', (req, res) => {


    const schedulenCollection = database.collection('schedule');

    scheduleCollection.find({}).toArray((err, docs) => {
      return res.json(docs);
    });
  });

  router.post('/schedule', (req, res) => {
    const schedule = req.body;

    const scheduleCollection = database.collection('schedule');

    scheduleCollection.insertOne(schedule, (err, r) => {
      if (err) {
        return res.status(500).json({ error: 'Error inserting new record.' });
      }

      const newRecord = r.ops[0];

      return res.status(201).json(newRecord);
    });

  });

  router.put('/schedule', (req, res) => {
    const updContent = req.body.data;
    const idObject = req.body.idObject;

    const scheduleCollection = database.collection('schedule');

    const obId = new ObjectID(idObject);

    scheduleCollection
      .findOneAndUpdate({"_id": obId}, {
        $set: {
          answers: updContent.answers
        }
      }, {
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err);
        res.send(result)
      });

  });

  router.delete('/schedule', (req, res) => {

    var idObject;

    if (req.body) {
      idObject = req.body.idObject;
    }

    if (req.query) {
      idObject = req.query.id;
    }

    console.log('delete /schedule ' + idObject);

    const scheduleCollection = database.collection('schedule');

    const obId = new ObjectID(idObject);

    scheduleCollection
      .findOneAndDelete({"_id": obId}, (err, result) => {
        if (err) return res.send(err);
        res.send(result)
      });

  });

  // OFFLINE-CONSULTATION ROUTES//

  router.get('/offline-consultation', (req, res) => {

    var dateStart;
    var dateEnd;

    if (req.query) {
      dateStart = req.query.dateStart;
      dateEnd = req.query.dateEnd;
    }

    dateStart = new Date(2017, 12, 5);
    dateEnd = new Date(2017, 12, 6);

    const offlineConsultationCollection = database.collection('offline-consultation');

    offlineConsultationCollection.find({
      dateConsultation: {
        $gte: dateStart,
        $lt: dateEnd
      }
      }).toArray((err, docs) => {
      return res.json(docs);
    });
  });

  router.post('/offline-consultation', (req, res) => {
    const offlineConsultation = req.body;

    const offlineConsultationCollection = database.collection('offline-consultation');

    offlineConsultationCollection.insertOne(offlineConsultation, (err, r) => {
      if (err) {
        return res.status(500).json({ error: 'Error inserting new record.' });
      }

      const newRecord = r.ops[0];

      return res.status(201).json(newRecord);
    });

  });

  router.put('/offline-consultation', (req, res) => {
    const updContent = req.body.data;
    const idObject = req.body.idObject;

    const onlineConsultationCollection = database.collection('offline-consultation');

    const obId = new ObjectID(idObject);

    onlineConsultationCollection
      .findOneAndUpdate({"_id": obId}, {
        $set: {
          answers: updContent.answers
        }
      }, {
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err);
        res.send(result)
      });

  });

  router.delete('/offline-consultation', (req, res) => {

    var idObject;

    if (req.body) {
      idObject = req.body.idObject;
    }

    if (req.query) {
      idObject = req.query.id;
    }

    console.log('delete /online-consultation ' + idObject);

    const onlineConsultationCollection = database.collection('offline-consultation');

    const obId = new ObjectID(idObject);

    onlineConsultationCollection
      .findOneAndDelete({"_id": obId}, (err, result) => {
        if (err) return res.send(err);
        res.send(result)
      });

  });


  // MAIL //

  router.post('/sendmail', actions.sendMail);

  return router;
}

module.exports = apiRouter;
