const { models } = require('../db');
const updateLastMsgId = require('./updateLastMsgId');

const getLastMsgId = async chat => {
  try {
    const foundedChat = await models.Channel.findById(chat._id);
    return foundedChat.lastMsgId;
  } catch (err) {
    console.log(
      `file not found so making a empty one and adding default value ${err}`
    );
    await updateLastMsgId(chat, 1);
    return 1;
  }
};

module.exports = getLastMsgId;
