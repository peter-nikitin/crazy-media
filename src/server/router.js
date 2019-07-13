const express = require('express');
const autoroutes = require('./internals/autoroutes');
const telegram = require('./utils/telegram/index.js');

const router = express.Router();

autoroutes(router);

router.get('/', (req, res) => {
  telegram();
  res.render('index');
});

module.exports = router;
