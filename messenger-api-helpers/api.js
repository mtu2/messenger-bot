const axios = require("axios");

async function callAPI(endPoint, messageDataArray) {
  // Error if endpoint of request not specified
  if (!endPoint) {
    HTMLFormControlsCollection.error(
      "callAPI requires you specify an endpoint"
    );
    return;
  }

  console.log("================ CALL MESSAGES API ===============");
  console.log(messageDataArray);

  for (let i = 0; i < messageDataArray.length; i++) {
    const messageToSend = messageDataArray[i];
    try {
      // Send the HTTP request to the Messenger Platform
      await axios.post(
        `https://graph.facebook.com/v9.0/me/${endPoint}?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
        messageToSend
      );
    } catch (err) {
      console.log("================ ERROR (CALL MESSAGES API) ===============");
      console.log(messageToSend);
      console.error("Unable to send message: " + err);
    }
  }
}

const callMessagesAPI = (messageDataArray, queryParams = {}) => {
  return callAPI("messages", messageDataArray, queryParams);
};

const callMessengerProfileAPI = (messageDataArray, queryParams = {}) => {
  return callAPI("messenger_profile", messageDataArray, queryParams);
};

module.exports = { callMessagesAPI, callMessengerProfileAPI };
