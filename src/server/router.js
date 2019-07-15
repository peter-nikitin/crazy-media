const express = require('express');
const autoroutes = require('./internals/autoroutes');

const getPosts = require('./utils/getPostsFromDB');

const router = express.Router();

autoroutes(router);

router.get('/', (req, res) => {
  getPosts(5);
  res.render('index');
});

module.exports = router;
