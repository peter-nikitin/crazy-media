const { pluck } = require('ramda/src');
const telegram = require('./init');
const config = require('../../config');
const { inputField } = require('./fixtures');

const getChat = async () => {
  const dialogs = await telegram('messages.getDialogs', {
    limit: parseInt(config.telegram.getChat.limit, 10),
  });
  const { chats } = dialogs;

  const selectedChat = await selectChat(chats);
  return selectedChat;
};

const selectChat = async chats => {
  const chatNames = pluck('title', chats);
  console.log('Your chat list');
  chatNames.map((name, id) => console.log(`${id}  ${name}`));
  console.log('Select chat by index');
  const chatIndex = await inputField('index');
  return chats[+chatIndex];
};

module.exports = getChat;
