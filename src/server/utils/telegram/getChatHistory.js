/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
const fs = require('fs');
const config = require('../../config');
const telegram = require('./init');

const getImage = require('./getImage');
const { models } = require('../../db');

const messagesClear = [];

async function asyncForEach(array, channel) {
  for (let i = 0; i < array.length; i++) {
    let url = '';
    let imgUrl = '';
    const { id } = array[i];
    if (array[i].media) {
      if (array[i].media.webpage) {
        url = array[i].media.webpage.url;
      }
      if (array[i].media.photo) {
        imgUrl = `/static/posts/${id}.jpg`;
        await getImage(array[i], id);
      }

      const post = new models.Post({
        id,
        message: array[i].message,
        url,
        imgUrl,
        channel,
      });

      await post.save();
    }
  }

  // await fs.appendFile(
  //   'src/storage/messages.json',
  //   JSON.stringify(messagesClear, null, 2),
  //   'utf8',
  //   err => {
  //     if (err) {
  //       console.log(`There was an error writing the image ${err}`);
  //     } else {
  //       console.log('Messages was written');
  //     }
  //   }
  // );
}

async function updateLastMsgId(channel, lastMsgId) {
  try {
    await models.Channel.findOneAndUpdate({ name: channel }, { lastMsgId });
  } catch (err) {
    console.log(`error, couldnt save to file ${err}`);
  }
}

async function getLastMsgId(channel) {
  try {
    const { lastMsgId } = await models.Channel.findOne({ name: channel });
    return lastMsgId;
  } catch (err) {
    console.log(
      `file not found so making a empty one and adding default value ${err}`
    );
    await updateLastMsgId(channel, 1);
    return 1;
  }
}

const getChatHistory = async chat => {
  const lastIdofMsgs = await getLastMsgId(chat.name);
  // console.log(chat);

  const max = config.telegram.msgHistory.maxMsg;
  const limit = config.telegram.msgHistory.limit || 20;
  let offsetId = 0;
  let full = [];
  let messages = [];

  try {
    do {
      // console.log(chat.channel_id);

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
      console.log(messages);

      asyncForEach(messages, chat.channel_id);

      full = full.concat(messages);
      messages.length > 0 && (offsetId = messages[0].id);
      // console.log(full.length);
      if (messages.length > 0) {
        await models.Channel.updateLastMsgId(chat.username, messages[0].id);
      }
      history = null;
    } while (messages.length === limit && full.length < max);
  } catch (err) {
    console.log(err);
  }
};

module.exports = getChatHistory;
