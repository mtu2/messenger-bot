const templates = require("./templates");

// Persistent menu inside Messenger conversations
const persistentMenu = () => {
  return {
    persistent_menu: [
      {
        locale: "default",
        composer_input_disabled: false,
        call_to_actions: [
          {
            type: "postback",
            title: "Update me",
            payload: "TWITTER_HANDLE_LATEST_@kanyewest",
          },
          {
            type: "postback",
            title: "Following list",
            payload: "TWITTER_HANDLE_LATEST_@barackobama",
          },
        ],
      },
    ],
  };
};

// Get Started button
const getStarted = () => {
  return {
    get_started: {
      payload: "GET_STARTED",
    },
  };
};

const getStartedQuickReply = (firstName) => {
  const greeting = templates.genText(
    firstName
      ? `Hi ${firstName}, I'm messenger bot 🤖!`
      : `Hi, I'm messenger bot 🤖!`
  );
  const about = templates.genText(
    "I provide tweets to you from your favourite people and will update you with tweets from those you choose to follow 😊"
  );
  const action = templates.genText(
    "Start off by searching for any Twitter 🐦 handles that interest you."
  );
  const quickReply = templates.genQuickReply("For example:", [
    {
      title: "@kanyewest",
      payload: "TWITTER_HANDLE_SEARCH",
      image_url:
        "https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg",
    },
    {
      title: "@BarackObama",
      payload: "TWITTER_HANDLE_SEARCH",
      image_url:
        "https://pbs.twimg.com/profile_images/1329647526807543809/2SGvnHYV_400x400.jpg",
    },
    {
      title: "@Weezer",
      payload: "TWITTER_HANDLE_SEARCH",
      image_url:
        "https://pbs.twimg.com/profile_images/1352117936270565376/TuJO2jN5_400x400.jpg",
    },
    {
      title: "More information",
      payload: "MORE_INFORMATION",
    },
  ]);
  return [greeting, about, action, quickReply];
};

const unknownCommandMessage = (receivedText) => {
  return templates.genText(
    `Command not recognised. You sent: "${receivedText}".`
  );
};

const attachmentMessage = () => {
  return templates.genText(
    "Sorry! I'm not sure what to do with attachments 🥺."
  );
};

const moreInformationMessage = () => {
  const information1 = templates.genText(
    "I am a bot 🤖 designed to provide you with updates from Twitter 🐦."
  );
  const information2 = templates.genText(
    "Give me a Twitter 🐦 handle (e.g. @kanyewest) and I can find their latest or most popular tweets, as well as following them for any future tweets they make 👀."
  );
  const information3 = templates.genText(
    "Check new tweets from your follow list by saying `update` or see who you are following by saying `following`."
  );
  return [information1, information2, information3];
};

const updateMessage = () => {
  // TODO: implement
  return templates.genText("Sorry! I haven't learnt `update` yet 🥺.");
};

const followingMessage = () => {
  // TODO: implement

  const twitterHandle = "@kanyewest"; // dummy

  // Postback buttons
  const latest = templates.genPostbackButton(
    "Latest Tweets",
    `TWITTER_HANDLE_LATEST_${twitterHandle}`
  );
  const unfollow = templates.genPostbackButton(
    "Unfollow",
    `TWITTER_HANDLE_UNFOLLOW_${twitterHandle}`
  );

  // Twitter accounts currently following
  const tweetElement1 = templates.genGenericTemplateElement(
    "Barack Obama ✔️",
    "@BarackObama \n 594.9K Following 129.1M Followers",
    [latest, unfollow],
    "https://pbs.twimg.com/profile_images/1329647526807543809/2SGvnHYV_400x400.jpg"
  );
  const tweetElement2 = templates.genGenericTemplateElement(
    "loltyler1 ✔️",
    "@loltyler1 \n 232 Following 581.1K Followers",
    [latest, unfollow],
    "https://pbs.twimg.com/profile_images/693320968811380736/g3cD_R1A_400x400.png"
  );
  const tweetElement3 = templates.genGenericTemplateElement(
    "Kayla",
    "@macawcaw123 \n 693 Following 184.9K Followers",
    [latest, unfollow],
    "https://pbs.twimg.com/profile_images/1350531125987450883/58gGvECf_400x400.jpg"
  );
  const tweetElement4 = templates.genGenericTemplateElement(
    "100 gecs",
    "@100gecs \n 10 Following 96.8K Followers",
    [latest, unfollow],
    "https://pbs.twimg.com/profile_images/1154386652359512064/EDGkxTYp_400x400.jpg"
  );

  const text = templates.genText(
    "These are the people you're currently following..."
  );

  return [
    text,
    templates.genGenericTemplate([
      tweetElement1,
      tweetElement2,
      tweetElement3,
      tweetElement4,
    ]),
  ];
};

