const api = require("./api");
const messages = require("./messages");
const utils = require("../utils/utils");
const axios = require("axios");

// Turns typing indicator on.
function typingOn(senderPsid) {
  return {
    recipient: { id: senderPsid },
    sender_action: "typing_on",
  };
}

// Turns typing indicator off.
function typingOff(senderPsid) {
  return {
    recipient: { id: senderPsid },
    sender_action: "typing_off",
  };
}

// Wraps a message JSON object with recipient information.
function messageToJSON(senderPsid, messagePayload) {
  return {
    recipient: {
      id: senderPsid,
    },
    message: messagePayload,
  };
}

// Sends response messages using the Send API.
function sendMessage(senderPsid, messagePayloads) {
  const messageArray = utils
    .castArray(messagePayloads)
    .map((messagePayload) => messageToJSON(senderPsid, messagePayload));

  api.callMessagesAPI([
    typingOn(senderPsid),
    ...messageArray,
    typingOff(senderPsid),
  ]);
}

// Send a read receipt to indicate the message has been read
const sendReadReceipt = (senderPsid) => {
  const messageData = {
    recipient: { id: senderPsid },
    sender_action: "mark_seen",
  };

  api.callMessagesAPI(messageData);
};

// Send initial message to get user started.
async function sendGetStartedQuickReply(senderPsid) {
  let firstName;
  try {
    const res = await axios.get(
      `https://graph.facebook.com/v9.0/${senderPsid}?fields=first_name&access_token=${process.env.PAGE_ACCESS_TOKEN}`
    );
    firstName = res.data.first_name;
  } catch (err) {
    console.error("Error getting user name: " + err);
    firstName = "";
  }

  sendMessage(senderPsid, messages.getStartedQuickReply(firstName));
}

// Send message when unknown text is sent from user.
function sendUnknownCommandMessage(senderPsid, receivedText) {
  sendMessage(senderPsid, messages.unknownCommandMessage(receivedText));
}

// Send message when an attachment is sent from user.
function sendAttachmentMessage(senderPsid) {
  sendMessage(senderPsid, messages.attachmentMessage());
}

// Send message when user asks for more information.
function sendMoreInformationMessage(senderPsid) {
  sendMessage(senderPsid, messages.moreInformationMessage());
}

// Send message when user asks for more information.
function sendUpdateMessage(senderPsid) {
  sendMessage(senderPsid, messages.updateMessage());
}

// Send message when user asks for more information.
function sendFollowingMessage(senderPsid) {
  sendMessage(senderPsid, messages.followingMessage());
}

// Send quick reply message when user sends a Twitter handle.
function sendTwitterHandleSearch(senderPsid) {
  sendMessage(senderPsid, messages.twitterHandleSearch());
}

// Send message with latest tweets from a Twitter handle.
function sendTwitterHandleLatest(senderPsid, twitterHandle) {
  sendMessage(senderPsid, messages.twitterHandleLatest(twitterHandle));
}

// Send message with most popular tweets from a Twitter handle.
function sendTwitterHandlePopular(senderPsid, twitterHandle) {
  sendMessage(senderPsid, messages.twitterHandlePopular(twitterHandle));
}

// Send message to follow a Twitter handle.
function sendTwitterHandleFollow(senderPsid, twitterHandle) {
  sendMessage(senderPsid, messages.twitterHandleFollow(twitterHandle));
}

// Send message to unfollow a Twitter handle.
function sendTwitterHandleUnfollow(senderPsid, twitterHandle) {
  sendMessage(senderPsid, messages.twitterHandleUnfollow(twitterHandle));
}

module.exports = {
  sendMessage,
  sendReadReceipt,
  sendGetStartedQuickReply,
  sendUnknownCommandMessage,
  sendAttachmentMessage,
  sendMoreInformationMessage,
  sendUpdateMessage,
  sendFollowingMessage,
  sendTwitterHandleSearch,
  sendTwitterHandleLatest,
  sendTwitterHandlePopular,
  sendTwitterHandleFollow,
  sendTwitterHandleUnfollow,
};
