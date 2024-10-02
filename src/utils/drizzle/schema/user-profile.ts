import { MODEL } from "@/model/model";
import { sql } from "drizzle-orm";
import { boolean, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const UserProfileTable = pgTable(MODEL.USER_PROFILE.name, {
  [MODEL.USER_PROFILE.ID]: uuid(MODEL.USER_PROFILE.ID).primaryKey().defaultRandom(),
  [MODEL.USER_PROFILE.USER_ID]: varchar(MODEL.USER_PROFILE.USER_ID, { length: 255 }).notNull(),
  [MODEL.USER_PROFILE.NAME]: varchar(MODEL.USER_PROFILE.NAME, { length: 255 }).notNull(),
  [MODEL.USER_PROFILE.IMAGE_URL]: varchar(MODEL.USER_PROFILE.IMAGE_URL, { length: 500 }),
  [MODEL.USER_PROFILE.CREATED_AT]: timestamp(MODEL.USER_PROFILE.CREATED_AT, { withTimezone: true }).default(sql`NOW()`),
  [MODEL.USER_PROFILE.UPDATED_AT]: timestamp(MODEL.USER_PROFILE.UPDATED_AT, { withTimezone: true }).default(sql`NOW()`),
  [MODEL.USER_PROFILE.DELETED_AT]: timestamp(MODEL.USER_PROFILE.DELETED_AT, { withTimezone: true }),
  [MODEL.USER_PROFILE.ARCHIVED]: boolean(MODEL.USER_PROFILE.ARCHIVED).default(false),
});
export type IUserProfileTableInsert = typeof UserProfileTable.$inferInsert;
export type IUserProfileTableSelect = typeof UserProfileTable.$inferSelect;
export const insertUserProfileTableSchema = createInsertSchema(UserProfileTable);
export const selectUserProfileTableSchema = createSelectSchema(UserProfileTable);

export const UserProfileImageTable = pgTable(MODEL.USER_PROFILE_IMAGE.name, {
  [MODEL.USER_PROFILE_IMAGE.ID]: uuid(MODEL.MANGA.ID).primaryKey().defaultRandom(),
  [MODEL.USER_PROFILE_IMAGE.USER_PROFILE_ID]: uuid(MODEL.USER_PROFILE_IMAGE.USER_PROFILE_ID).references(
    () => UserProfileTable[MODEL.USER_PROFILE.ID],
    {
      onDelete: "set null",
    },
  ),
  [MODEL.USER_PROFILE_IMAGE.IMAGE_ID]: varchar(MODEL.USER_PROFILE_IMAGE.IMAGE_ID, { length: 255 }).notNull(),
  [MODEL.USER_PROFILE_IMAGE.PATH]: varchar(MODEL.USER_PROFILE_IMAGE.PATH, { length: 500 }).notNull(),
  [MODEL.USER_PROFILE_IMAGE.FULL_PATH]: varchar(MODEL.USER_PROFILE_IMAGE.FULL_PATH, { length: 500 }).notNull(),
  [MODEL.USER_PROFILE_IMAGE.PUBLIC_URL]: varchar(MODEL.USER_PROFILE_IMAGE.PUBLIC_URL, { length: 500 }).notNull(),
  [MODEL.USER_PROFILE_IMAGE.CREATED_AT]: timestamp(MODEL.USER_PROFILE_IMAGE.CREATED_AT, { withTimezone: true }).default(
    sql`NOW()`,
  ),
  [MODEL.USER_PROFILE_IMAGE.UPDATED_AT]: timestamp(MODEL.USER_PROFILE_IMAGE.UPDATED_AT, { withTimezone: true }).default(
    sql`NOW()`,
  ),
  [MODEL.USER_PROFILE_IMAGE.DELETED_AT]: timestamp(MODEL.USER_PROFILE_IMAGE.DELETED_AT, { withTimezone: true }),
  [MODEL.USER_PROFILE_IMAGE.ARCHIVED]: boolean(MODEL.USER_PROFILE_IMAGE.ARCHIVED).default(false),
});
export type IUserProfileImageTableInsert = typeof UserProfileImageTable.$inferInsert;
export type IUserProfileImageTableSelect = typeof UserProfileImageTable.$inferSelect;
export const insertUserProfileImageSchema = createInsertSchema(UserProfileImageTable);
export const selectUserProfileImageSchema = createSelectSchema(UserProfileImageTable);
