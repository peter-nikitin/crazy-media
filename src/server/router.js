const express = require('express');
const autoroutes = require('./internals/autoroutes');
const { selectedPosts } = require('./utils/getPostsFromDB');

const router = express.Router();

autoroutes(router);

router.get('/', (req, res) => {
  console.log(selectedPosts);
  res.render('index', {
    selectedPosts,
  });
});

module.exports = router;
