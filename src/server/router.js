const express = require('express');
const autoroutes = require('./internals/autoroutes');
const selectedPosts = require('./db/selectedPosts');
const config = require('./config');

const { interval } = config;
const router = express.Router();

autoroutes(router);

router.get('/', (req, res) => {
  console.log(selectedPosts);
  res.render('index', {
    selectedPosts,
    interval,
  });
});

module.exports = router;
