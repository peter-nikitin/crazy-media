const express = require('express');
const autoroutes = require('./internals/autoroutes');
const { postsToShow } = require('./utils/telegram/index.js');

const router = express.Router();

autoroutes(router);

router.get('/', (req, res) => {
  console.log(postsToShow);
  res.render('index', {
    ...postsToShow,
  });
});

module.exports = router;
