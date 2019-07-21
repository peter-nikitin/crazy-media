const cron = require('node-cron');

const getChatHistory = require('./getChatHistory');
const { checkLogin } = require('./node-storage');
const { models } = require('../../db');
const { savePostsToView } = require('../../helpers/getPostsFromDB');
const config = require('../../config');

const { interval } = config;
let timeLeft = interval;

const run = async chat => {
  try {
    getChatHistory(chat);
  } catch (error) {
    console.log(error);
  }
};

const GetPostFromTelegram = async () => {
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

  await savePostsToView(config.postsCount);

  // setInterval(() => {
  //   if (timeLeft > 0) {
  //     timeLeft = timeLeft - 1000;
  //   } else {
  //     timeLeft = interval;
  //   }
  //   console.log(timeLeft);
  // }, 1000);

  setInterval(() => {
    savePostsToView(7);
  }, timeLeft);
};

module.exports = GetPostFromTelegram;
