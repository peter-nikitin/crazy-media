const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  message: {
    type: String,
  },
  url: {
    type: String,
  },
  imgUrl: {
    type: String,
  },
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
