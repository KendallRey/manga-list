import { MdDashboard, MdList } from "react-icons/md";
import { RiGalleryView } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

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
  icon: <MdDashboard size={25} className="mx-auto" />,
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
  href: `/user/manga/${ROUTE_ID}`,
} as const;

const MANGA_USER = {
  name: "Manga Details",
  href: `/user/manga/${ROUTE_USER_ID}`,
} as const;

const MANGA_PAGE = {
  name: "Manga List",
  href: `/user/manga`,
  ADD: MANGA_ADD,
  icon: <MdList size={25} className="mx-auto" />,
  UPDATE: MANGA_UPDATE,
  VIEW: MANGA_VIEW,
  USER: MANGA_USER,
} as const;

// #endregion

// #region Images Page

const IMAGES_PAGE = {
  name: "Manga Images",
  href: `/user/images`,
  icon: <RiGalleryView size={25} className="mx-auto" />,
} as const;

// #endregion

// #region Profile Page

const PROFILE_UPDATE = {
  name: "User Profile",
  href: `/user/profile/update`,
} as const;

const PROFILE_PAGE = {
  name: "User Profile",
  href: `/user/profile`,
  icon: <CgProfile size={25} className="mx-auto" />,
  UPDATE: PROFILE_UPDATE,
} as const;

// #endregion

const USER_ROUTE = {
  DASHBOARD_PAGE,
  MANGA_PAGE,
  IMAGES_PAGE,
  PROFILE_PAGE,
} as const;

export default USER_ROUTE;
