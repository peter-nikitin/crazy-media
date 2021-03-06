const path = require('path');
const dotenv = require('dotenv');

dotenv.load();

module.exports = {
  // Current environment.
  isDevelopment: process.env.NODE_ENV !== 'production',
  isProduction: process.env.NODE_ENV === 'production',

  // Basic server settings.
  port: process.env.PORT || 1234,
  host: process.env.HOST || 'localhost',

  // Views directory.
  views: path.resolve(__dirname, '../pages'),

  // Public directory with static files.
  static: path.resolve(__dirname, '../../static'),

  // Path to manifest file for production.
  manifest: path.resolve(__dirname, '../../static/assets/manifest.json'),

  // Additional files or directories to watch.
  watch: [path.resolve(__dirname, '../pages')],

  // Automatic routes generation globs.
  autoroutes: [
    path.resolve(__dirname, '../pages', '**/*.pug'),
    '!**/{layouts,partials,mixins}/**/*.pug',
  ],

  // time for interval
  interval: 7 * 60 * 1000,
  postsCount: 14,

  // path to mongo
  mongoPath: 'mongodb://127.0.0.1/crazy_media',

  // refrash db
  eraseDatabaseOnSync: false,

  // Telegram settings
  telegram: {
    id: process.env.TELEGRAM_APP_ID,
    hash: process.env.TELEGRAM_APP_HASH,
    phone: process.env.TELEGRAM_PHONE_NUMBER,
    storage: process.env.TELEGRAM_FILE,
    devServer: false,
    msgHistory: {
      maxMsg: 30,
      limit: 10,
    },
    getChat: {
      limit: 150,
    },
  },
  dbfile: process.env.DB_FILE,
  selected: process.env.SELECTED,
  chatdb: process.env.CHAR_FILE,
  server: process.env.SERVER_URL,
};
