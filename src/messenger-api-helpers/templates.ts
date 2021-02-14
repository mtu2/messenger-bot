import { removeUndefinedFromObj, castArray } from "../utils/utils";

export const genText = (text: string) => ({
  text: text,
});

export const genQuickReply = (text: string, quickReplies: any) => ({
  text: text,
  quick_replies: quickReplies.map((quickReply: any) => {
    const ele = {
      content_type: "text",
      title: quickReply["title"],
      payload: quickReply["payload"],
      image_url: quickReply["image_url"],
    };
    removeUndefinedFromObj(ele);
    return ele;
  }),
});

export const genGenericTemplate = (elements: any) => {
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
  buttons: any,
  image_url: string
) => {
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

export const genPostbackButton = (title: string, payload: any) => ({
  type: "postback",
  title,
  payload,
});

export const genWebUrlButton = (title: string, url: string) => ({
  type: "web_url",
  title,
  url,
});

// [
//   {
//     title: "Welcome!",
//     image_url: "https://petersfancybrownhats.com/company_image.png",
//     subtitle: "We have the right hat for everyone.",
//     default_action: {
//       type: "web_url",
//       url: "https://petersfancybrownhats.com/view?item=103",
//       webview_height_ratio: "tall",
//     },
//     buttons: [
//       {
//         type: "web_url",
//         url: "https://petersfancybrownhats.com",
//         title: "View Website",
//       },
//       {
//         type: "postback",
//         title: "Start Chatting",
//         payload: "DEVELOPER_DEFINED_PAYLOAD",
//       },
//     ],
//   },
// ],
