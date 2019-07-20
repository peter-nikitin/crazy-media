const getImage = require('../utils/telegram/getImage');
const { models } = require('../db');

const saveEachMessage = async (messages, chat) => {
  try {
    for (let i = 0; i < messages.length; i++) {
      let url = '';
      let imgUrl = '';
      if (messages[i].media) {
        if (messages[i].media.webpage) {
          url = messages[i].media.webpage.url;
        }
        if (messages[i].media.photo) {
          imgUrl = `/images/posts/${chat.name}_${messages[i].id}.jpg`;
          getImage(messages[i], `${chat.name}_${messages[i].id}`);
        }
        // console.log(chat._id);
        const newPost = new models.Post({
          post_id: `${chat.name}_${messages[i].id}`,
          message: messages[i].message,
          url,
          imgUrl,
          channel: chat._id,
          views: messages[i].views,
          showen: false,
          date: messages[i].date,
        });

        await newPost.save();
      }
    }
  } catch (err) {
    throw err;
  }
};

module.exports = saveEachMessage;
