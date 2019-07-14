const fs = require('fs');
const config = require('../../config');

const telegram = require('./init');

const saveImage = async (fileName, file) => {
  try {
    await fs.writeFile(
      `${config.static}/images/posts/${fileName}.jpg`,
      file,
      'binary',
      err => {
        if (err) {
          console.log(`There was an error writing the image ${err}`);
        } else {
          console.log(`Image from post ${fileName} was written`);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const getImage = async (fileObject, fileName) => {
  try {
    const rawFile = await telegram('upload.getFile', {
      location: {
        _: 'inputFileLocation',
        volume_id: fileObject.media.photo.sizes[2].location.volume_id,
        local_id: fileObject.media.photo.sizes[2].location.local_id,
        secret: fileObject.media.photo.sizes[2].location.secret,
      },
      offset: 0,
      limit: 1000000,
    });
    const file = Buffer.from(rawFile.bytes);
    await saveImage(fileName, file);
  } catch (error) {
    console.log(error);
  }
};

module.exports = getImage;
