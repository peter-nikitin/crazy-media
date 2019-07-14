/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
const fs = require('fs');
const config = require('../../config');
const telegram = require('./init');

const getImage = require('./getImage');
const { models } = require('../../db');

async function saveEachMessage(messages, { _id, name }) {
  try {
    for (let i = 0; i < messages.length; i++) {
      let url = '';
      let imgUrl = '';
      if (messages[i].media) {
        if (messages[i].media.webpage) {
          url = messages[i].media.webpage.url;
        }
        if (messages[i].media.photo) {
          imgUrl = `/static/posts/${name}_${messages[i].id}.jpg`;
          getImage(messages[i], `${name}_${messages[i].id}`);
        }
        // console.log(messages[i].id);
        const newPost = new models.Post({
          post_id: `${name}_${messages[i].id}`,
          message: messages[i].message,
          url,
          imgUrl,
          channel: _id,
        });

        await newPost.save();
      }
    }
  } catch (err) {
    throw err;
  }
}

const uniqueArray = function uniqueArray(myArr, prop) {
  return myArr.filter(
    (obj, pos, arr) =>
      arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos
  );
};

async function updateLastMsgId({ name }, lastMsgId) {
  try {
    await models.Channel.findOneAndUpdate({ name }, { name, lastMsgId });
  } catch (err) {
    console.log(`error, couldnt save to file ${err}`);
  }
}
async function writeFile(json, file) {
  return new Promise((res, rej) => {
    fs.appendFile(file, JSON.stringify(json, null, 2), 'utf8', err => {
      err ? rej(err) : res();
    });
  });
}

async function getLastMsgId({ name }) {
  try {
    const { lastMsgId } = await models.Channel.findOne({ name });
    return lastMsgId;
  } catch (err) {
    console.log(
      `file not found so making a empty one and adding default value ${err}`
    );
    await updateLastMsgId(name, 1);
    return 1;
  }
}

const getChatHistory = async chat => {
  let lastIdofMsgs = await getLastMsgId(chat);
  // console.log(chat);

  const max = config.telegram.msgHistory.maxMsg;
  const limit = config.telegram.msgHistory.limit || 20;
  let offsetId = 0;
  let full = [];
  let messages = [];

  try {
    do {
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
        await updateLastMsgId(chat, messages[0].id);
      }
      history = null;
    } while (messages.length === limit && full.length < max);
    const showNew = full.filter(({ id }) => id > lastIdofMsgs);
    const noRepeats = uniqueArray(showNew, 'id');

    if (noRepeats.length > 0) {
      saveEachMessage(noRepeats, chat);
      console.log('saved to server: ');
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
