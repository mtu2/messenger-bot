export interface TextPayload {
  text: string;
}

export interface QuickReplyTextElement {
  content_type: "text";
  title: string;
  payload: string;
  image_url?: string;
}

export interface QuickReplyTextPayload {
  text: string;
  quick_replies: QuickReplyTextElement[];
}

export interface GenericTemplateElement {
  title: string;
  subtitle?: string;
  image_url?: string;
  buttons?: ButtonPayload[];
}

export interface GenericTemplatePayload {
  attachment: {
    type: "template";
    payload: {
      template_type: "generic";
      elements: GenericTemplateElement[];
    };
  };
}

export interface WebUrlButtonPayload {
  type: "web_url";
  title: string;
  url: string;
}

export interface PostbackButtonPayload {
  type: "postback";
  title: string;
  payload: string;
}

export type ButtonPayload = PostbackButtonPayload | WebUrlButtonPayload;

export type MessagePayload =
  | TextPayload
  | QuickReplyTextPayload
  | GenericTemplatePayload
  | WebUrlButtonPayload
  | PostbackButtonPayload;

export interface Message {
  recipient: { id: string };
  message: MessagePayload;
}

export interface SenderAction {
  recipient: { id: string };
  sender_action: string;
}
