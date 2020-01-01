const express = require('express');
const Joi = require('joi');

// const db = require ('../db');
// const samples = db.get('samples');

const schema = Joi.object().keys({
  name: Joi.string().min(3).max(30).required(),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),

})


const router = express.Router();

router.get('/', (req, res) => {
  res.json([]);
});


router.get('/', (req, res, next) => {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    const {name, latitude, longitude} = req.body;
    const userSample = {
      name,
      latitude,
      longitude,
      date: new Date()
    }
    res.json([]);
  } else {
    next(result.error)
  }

});

module.exports = router;
