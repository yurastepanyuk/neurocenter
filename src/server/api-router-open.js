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
    const aboutClinicCollection = database.collection('preoperative-preparation');

    preoperativeCollection.find({}).toArray((err, docs) => {
      return res.json(docs);
    });
  });

  return router;
}

module.exports = apiRouterOpen;
