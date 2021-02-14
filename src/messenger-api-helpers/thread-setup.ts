import { persistentMenu, getStarted } from "./messages";
import { callMessengerProfileAPI } from "./api";

export const threadSetup = {
  setPersistentMenu: (): void => {
    callMessengerProfileAPI([persistentMenu()]);
  },

  setGetStarted: (): void => {
    callMessengerProfileAPI([getStarted()]);
  },
};
