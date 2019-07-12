const fs = require('fs');

const telegram = require('./init');

const getImage = async (fileObject, post) => {
  const rawFile = await telegram('upload.getFile', {
    location: {
      _: 'inputFileLocation',
      volume_id: fileObject.media.photo.sizes[2].location.volume_id,
      local_id: fileObject.media.photo.sizes[2].location.local_id,
      secret: fileObject.media.photo.sizes[2].location.secret,
    },
    offset: 0,
    limit: 100000,
  });
  const file = Buffer.from(rawFile.bytes);
  await saveImage(post, file);
};

const saveImage = async (post, image) => {
  await fs.writeFile(
    `${config.static}/images/posts/${post}.jpg`,
    image,
    'binary',
    err => {
      if (err) {
        console.log(`There was an error writing the image ${err}`);
      } else {
        console.log(`Image from post ${post} was written`);
      }
    }
  );
};

module.exports = getImage;
