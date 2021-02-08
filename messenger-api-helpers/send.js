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

async function sendGetStartedMessage(senderPsid) {
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

  sendMessage(senderPsid, messages.getStartedMessage(firstName));
}

function sendUnknownCommandMessage(senderPsid, receivedText) {
  sendMessage(senderPsid, messages.unknownCommandMessage(receivedText));
}

function sendAttachmentMessage(senderPsid) {
  sendMessage(senderPsid, messages.attachmentMessage());
}

function sendTwitterHandleSearchQuickReply(senderPsid) {
  sendMessage(senderPsid, messages.twitterHandleSearchQuickReply());
}

function sendTwitterHandleSelectQuickReply(senderPsid, twitterHandle) {
  sendMessage(
    senderPsid,
    messages.twitterHandleSelectQuickReply(twitterHandle)
  );
}

function sendTwitterHandleLatest(senderPsid, twitterHandle) {
  sendMessage(senderPsid, messages.twitterHandleLatest(twitterHandle));
}

function sendTwitterHandlePopular(senderPsid, twitterHandle) {
  sendMessage(senderPsid, messages.twitterHandlePopular(twitterHandle));
}

function sendTwitterHandleFollow(senderPsid, twitterHandle) {
  sendMessage(senderPsid, messages.twitterHandleFollow(twitterHandle));
}

module.exports = {
  sendMessage,
  sendGetStartedMessage,
  sendUnknownCommandMessage,
  sendAttachmentMessage,
  sendTwitterHandleSearchQuickReply,
  sendTwitterHandleSelectQuickReply,
  sendTwitterHandleLatest,
  sendTwitterHandlePopular,
  sendTwitterHandleFollow,
};
