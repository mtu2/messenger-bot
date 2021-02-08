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
  sendAPI.sendReadReceipt(senderPsid);

  if (receivedMessage.quick_reply) {
    handleReceiveQuickReply(senderPsid, receivedMessage);
  } else if (receivedMessage.attachments) {
    handleReceiveAttachmentMessage(senderPsid);
  } else if (receivedMessage.text) {
    handleReceiveTextMessage(senderPsid, receivedMessage);
  }
}

// Handles message events that are quick replies
function handleReceiveQuickReply(senderPsid, receivedMessage) {
  const payload = receivedMessage.quick_reply.payload;

  if (payload.includes("TWITTER_HANDLE")) {
    const command = payload.split("_")[2];
    const twitterHandle = "@" + payload.split("@")[1];

    switch (command) {
      case "SELECT":
        // If quick reply is selection response to Twitter handle search
        sendAPI.sendTwitterHandleSelectQuickReply(
          senderPsid,
          receivedMessage.text
        );
        break;
      case "LATEST":
        // If quick reply is a "Latest" response to Twitter handle select
        sendAPI.sendTwitterHandleLatest(senderPsid, twitterHandle);
        break;
      case "POPULAR":
        // If quick reply is a "Popular" response to Twitter handle select
        sendAPI.sendTwitterHandlePopular(senderPsid, twitterHandle);
        break;
      case "FOLLOW":
        // If quick reply is a "Follow" response to Twitter handle select
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
  const loweredText = receivedMessage.text.toLowerCase();

  if (loweredText.includes("@")) {
    const twitterHandle = "@" + loweredText.split("@")[1];

    if (loweredText.includes("latest")) {
      // If message includes Twitter handle and "latest"
      sendAPI.sendTwitterHandleLatest(senderPsid, twitterHandle);
    } else if (loweredText.includes("popular")) {
      // If message includes Twitter handle and "popular"
      sendAPI.sendTwitterHandlePopular(senderPsid, twitterHandle);
    } else if (loweredText.includes("follow")) {
      // If message includes Twitter handle and "follow"
      sendAPI.sendTwitterHandleFollow(senderPsid, twitterHandle);
    } else {
      // If text is just a Twitter handle (or includes some unknown command)
      sendAPI.sendTwitterHandleSearchQuickReply(senderPsid);
    }
  } else {
    //  If
    sendAPI.sendUnknownCommandMessage(senderPsid, receivedMessage.text);
  }
}

// Handles message events that contain attachments
function handleReceiveAttachmentMessage(senderPsid) {
  sendAPI.sendAttachmentMessage(senderPsid);
}

module.exports = { handleReceiveMessage, handleReceivePostback };
