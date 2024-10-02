import { MODEL } from "@/model/model";
import { sql } from "drizzle-orm";
import { boolean, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const UserProfileTable = pgTable(MODEL.USER_PROFILE.name, {
  [MODEL.USER_PROFILE.ID]: uuid(MODEL.USER_PROFILE.ID).primaryKey().defaultRandom(),
  [MODEL.USER_PROFILE.USER_ID]: varchar(MODEL.USER_PROFILE.USER_ID, { length: 255 }).notNull(),
  [MODEL.USER_PROFILE.NAME]: varchar(MODEL.USER_PROFILE.NAME, { length: 255 }).notNull(),
  [MODEL.USER_PROFILE.CREATED_AT]: timestamp(MODEL.USER_PROFILE.CREATED_AT, { withTimezone: true }).default(sql`NOW()`),
  [MODEL.USER_PROFILE.UPDATED_AT]: timestamp(MODEL.USER_PROFILE.UPDATED_AT, { withTimezone: true }).default(sql`NOW()`),
  [MODEL.USER_PROFILE.DELETED_AT]: timestamp(MODEL.USER_PROFILE.DELETED_AT, { withTimezone: true }),
  [MODEL.USER_PROFILE.ARCHIVED]: boolean(MODEL.USER_PROFILE.ARCHIVED).default(false),
});
export type IUserProfileTableInsert = typeof UserProfileTable.$inferInsert;
export type IUserProfileTableSelect = typeof UserProfileTable.$inferSelect;
export const insertUserProfileTableSchema = createInsertSchema(UserProfileTable);
export const selectUserProfileTableSchema = createSelectSchema(UserProfileTable);
