const getChatHistory = require('./getChatHistory');
const { checkLogin } = require('./node-storage');
const { models } = require('../../db');

const run = async chat => {
  await getChatHistory(chat);
};

const start = async () => {
  await checkLogin();
  const chat = await models.Channel.find({});

  run(chat[0]);

  // let timerId = setTimeout(function tick() {

  //   chat.forEach(element => {
  //     run(element);
  //     // console.log(element);
  //   });
  //   timerId = setTimeout(tick, 60000);
  // }, 2000);
};

module.exports = start;
