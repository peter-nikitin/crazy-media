const cron = require('node-cron');

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
  cron.schedule('1 * * * *', () => {
    chat.forEach(element => {
      run(element);
    });
  });
};

module.exports = start;
