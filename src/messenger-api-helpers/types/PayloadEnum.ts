export enum Payload {
  // General payload types
  GET_STARTED = "GET_STARTED",
  MORE_INFORMATION = "MORE_INFORMATION",
  SUGGEST_TWITTER = "SUGGEST_TWITTER",
  USER_UPDATE = "USER_UPDATE",
  USER_FOLLOWING = "USER_FOLLOWING",

  // Twitter handle payload types (include _@... postfix)
  TWITTER_HANDLE_SEARCH = "TWITTER_HANDLE_SEARCH",
  TWITTER_HANDLE_LATEST = "TWITTER_HANDLE_LATEST",
  TWITTER_HANDLE_POPULAR = "TWITTER_HANDLE_POPULAR",
  TWITTER_HANDLE_FOLLOW = "TWITTER_HANDLE_FOLLOW",
  TWITTER_HANDLE_UNFOLLOW = "TWITTER_HANDLE_UNFOLLOW",
}
