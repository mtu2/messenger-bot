const getStartedMessage = (firstName) => {
  const greeting = {
    text: firstName
      ? `Hi ${firstName}, I'm messenger bot!`
      : `Hi, I'm messenger bot!`,
  };
  const about = {
    text:
      "I provide tweets to you from your favourite people and will update you with tweets from those you choose to follow 😊",
  };
  const callToAction = {
    text:
      "Start off by searching for any Twitter handles that interest you, for example `@kanyewest`, or enter help for more details",
  };

  return [greeting, about, callToAction];
};

const unknownCommandMessage = (receivedText) => {
  return {
    text: `Command not recognised. You sent: "${receivedText}".`,
  };
};

const attachmentMessage = () => {
  return {
    text: "Sorry, I'm not sure what to do with attachments.",
  };
};

const twitterHandleSearchQuickReply = () => {
  return {
    text: "These are the people I've found",
    quick_replies: [
      {
        content_type: "text",
        title: "@kanyewest",
        payload: "TWITTER_HANDLE_SELECT",
        image_url:
          "https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg",
      },
      {
        content_type: "text",
        title: "@BarackObama",
        payload: "TWITTER_HANDLE_SELECT",
        image_url:
          "https://pbs.twimg.com/profile_images/1329647526807543809/2SGvnHYV_400x400.jpg",
      },
      {
        content_type: "text",
        title: "@Weezer",
        payload: "TWITTER_HANDLE_SELECT",
        image_url:
          "https://pbs.twimg.com/profile_images/1352117936270565376/TuJO2jN5_400x400.jpg",
      },
    ],
  };
};

const twitterHandleSelectQuickReply = (twitterHandle) => {
  return {
    text: `What would you like to see from ${twitterHandle}?`,
    quick_replies: [
      {
        content_type: "text",
        title: "Latest Tweets",
        payload: `TWITTER_HANDLE_LATEST_${twitterHandle}`,
      },
      {
        content_type: "text",
        title: "Most Popular Tweets",
        payload: `TWITTER_HANDLE_POPULAR_${twitterHandle}`,
      },
      {
        content_type: "text",
        title: "Follow",
        payload: `TWITTER_HANDLE_FOLLOW_${twitterHandle}`,
      },
    ],
  };
};

const twitterHandleLatest = (twitterHandle) => {
  return {
    text: `Getting latest tweets from ${twitterHandle}.`,
  };
};

const twitterHandlePopular = (twitterHandle) => {
  return {
    text: `Getting most popular tweets from ${twitterHandle}.`,
  };
};

const twitterHandleFollow = (twitterHandle) => {
  return {
    text: `Now following ${twitterHandle}.`,
  };
};

module.exports = {
  getStartedMessage,
  unknownCommandMessage,
  attachmentMessage,
  twitterHandleSearchQuickReply,
  twitterHandleSelectQuickReply,
  twitterHandleLatest,
  twitterHandlePopular,
  twitterHandleFollow,
};
