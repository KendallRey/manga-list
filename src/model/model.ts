export const BASE_MODEL = {
  ID: "id",
  CREATED_AT: "created_at",
  UPDATED_AT: "updated_at",
  DELETED_AT: "deleted_at",
  ARCHIVED: "archived",
} as const;

export const USER_PROFILE_MODEL = {
  ...BASE_MODEL,
  NAME: "name",
  name: "user_profile",
  USER_ID: "user_id",
} as const;

export const MANGA_MODEL = {
  ...BASE_MODEL,
  name: "manga",
  NAME: "name",
  NAME_IDX: "name_idx",
  URL: "url",
  THUMBNAIL: "thumbnail",
  DESCRIPTION: "description",
  HIDE: "hide",
  LIST: "list_id",
} as const;

export const MANGA_LIST_MODEL = {
  ...BASE_MODEL,
  name: "manga_list",
  NAME: "name",
  USER_ID: "user_id",
} as const;

export const MANGA_IMAGE_MODEL = {
  ...BASE_MODEL,
  name: "manga_image",
  MANGA_ID: "manga_id",
  URL: "url",
  IMAGE_ID: "image_id",
  PATH: "path",
  FULL_PATH: "full_path",
  PUBLIC_URL: "public_url",
} as const;

export const MODEL = {
  BASE: BASE_MODEL,
  USER_PROFILE: USER_PROFILE_MODEL,
  MANGA: MANGA_MODEL,
  MANGA_LIST: MANGA_LIST_MODEL,
  MANGA_IMAGE: MANGA_IMAGE_MODEL,
} as const;
