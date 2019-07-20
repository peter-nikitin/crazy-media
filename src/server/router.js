const express = require('express');
const autoroutes = require('./internals/autoroutes');
const { selectedPosts } = require('./helpers/getPostsFromDB');

const router = express.Router();

autoroutes(router);

router.get('/', (req, res) => {
  res.render('index', {
    selectedPosts,
  });
});

module.exports = router;
