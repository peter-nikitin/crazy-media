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

const GetPostFromTelegram = async () => {
  console.log(`start loading`);
  await checkLogin();
  const chat = await models.Channel.find({});
  chat.forEach(element => {
    run(element);
  });
  cron.schedule('1 * * * *', () => {
    chat.forEach(element => {
      run(element);
    });
  });
};

module.exports = GetPostFromTelegram;
