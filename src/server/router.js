const express = require('express');
const autoroutes = require('./internals/autoroutes');

const router = express.Router();

autoroutes(router);

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
