const fs = require('fs');

const config = require('../config');
const { models } = require('../db');

const SELECTED = config.selected;

async function readDb(file) {
  return new Promise((res, rej) => {
    fs.readFile(file, 'utf8', (err, data) => {
      err ? rej(err) : res(data);
    });
  });
}

const loadChannels = async () => {
  const readFile = await readDb(SELECTED);
  const channels = JSON.parse(readFile);

  for (let index = 0; index < channels.length; index++) {
    const element = channels[index];

    const channel = new models.Channel({
      name: element.username,
      title: element.title,
      lastMsgId: 1,
      channel_id: element.id,
      access_hash: element.access_hash,
    });

    await channel.save();
  }
};

module.exports = loadChannels;
