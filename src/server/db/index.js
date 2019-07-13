const mongoose = require('mongoose');

const Channel = require('./models/channel');
const Post = require('./models/post');

const config = require('../config');

const connectToDB = () => mongoose.connect(config.mongoPath);

const models = { Channel, Post };

module.exports = { connectToDB, models };
