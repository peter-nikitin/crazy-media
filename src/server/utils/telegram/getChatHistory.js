/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */

const config = require('../../config');
const telegram = require('./init');

const getLastMsgId = require('../../helpers/getLastMsgId');
const updateLastMsgId = require('../../helpers/updateLastMsgId');
const saveEachMessage = require('../../helpers/saveEachMessage');

const uniqueArray = function uniqueArray(myArr, prop) {
  return myArr.filter(
    (obj, pos, arr) =>
      arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos
  );
};

const getChatHistory = async chat => {
  // get last message ID from DB
  let lastIdofMsgs = await getLastMsgId(chat);

  const max = config.telegram.msgHistory.maxMsg;
  const limit = config.telegram.msgHistory.limit || 20;
  let offsetId = 0;
  let full = [];
  let messages = [];

  try {
    do {
      // get messages history from telegram channel
      let history = await telegram('messages.getHistory', {
        peer: {
          _: 'inputPeerChannel',
          channel_id: chat.channel_id,
          access_hash: chat.access_hash,
        },
        max_id: -offsetId,
        offset: -full.length,
        limit,
      });

      messages = history.messages;

      full = full.concat(messages);
      messages.length > 0 && (offsetId = messages[0].id);
      if (messages.length > 0) {
        // update LastMsgId in DB
        await updateLastMsgId(chat, messages[0].id);
      }
      history = null;
    } while (messages.length === limit && full.length < max);
    const showNew = full.filter(({ id }) => id > lastIdofMsgs);
    const noRepeats = uniqueArray(showNew, 'id');

    if (noRepeats.length > 0) {
      // save each message to server
      saveEachMessage(noRepeats, chat);
      console.log('Last msg id ', messages[0].id);
    }
    lastIdofMsgs = await getLastMsgId(chat);
    const dt = new Date();
    const hours = dt.getHours();
    const mins = dt.getMinutes();
    console.log(`${hours}:${mins} - [${lastIdofMsgs}]`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = getChatHistory;
