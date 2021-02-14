import { callMessagesAPI } from "./api";
import * as messages from "./messages";
import { castArray } from "../utils/utils";
import axios from "axios";

// Turns typing indicator on.
export function typingOn(senderPsid: string) {
  return {
    recipient: { id: senderPsid },
    sender_action: "typing_on",
  };
}

// Turns typing indicator off.
export function typingOff(senderPsid: string) {
  return {
    recipient: { id: senderPsid },
    sender_action: "typing_off",
  };
}

// Wraps a message JSON object with recipient information.
export function messageToJSON(senderPsid: string, messagePayload: any) {
  return {
    recipient: {
      id: senderPsid,
    },
    message: messagePayload,
  };
}

// Sends response messages using the Send API.
export function sendMessage(senderPsid: string, messagePayloads: any) {
  const messageArray = castArray(messagePayloads).map((messagePayload: any) =>
    messageToJSON(senderPsid, messagePayload)
  );

  callMessagesAPI([
    typingOn(senderPsid),
    ...messageArray,
    typingOff(senderPsid),
  ]);
}

// Send a read receipt to indicate the message has been read
export function sendReadReceipt(senderPsid: string) {
  const messageData = {
    recipient: { id: senderPsid },
    sender_action: "mark_seen",
  };

  callMessagesAPI(messageData);
}

// Send initial message to get user started.
export async function sendGetStartedQuickReply(senderPsid: string) {
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
export function sendUnknownCommandMessage(senderPsid: string) {
  sendMessage(senderPsid, messages.unknownCommandMessage());
}

// Send message when an attachment is sent from user.
export function sendAttachmentMessage(senderPsid: string) {
  sendMessage(senderPsid, messages.attachmentMessage());
}

// Send message when user asks for more information.
export function sendMoreInformationMessage(senderPsid: string) {
  sendMessage(senderPsid, messages.moreInformationMessage());
}

// Send message when user asks for Twitter handle suggestions
export function sendSuggestTwitterMessage(senderPsid: string) {
  sendMessage(senderPsid, messages.suggestTwitterMessage());
}

// Send message when user asks for an update on their following list.
export function sendUpdateMessage(senderPsid: string) {
  sendMessage(senderPsid, messages.updateMessage());
}

// Send message when user asks for their following list.
export function sendFollowingMessage(senderPsid: string) {
  sendMessage(senderPsid, messages.followingMessage());
}

// Send message when user sends a Twitter handle.
export function sendTwitterHandleSearch(
  senderPsid: string,
  twitterHandle: string
) {
  sendMessage(senderPsid, messages.twitterHandleSearch(twitterHandle));
}

// Send message with latest tweets from a Twitter handle.
export function sendTwitterHandleLatest(
  senderPsid: string,
  twitterHandle: string
) {
  sendMessage(senderPsid, messages.twitterHandleLatest(twitterHandle));
}

// Send message with most popular tweets from a Twitter handle.
export function sendTwitterHandlePopular(
  senderPsid: string,
  twitterHandle: string
) {
  sendMessage(senderPsid, messages.twitterHandlePopular(twitterHandle));
}

// Send message to follow a Twitter handle.
export function sendTwitterHandleFollow(
  senderPsid: string,
  twitterHandle: string
) {
  sendMessage(senderPsid, messages.twitterHandleFollow(twitterHandle));
}

// Send message to unfollow a Twitter handle.
export function sendTwitterHandleUnfollow(
  senderPsid: string,
  twitterHandle: string
) {
  sendMessage(senderPsid, messages.twitterHandleUnfollow(twitterHandle));
}
