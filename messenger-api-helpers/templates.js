const utils = require("../utils/utils");

const genText = (text) => ({
  text: text,
});

const genQuickReply = (text, quickReplies) => ({
  text: text,
  quick_replies: quickReplies.map((quickReply) => {
    const ele = {
      content_type: "text",
      title: quickReply["title"],
      payload: quickReply["payload"],
      image_url: quickReply["image_url"],
    };
    utils.removeUndefinedFromObj(ele);
    return ele;
  }),
});

const genGenericTemplate = (elements) => {
  const elementsArray = utils.castArray(elements);

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

const genGenericTemplateElement = (title, subtitle, buttons, image_url) => {
  const buttonsArray =
    buttons === undefined ? undefined : utils.castArray(buttons);

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
  utils.removeUndefinedFromObj(element);

  return element;
};

const genPostbackButton = (title, payload) => ({
  type: "postback",
  title,
  payload,
});

const genWebUrlButton = (title, url) => ({
  type: "web_url",
  title,
  url,
});

module.exports = {
  genText,
  genQuickReply,
  genGenericTemplate,
  genGenericTemplateElement,
  genPostbackButton,
  genWebUrlButton,
};

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
