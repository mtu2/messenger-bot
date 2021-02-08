const axios = require("axios");

async function callMessagesAPI(messageDataArray) {
  console.log(messageDataArray);
  for (let i = 0; i < messageDataArray.length; i++) {
    const messageToSend = messageDataArray[i];
    try {
      // Send the HTTP request to the Messenger Platform
      await axios.post(
        `https://graph.facebook.com/v9.0/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
        messageToSend
      );
    } catch (err) {
      console.log("================ CALL MESSAGES API ===============");
      console.log(messageToSend);
      console.error("Unable to send message: " + err);
    }
  }
}

module.exports = { callMessagesAPI };
