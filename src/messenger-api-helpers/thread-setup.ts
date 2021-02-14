import { persistentMenu, getStarted } from "./messages";
import { callMessengerProfileAPI } from "./api";

export const threadSetup = {
  setPersistentMenu: () => {
    callMessengerProfileAPI(persistentMenu());
  },

  setGetStarted: () => {
    callMessengerProfileAPI(getStarted());
  },
};
