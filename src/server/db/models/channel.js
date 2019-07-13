/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  title: {
    type: String,
  },
  lastMsgIf: {
    type: Number,
  },
});

channelSchema.static.findByName = async function(name) {
  const user = await this.findOne({
    name,
  });

  return user;
};

channelSchema.pre('remove', function(next) {
  this.model('Post').deleteMany({ channel: this._id }, next);
});

const Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;