const twitterHandleSearch = () => {
  // TODO: implement
  const twitterHandle = "@kanyewest"; // dummy

  // Postback buttons
  const latest = templates.genPostbackButton(
    "Latest Tweets",
    `TWITTER_HANDLE_LATEST_${twitterHandle}`
  );
  const popular = templates.genPostbackButton(
    "Most Popular Tweets",
    `TWITTER_HANDLE_POPULAR_${twitterHandle}`
  );
  const follow = templates.genPostbackButton(
    "Follow",
    `TWITTER_HANDLE_FOLLOW_${twitterHandle}`
  );

  // Twitter accounts found
  const tweetElement1 = templates.genGenericTemplateElement(
    "ye ✔️",
    "@kanyewest \n 239 Following 30.7M Followers",
    [latest, popular, follow],
    "https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg"
  );
  const tweetElement2 = templates.genGenericTemplateElement(
    "LeBron James ✔️",
    "@KingJames \n 191 Following 49M Followers",
    [latest, popular, follow],
    "https://pbs.twimg.com/profile_images/1010862750401253377/Rof4XuYC_400x400.jpg"
  );
  const tweetElement3 = templates.genGenericTemplateElement(
    "Alexandria Ocasio-Cortez ✔️",
    "@AOC \n 3,125 Following 12.3M Followers",
    [latest, popular, follow],
    "https://pbs.twimg.com/profile_images/923274881197895680/AbHcStkl_400x400.jpg"
  );

  const text = templates.genText("These are the people I've found");

  return [
    text,
    templates.genGenericTemplate([tweetElement1, tweetElement2, tweetElement3]),
  ];
};

const twitterHandleLatest = (twitterHandle) => {
  // TODO: implement
  return templates.genText(
    `If you’ve worked on advanced wearables, phones or robots, those skills are needed @neuralink \n\n Elon Musk ${twitterHandle} Dec 12, 2020 \n 💬 9.8K  🔁 12.8K  ❤️ 139.9K`
  );
};

const twitterHandlePopular = (twitterHandle) => {
  // TODO: implement
  return templates.genText(
    `Getting most popular tweets from ${twitterHandle}.`
  );
};

const twitterHandleFollow = (twitterHandle) => {
  // TODO: implement
  return templates.genText(`Now following ${twitterHandle}.`);
};

const twitterHandleUnfollow = (twitterHandle) => {
  // TODO: implement
  return templates.genText(`Unfollowed ${twitterHandle}.`);
};

module.exports = {
  persistentMenu,
  getStarted,
  getStartedQuickReply,
  unknownCommandMessage,
  attachmentMessage,
  moreInformationMessage,
  updateMessage,
  followingMessage,
  twitterHandleSearch,
  twitterHandleLatest,
  twitterHandlePopular,
  twitterHandleFollow,
  twitterHandleUnfollow,
};

/* Twitter Handle Search Quick Reply
return templates.genQuickReply("These are the people I've found", [
  {
    title: "@kanyewest",
    payload: "TWITTER_HANDLE_SELECT",
    image_url:
      "https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg",
  },
  {
    title: "@BarackObama",
    payload: "TWITTER_HANDLE_SELECT",
    image_url:
      "https://pbs.twimg.com/profile_images/1329647526807543809/2SGvnHYV_400x400.jpg",
  },
  {
    title: "@Weezer",
    payload: "TWITTER_HANDLE_SELECT",
    image_url:
      "https://pbs.twimg.com/profile_images/1352117936270565376/TuJO2jN5_400x400.jpg",
  },
]); */
