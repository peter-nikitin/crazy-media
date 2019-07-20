const { models } = require('../db');

const updateLastMsgId = async (chat, lastMsgId) => {
  try {
    const loaded = await models.Channel.findByIdAndUpdate(chat._id, {
      lastMsgId,
    });
  } catch (err) {
    throw `error, couldnt save to file ${err}`;
  }
};

module.exports = updateLastMsgId;
