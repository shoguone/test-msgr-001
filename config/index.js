const defaultConfig = require('./default');

// "pageAccessToken": "EAAMG0YUhLnkBAMnsRoSubjsTGRj4ZCcDrfWojpSmnYGR51fuBccSZAWX830cGjoborlZBhzZChEOa5zMBCbAyLWZB89kabJhNNZBLKsLW8rIfU7DvoOLGTyZBsSLX4f1LiCEhfGcKObRIwXR3cU5zxDSRVRE2KA5PA8hQQaQkuDTAZDZD",

/*
 * Be sure to setup your config values before running this code. You can
 * set them using environment variables or modifying the config file in /config.
 *
 */

// App Secret can be retrieved from the App Dashboard
const APP_SECRET = (process.env.MESSENGER_APP_SECRET) ?
  process.env.MESSENGER_APP_SECRET :
  defaultConfig['appSecret'];

// Arbitrary value used to validate a webhook
const VALIDATION_TOKEN = (process.env.MESSENGER_VALIDATION_TOKEN) ?
  (process.env.MESSENGER_VALIDATION_TOKEN) :
  defaultConfig['validationToken'];

// Generate a page access token for your page from the App Dashboard
const PAGE_ACCESS_TOKEN = (process.env.MESSENGER_PAGE_ACCESS_TOKEN) ?
  (process.env.MESSENGER_PAGE_ACCESS_TOKEN) :
  defaultConfig['pageAccessToken'];

// URL where the app is running (include protocol). Used to point to scripts and
// assets located at this address.
const SERVER_URL = (process.env.SERVER_URL) ?
  (process.env.SERVER_URL) :
  defaultConfig['serverURL'];

if (!(APP_SECRET && VALIDATION_TOKEN && PAGE_ACCESS_TOKEN && SERVER_URL)) {
  console.error("Missing config values");
  process.exit(1);
}


module.exports = {
  APP_SECRET: APP_SECRET,
  VALIDATION_TOKEN: VALIDATION_TOKEN,
  PAGE_ACCESS_TOKEN: PAGE_ACCESS_TOKEN,
  SERVER_URL: SERVER_URL
};
