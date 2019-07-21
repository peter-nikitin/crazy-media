const { models } = require('../db');

const selectedPosts = {};

const getPosts = count => {
  return models.Post.find({
    showen: false,
  })
    .sort({
      date: -1,
    })
    .limit(count)
    .populate('channel')
    .exec((err, posts) => {
      if (err) {
        console.log(err);
      }

      // selectedPosts = {};
      posts.forEach((elem, index) => {
        selectedPosts[index] = {
          id: elem._id,
          message: elem.message,
          url: elem.url,
          imgUrl: elem.imgUrl,
          channelTitle: elem.channel.title,
          channellink: elem.channel.name,
        };
      });
      // console.log(Object.keys(selectedPosts));

      for (let index = 0; index < Object.keys(selectedPosts).length; index++) {
        const elem = selectedPosts[Object.keys(selectedPosts)[index]];
        const updated = models.Post.findByIdAndUpdate(
          elem.id,
          { showen: true },
          { new: true }
        );
        updated.then(e => console.log(e));
      }
    });
};

const savePostsToView = count => {
  const resultPosts = getPosts(count);
  return resultPosts;
};

module.exports = { savePostsToView, selectedPosts };
