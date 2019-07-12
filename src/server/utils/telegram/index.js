const fs = require('fs');
const getChatHistory = require('./getChatHistory');

const { checkLogin } = require('./node-storage');

const run = async chat => {
  await getChatHistory(chat);
};

const start = async () => {
  await checkLogin();

  const chat = await fs.readFile('../storage/selected.json', (err, data) => {
    if (err) throw err;
    console.log(data);
  });

  let timerId = setTimeout(function tick() {
    chat.forEach(element => {
      run(element);
    });
    timerId = setTimeout(tick, 60000);
  }, 2000);
};

module.exports = start();
