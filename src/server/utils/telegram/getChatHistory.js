/* eslint-disable no-undef */
const fs = require('fs');
const config = require('../../config');
const db = require('./db');
const telegram = require('./init');

const getImage = require('./getImage');

const messagesClear = [];

async function asyncForEach(array) {
  for (let i = 0; i < array.length; i++) {
    let url = '';
    let photo = '';
    const { id } = array[i];
    if (array[i].media) {
      if (array[i].media.webpage) {
        url = array[i].media.webpage.url;
      }
      if (array[i].media.photo) {
        photo = `/static/posts/${id}.jpg`;
        await getImage(array[i], id);
      }
      messagesClear.push({
        message: array[i].message,
        photo,
        webpage: url,
      });
    }
  }

  await fs.appendFile(
    'src/storage/messages.json',
    JSON.stringify(messagesClear, null, 2),
    'utf8',
    err => {
      if (err) {
        console.log(`There was an error writing the image ${err}`);
      } else {
        console.log('Messages was written');
      }
    }
  );
}

const getChatHistory = async chat => {
  let lastIdofMsgs = await db.getLastMsgId();

  const max = config.telegram.msgHistory.maxMsg;
  const limit = config.telegram.msgHistory.limit || 20;
  let offsetId = 0;
  let full = [];
  let messages = [];

  do {
    let history = await telegram('messages.getHistory', {
      peer: {
        _: 'inputPeerChannel',
        channel_id: chat.id,
        access_hash: chat.access_hash,
      },
      max_id: -offsetId,
      offset: -full.length,
      limit,
    });

    messages = history.messages;

    asyncForEach(messages);

    full = full.concat(messages);
    messages.length > 0 && (offsetId = messages[0].id);
    // console.log(full.length);
    if (messages.length > 0) {
      await db.updateLastMsgId(messages[0].id);
    }
    history = null;
  } while (messages.length === limit && full.length < max);
};

module.exports = getChatHistory;
