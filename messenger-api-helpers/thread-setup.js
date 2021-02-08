const messages = require("./messages");
const api = require("./api");

const setPersistentMenu = () => {
  api.callMessengerProfileAPI(messages.persistentMenu());
};

const setGetStarted = () => {
  api.callMessengerProfileAPI(messages.getStarted());
};

module.exports = { setPersistentMenu, setGetStarted };
