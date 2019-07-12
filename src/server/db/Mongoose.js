const mongoose = require('mongoose');

class Mongoose {
  constructor(path) {
    this.path = path;
  }

  makeChannelSchema() {
    const ChannelSchema = new this.Schema({
      channel_id: String,
      lastMessageId: Number,
    });

    this.ChannelModel = mongoose.model('ChannelSchema', ChannelSchema);
  }

  makePostSchema() {
    const PostSchema = new this.Schema({
      channel_id: String,
      lastMessageId: Number,
    });

    this.PostModel = mongoose.model('PostSchema', PostSchema);
  }

  async connect() {
    return mongoose
      .connect(
        this.path,
        { useNewUrlParser: true }
      )
      .then(() => {
        console.log('db is connected');
        this.db = mongoose.connection;
        this.Schema = mongoose.Schema;
      })
      .then(() => {
        this.makeChannelSchema();
        this.makePostSchema();
      });
  }
}

module.exports = Mongoose;
