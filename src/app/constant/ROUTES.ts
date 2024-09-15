export const ROUTE_ID = ":id:";

// #region Status Page

const ERROR_PAGE = {
  name: "Error",
  href: `/error`,
} as const;

const UNAUTHORIZED_PAGE = {
  name: "Unauthorized",
  href: `/unauthorized`,
} as const;

export const PAGE_ROUTES = {
  ERROR_PAGE,
  UNAUTHORIZED_PAGE,
} as const;

// #endregion

// #region Manga Page

const MANGA_ADD = {
  name: "Add Manga",
  href: `user/manga/add`,
} as const;

const MANGA_UPDATE = {
  name: "Update Manga",
  href: `user/manga/update/${ROUTE_ID}`,
} as const;

const MANGA_VIEW = {
  name: "Manga Details",
  href: `user/manga/view/${ROUTE_ID}`,
} as const;

const MANGA_PAGE = {
  name: "Manga List",
  href: `user/manga`,
  ADD: MANGA_ADD,
  UPDATE: MANGA_UPDATE,
  VIEW: MANGA_VIEW,
} as const;

// #endregion

// #region Profile Page

const PROFILE_PAGE = {
  name: "User Profile",
  href: `user/profile`,
} as const;

// #endregion

const AUTH_ROUTE = {
  MANGA_PAGE,
  PROFILE_PAGE,
} as const;

export default AUTH_ROUTE;
