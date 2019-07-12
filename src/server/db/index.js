const Mongoose = require('./Mongoose');
const config = require('../config');

module.exports = new Mongoose(config.mongoPath);
