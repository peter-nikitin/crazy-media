const { models } = require('../db');

const getPosts = count => {
  models.Post.find({
    showen: false,
  })
    .limit(count)
    .sort({
      date: -1,
    })
    .exec(function(err, post) {
      if (err) return handleError(err);
      // Prints "Space Ghost is a talk show host."
      console.log(`${post}`);
    });
};
module.exports = getPosts;
