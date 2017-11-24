const express = require('express');

function apiRouterOpen(database) {
  const router = express.Router();

  router.get('/presa-aboutus', (req, res) => {
    const contactsCollection = database.collection('presa-aboutus');

    contactsCollection.find({}).toArray((err, docs) => {
      return res.json(docs);
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

  /// TEAM-CLINIC ROUTES ///

  router.get('/team-clinic', (req, res) => {
    const teamclinicCollection = database.collection('team-clinic');

    teamclinicCollection.find({}).toArray((err, docs) => {
      return res.json(docs);
    });
  });

  /// ABOUT-CLINIC ROUTES ///

  router.get('/about-clinic', (req, res) => {
    const teamclinicCollection = database.collection('about-clinic');

    teamclinicCollection.find({}).toArray((err, docs) => {
      return res.json(docs);
    });
  });

  // PREOPERATIVE-PREPARATION ROUTES //

  router.get('/preoperative-preparation', (req, res) => {
    const preoperativeCollection = database.collection('preoperative-preparation');

    preoperativeCollection.find({}).toArray((err, docs) => {
      return res.json(docs);
    });
  });

  // MATERIALS ROUTES //

  router.get('/materials', (req, res) => {
    const materialsCollection = database.collection('materials');

    materialsCollection.find({}).toArray((err, docs) => {
      return res.json(docs);
    });
  });

  // CONTACTS-OUR ROUTES //

  router.get('/contacts-our', (req, res) => {
    const contactsOurCollection = database.collection('contacts-our');

    contactsOurCollection.find({}).toArray((err, docs) => {
      return res.json(docs);
    });
  });

  // ONLINE-CONSULTATION online-consultation ROUTES//

  router.get('/online-consultation', (req, res) => {
    const onlineConsultationCollection = database.collection('online-consultation');

    onlineConsultationCollection.find({}).toArray((err, docs) => {
      return res.json(docs);
    });
  });

  return router;
}

module.exports = apiRouterOpen;
