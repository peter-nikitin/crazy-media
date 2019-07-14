const getChatHistory = require('./getChatHistory');
const { checkLogin } = require('./node-storage');
const { models } = require('../../db');

const run = async chat => {
  try {
    await getChatHistory(chat);
  } catch (error) {
    console.log(error);
  }
};

const start = async () => {
  await checkLogin();
  const chat = await models.Channel.find({});

  chat.forEach(element => {
    run(element);
    // console.log(element);
  });

  // let timerId = setTimeout(function tick() {
  //   timerId = setTimeout(tick, 60000);
  // }, 2000);
};

module.exports = start;
