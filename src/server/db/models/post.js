const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  post_id: {
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
    ref: 'Channel',
  },
  views: {
    type: Number,
  },
  showen: {
    type: Boolean,
  },
  date: {
    type: Number,
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
