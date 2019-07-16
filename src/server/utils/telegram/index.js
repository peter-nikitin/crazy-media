const cron = require('node-cron');
const getPosts = require('../getPostsFromDB');

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

const tgGetPostFromChannels = async () => {
  await checkLogin();
  const chat = await models.Channel.find({});
  cron.schedule('1 * * * *', () => {
    chat.forEach(element => {
      run(element);
    });
  });
};

const postsToShow = getPosts(5);

module.exports = { tgGetPostFromChannels, postsToShow };
