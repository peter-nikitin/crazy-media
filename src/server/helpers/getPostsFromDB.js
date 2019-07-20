const { models } = require('../db');

const selectedPosts = {};

const getPosts = count =>
  models.Post.find({
    showen: false,
  })
    .limit(count)
    .sort({
      date: -1,
    })
    .populate('channel')
    .exec((err, posts) => {
      if (err) {
        console.log(err);
      }
      posts.forEach(elem => {
        selectedPosts[elem.id] = {
          message: elem.message,
          url: elem.url,
          imgUrl: elem.imgUrl,
          channelTitle: elem.channel.title,
          channellink: elem.channel.name,
        };
      });
    });

const savePostsToView = count => {
  const resultPosts = getPosts(count);
  return resultPosts;
};

module.exports = { savePostsToView, selectedPosts };
