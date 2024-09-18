export const ROUTE_ID = ":id:";
export const ROUTE_USER_ID = ":user_id:";

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

// #region Dashboard Page

const DASHBOARD_PAGE = {
  name: "Dashboard",
  href: `/user/dashboard`,
} as const;

// #endregion

// #region Manga Page

const MANGA_ADD = {
  name: "Add Manga",
  href: `/user/manga/add`,
} as const;

const MANGA_UPDATE = {
  name: "Update Manga",
  href: `/user/manga/${ROUTE_ID}/update`,
} as const;

const MANGA_VIEW = {
  name: "Manga Details",
  href: `/user/manga/${ROUTE_ID}/view`,
} as const;

const MANGA_USER = {
  name: "Manga Details",
  href: `/user/manga/${ROUTE_USER_ID}`,
} as const;

const MANGA_PAGE = {
  name: "Manga List",
  href: `/user/manga`,
  ADD: MANGA_ADD,
  UPDATE: MANGA_UPDATE,
  VIEW: MANGA_VIEW,
  USER: MANGA_USER,
} as const;

// #endregion

// #region Profile Page

const PROFILE_PAGE = {
  name: "User Profile",
  href: `/user/profile`,
} as const;

// #endregion

const USER_ROUTE = {
  DASHBOARD_PAGE,
  MANGA_PAGE,
  PROFILE_PAGE,
} as const;

export default USER_ROUTE;
