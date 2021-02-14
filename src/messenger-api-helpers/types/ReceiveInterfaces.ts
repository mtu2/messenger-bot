export interface ReceivedQuickReply {
  quick_reply: { payload: string };
}

export interface ReceivedAttachmentMessage {
  attachments: Record<string, any>;
}

export interface ReceivedTextMessage {
  text: string;
}

export type ReceivedMessage =
  | ReceivedQuickReply
  | ReceivedAttachmentMessage
  | ReceivedTextMessage;

export interface ReceivedPostback {
  title: string;
  payload: string;
}
