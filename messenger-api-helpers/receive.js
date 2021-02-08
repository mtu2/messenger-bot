const sendAPI = require("./send");

// Handles messaging_postbacks events
function handleReceivePostback(senderPsid, receivedPostback) {
  // Get the payload for the postback
  const payload = receivedPostback.payload;

  // Perform an action based on the postback payload received
  switch (payload) {
    case "GET_STARTED":
      sendAPI.sendGetStartedMessage(senderPsid);
      break;
    default:
      console.error(`Unknown postback payload received: ${payload}`);
      break;
  }
}

// Handles messages events
function handleReceiveMessage(senderPsid, receivedMessage) {
  if (receivedMessage.quick_reply) {
    handleReceiveQuickReply(senderPsid, receivedMessage);
  } else if (receivedMessage.attachments) {
    handleReceiveAttachmentMessage(senderPsid);
  } else if (receivedMessage.text) {
    handleReceiveTextMessage(senderPsid, receivedMessage);
  } else {
    sendAPI.sendUnknownCommandMessage(senderPsid, receivedMessage.text);
  }
}

// Handles message events that are quick replies
function handleReceiveQuickReply(senderPsid, receivedMessage) {
  const payload = receivedMessage.quick_reply.payload;

  if (payload.includes("TWITTER_HANDLE")) {
    const command = payload.split("_")[2];
    const twitterHandle = payload.split("@")[1];

    switch (command) {
      case "SELECT":
        // If quick reply is a confirmation to Twitter handle search
        sendAPI.sendTwitterHandleSelectQuickReply(
          senderPsid,
          receivedMessage.text
        );
        break;
      case "LATEST":
        sendAPI.sendTwitterHandleLatest(senderPsid, twitterHandle);
        break;
      case "POPULAR":
        sendAPI.sendTwitterHandlePopular(senderPsid, twitterHandle);
        break;
      case "FOLLOW":
        sendAPI.sendTwitterHandleFollow(senderPsid, twitterHandle);
        break;
      default:
        console.error(`Unknown twitter handle command received: ${command}`);
        break;
    }
  }
}

// Handles message events that are just text
function handleReceiveTextMessage(senderPsid, receivedMessage) {
  // If message is a search for a Twitter handle
  if (receivedMessage.text.charAt(0) === "@") {
    sendAPI.sendTwitterHandleSearchQuickReply(senderPsid);
  }
}

// Handles message events that contain attachments
function handleReceiveAttachmentMessage(senderPsid) {
  sendAPI.sendAttachmentMessage(senderPsid);
}

module.exports = { handleReceiveMessage, handleReceivePostback };
