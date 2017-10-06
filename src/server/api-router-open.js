const express = require('express');

function apiRouterOpen(database) {
  const router = express.Router();

  router.get('/presa-aboutus', (req, res) => {
    const contactsCollection = database.collection('presa-aboutus');

    contactsCollection.find({}).toArray((err, docs) => {
      return res.json(docs);
    });
  });

  return router;
}

module.exports = apiRouterOpen;
