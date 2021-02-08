const sendMessage = require("./sendMessage");
const senderAction = require("./senderAction");

// Handles messaging_postbacks events
module.exports = (sender_psid, received_postback) => {
  let response;

  // Get the payload for the postback
  const payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === "yes") {
    response = { text: "Thanks!" };
  } else if (payload === "no") {
    response = { text: "Oops, try sending another image." };
  }
  // Send the message to acknowledge the postback
  senderAction(sender_psid);
  sendMessage(sender_psid, response);
};
