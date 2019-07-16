const { models } = require('../db');

const savePostsToView = function savePostsToView(err, posts) {};

const getPosts = async count => {
  const resultPost = {};
  await models.Post.find({
    showen: false,
  })
    .limit(count)
    .sort({
      date: -1,
    })
    .exec(function(err, post) {
      post.forEach(function(post) {
        resultPost[post.post_id] = post;
      });
    });
  //  console.log(resultPost);
  return resultPost;
};
module.exports = getPosts;

// function(err, post) {
//   if (err) return handleError(err);
//   // Prints "Space Ghost is a talk show host."
//   return
//   console.log(`${post}`);
//   // Object.assign({}, post, resultPost);
// }
