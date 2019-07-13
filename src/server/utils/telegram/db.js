const fs = require('fs');
const config = require('../../config');
// const { connectToDB, models } = require('../../db');

// const {models} = require('../../db');

const CHATDB = config.chatdb;
const DBFILE = config.dbfile;

// connectToDB();

// async function readDb(file) {
//   return new Promise((res, rej) => {
//     fs.readFile(file, 'utf8', (err, data) => {
//       err ? rej(err) : res(data);
//     });
//   });
// }

// async function writeFile(json, file) {
//   return new Promise((res, rej) => {
//     fs.appendFile(file, JSON.stringify(json, null, 2), 'utf8', err => {
//       err ? rej(err) : res();
//     });
//   });
// }

async function updateLastMsgId(chennalName, LastMsgId) {
  try {
    models.Channel.updateLastMsgId(chennalName);
  } catch (err) {
    console.log('error, couldnt save to file ' + err);
  }
}

async function getLastMsgId(chennalName) {
  try {
    const readFile = await readDb(DBFILE);
    const file = JSON.parse(readFile);
    return file.chennalName;
  } catch (err) {
    console.log(
      'file not found so making a empty one and adding default value ' + err
    );
    await updateLastMsgId(1);
    return 1;
  }
}

// async function updateLastMsgId(channelName, num) {
//   try {

//     const db = readDb(DBFILE);
//     console.log(db);
//     // channel.findOneAndUpdate(
//     //   {
//     //     name: channelName,
//     //   },
//     //   {
//     //     lastMsgId: num,
//     //   },
//     //   { new: true },
//     //   (err, doc) => {
//     //     if (err) {
//     //       console.log(`${err} shit happens.`);
//     //     }
//     //     console.log(`${doc} successfully saved.`);
//     //   }
//     // );
//   } catch (err) {
//     console.log(`error, couldnt save to file ${err}`);
//   }
// }

// async function getLastMsgId(channelName) {
//   try {
//     const channel = new db.ChannelModel();
//     let LastMsgId;
//     // channel
//     //   .findOneAndUpdate({
//     //     name: channelName,
//     //   })
//     //   .exec((err, id) => {
//     //     LastMsgId = id;
//     //   });
//     return LastMsgId;
//   } catch (err) {
//     console.log(
//       `file not found so making a empty one and adding default value ${err}`
//     );
//     await updateLastMsgId(1);
//     return 1;
//   }
// }

async function getChat() {
  try {
    const readFile = await readDb(CHATDB);
    const file = JSON.parse(readFile);
    return file.chat;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function updateChat(obj) {
  try {
    const work = await writeFile(
      {
        chat: obj,
      },
      CHATDB
    );
  } catch (err) {
    console.log(`error, couldnt save chat to file ${err}`);
  }
}

module.exports = { updateLastMsgId, getLastMsgId, getChat, updateChat };
