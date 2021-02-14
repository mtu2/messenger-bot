import { removeUndefinedFromObj, castArray } from "../utils/utils";
import {
  TextPayload,
  QuickReplyTextElement,
  QuickReplyTextPayload,
  GenericTemplateElement,
  GenericTemplatePayload,
  ButtonPayload,
  PostbackButtonPayload,
  WebUrlButtonPayload,
} from "./types/MessageInterfaces";

export const genText = (text: string): TextPayload => ({
  text: text,
});

export const genQuickReplyText = (
  text: string,
  quickReplies: QuickReplyTextElement[]
): QuickReplyTextPayload => ({
  text: text,
  quick_replies: quickReplies.map((quickReply: QuickReplyTextElement) => {
    const ele = { ...quickReply };
    removeUndefinedFromObj(ele);
    return ele;
  }),
});

export const genQuickReplyTextElement = (
  title: string,
  payload: string,
  image_url: string | undefined = undefined
): QuickReplyTextElement => {
  const element: QuickReplyTextElement = {
    content_type: "text",
    title,
    payload,
    image_url,
  };
  removeUndefinedFromObj(element);

  return element;
};

export const genGenericTemplate = (
  elements: GenericTemplateElement | GenericTemplateElement[]
): GenericTemplatePayload => {
  const elementsArray = castArray(elements);

  // if elements is an array with more than one entry this will be a carousel
  return {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: elementsArray,
      },
    },
  };
};

export const genGenericTemplateElement = (
  title: string,
  subtitle: string,
  buttons: ButtonPayload | ButtonPayload[],
  image_url: string
): GenericTemplateElement => {
  const buttonsArray = buttons === undefined ? undefined : castArray(buttons);

  const element = {
    title,
    subtitle,
    buttons: buttonsArray,
    image_url,
    // default_action: {
    //   type: "web_url",
    //   url: image_url,
    //   webview_height_ratio: "tall",
    // },
  };
  removeUndefinedFromObj(element);

  return element;
};

export const genPostbackButton = (
  title: string,
  payload: string
): PostbackButtonPayload => ({
  type: "postback",
  title,
  payload,
});

export const genWebUrlButton = (
  title: string,
  url: string
): WebUrlButtonPayload => ({
  type: "web_url",
  title,
  url,
});
