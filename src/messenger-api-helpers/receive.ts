import * as sendAPI from "./send";
import { Payload } from "./types/PayloadEnum";
import {
  ReceivedMessage,
  ReceivedPostback,
  ReceivedQuickReply,
  ReceivedTextMessage,
} from "./types/ReceiveInterfaces";

// Handles messaging_postbacks events
export function handleReceivePostback(
  senderPsid: string,
  receivedPostback: ReceivedPostback
): void {
  // Get the payload for the postback
  const payload = receivedPostback.payload;
  handleReceivePayload(senderPsid, payload);
}

// Handles messages events
export function handleReceiveMessage(
  senderPsid: string,
  receivedMessage: ReceivedMessage
): void {
  sendAPI.sendReadReceipt(senderPsid);

  if ("quick_reply" in receivedMessage) {
    handleReceiveQuickReply(senderPsid, receivedMessage);
  } else if ("attachments" in receivedMessage) {
    handleReceiveAttachmentMessage(senderPsid);
  } else if ("text" in receivedMessage) {
    handleReceiveTextMessage(senderPsid, receivedMessage);
  }
}

// Handles message events that are quick replies
function handleReceiveQuickReply(
  senderPsid: string,
  receivedMessage: ReceivedQuickReply
): void {
  const payload = receivedMessage.quick_reply.payload;
  handleReceivePayload(senderPsid, payload);
}

// Handles postbacks events
function handleReceivePayload(senderPsid: string, payload: string): void {
  if (payload.startsWith("TWITTER_HANDLE")) {
    // If payload is related to a specific Twitter handle
    const command = payload.split("_")[2];
    const twitterHandle = "@" + payload.split("@")[1];

    switch (command) {
      case Payload.SEARCH:
        // If postback is a "Search" response
        sendAPI.sendTwitterHandleSearch(senderPsid, twitterHandle);
        break;
      case Payload.LATEST:
        // If postback is a "Latest" response
        sendAPI.sendTwitterHandleLatest(senderPsid, twitterHandle);
        break;
      case Payload.POPULAR:
        // If postback is a "Popular" response
        sendAPI.sendTwitterHandlePopular(senderPsid, twitterHandle);
        break;
      case Payload.FOLLOW:
        // If postback is a "Follow" response
        sendAPI.sendTwitterHandleFollow(senderPsid, twitterHandle);
        break;
      case Payload.UNFOLLOW:
        // If postback is a "Unfollow" response
        sendAPI.sendTwitterHandleUnfollow(senderPsid, twitterHandle);
        break;
      default:
        console.error(
          `Unknown twitter handle command/payload received: ${command}`
        );
        break;
    }
  } else {
    switch (payload) {
      // General payloads
      case Payload.GET_STARTED:
        sendAPI.sendGetStartedQuickReply(senderPsid);
        break;
      case Payload.MORE_INFORMATION:
        sendAPI.sendMoreInformationMessage(senderPsid);
        break;
      case Payload.SUGGEST_TWITTER:
        sendAPI.sendSuggestTwitterMessage(senderPsid);
        break;
      // If payload is related to the specific user
      case Payload.USER_UPDATE:
        sendAPI.sendUpdateMessage(senderPsid);
        break;
      case Payload.USER_FOLLOWING:
        sendAPI.sendFollowingMessage(senderPsid);
        break;
      default:
        console.error(`Unknown payload received: ${payload}`);
        break;
    }
  }
}

// Handles message events that are just text
function handleReceiveTextMessage(
  senderPsid: string,
  receivedMessage: ReceivedTextMessage
): void {
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
      sendAPI.sendTwitterHandleSearch(senderPsid, twitterHandle);
    }
  } else if (loweredText.includes("help") || loweredText.includes("info")) {
    sendAPI.sendMoreInformationMessage(senderPsid);
  } else if (loweredText.includes("update")) {
    sendAPI.sendUpdateMessage(senderPsid);
  } else if (loweredText.includes("following")) {
    sendAPI.sendFollowingMessage(senderPsid);
  } else if (loweredText.includes("suggest")) {
    sendAPI.sendSuggestTwitterMessage(senderPsid);
  } else {
    sendAPI.sendUnknownCommandMessage(senderPsid);
  }
}

// Handles message events that contain attachments
function handleReceiveAttachmentMessage(senderPsid: string): void {
  sendAPI.sendAttachmentMessage(senderPsid);
}
