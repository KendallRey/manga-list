import USER_ROUTE from "./ROUTES";

export const APP = {
  NAME: "MANGA LIST",
  ROUTES: {
    USER: USER_ROUTE,
  },
  DEBOUNCE: {
    DELAY: 500
  }
} as const;
