const { models } = require('../db');

const selectedPosts = {};

const getPosts = count => {
  return models.Post.find({
    showen: false,
  })
    .limit(count)
    .sort({
      date: -1,
    })
    .exec(function(err, posts) {
      posts.forEach(elem => {
        selectedPosts[elem] = elem;
      });
      // console.log(selectedPosts);
    });
};

const savePostsToView = count => {
  const resultPosts = getPosts(count);
  // Object.assign({}, resultPosts, posts);
  return resultPosts;
};
console.log(selectedPosts);
module.exports = { savePostsToView, selectedPosts };

// function(err, post) {
//   if (err) return handleError(err);
//   // Prints "Space Ghost is a talk show host."
//   return
//   console.log(`${post}`);
//   // Object.assign({}, post, resultPost);
// }
