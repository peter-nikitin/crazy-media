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
  lastMsgId: {
    type: Number,
  },
  channel_id: {
    type: String,
  },
  access_hash: {
    type: String,
  },
});

channelSchema.method.updateLastMsgId = async function(name, lastMsgId) {
  const channel = await this.findOneAndUpdate(
    {
      name,
    },
    {
      name,
      lastMsgId,
    }
  );

  return channel;
};

channelSchema.method.getLastMsgId = async function getLastMsgId(name) {
  const { lastMsgId } = await this.findOne({
    name,
  });

  return lastMsgId;
};

channelSchema.method.getAllChannels = async function getAllChannels() {
  const channels = await this.find({});
  console.log(channels);
  return channels;
};

channelSchema.pre('remove', function(next) {
  this.model('Post').deleteMany({ channel: this._id }, next);
});

const Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;
