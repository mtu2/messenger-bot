const sendAPI = require("./send");

// Handles messaging_postbacks events
function handleReceivePostback(senderPsid, receivedPostback) {
  // Get the payload for the postback
  const payload = receivedPostback.payload;
  handleReceivePayload(senderPsid, payload);
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
  handleReceivePayload(senderPsid, payload);
}

// Handles postbacks events
function handleReceivePayload(payload) {
  // Perform an action based on the payload received
  if (payload === "GET_STARTED") {
    sendAPI.sendGetStartedQuickReply(senderPsid);
  } else if (payload === "MORE_INFORMATION") {
    sendAPI.sendMoreInformationMessage(senderPsid);
  } else if (payload.startsWith("TWITTER_HANDLE")) {
    const command = payload.split("_")[2];
    const twitterHandle = "@" + payload.split("@")[1];

    switch (command) {
      case "SEARCH":
        // If postback is a "Search" response
        sendAPI.sendTwitterHandleSearch(senderPsid, twitterHandle);
      case "LATEST":
        // If postback is a "Latest" response
        sendAPI.sendTwitterHandleLatest(senderPsid, twitterHandle);
        break;
      case "POPULAR":
        // If postback is a "Popular" response
        sendAPI.sendTwitterHandlePopular(senderPsid, twitterHandle);
        break;
      case "FOLLOW":
        // If postback is a "Follow" response
        sendAPI.sendTwitterHandleFollow(senderPsid, twitterHandle);
        break;
      default:
        console.error(`Unknown twitter handle command received: ${command}`);
        break;
    }
  } else {
    console.error(`Unknown postback payload received: ${payload}`);
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
      sendAPI.sendTwitterHandleSearch(senderPsid);
    }
  } else if (loweredText.includes("help") || loweredText.includes("info")) {
    sendAPI.sendMoreInformationMessage(senderPsid);
  } else {
    sendAPI.sendUnknownCommandMessage(senderPsid, receivedMessage.text);
  }
}

// Handles message events that contain attachments
function handleReceiveAttachmentMessage(senderPsid) {
  sendAPI.sendAttachmentMessage(senderPsid);
}

module.exports = { handleReceiveMessage, handleReceivePostback };
