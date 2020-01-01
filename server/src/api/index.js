const express = require('express');

const samples = require('./samples');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/samples', samples);

module.exports = router;
