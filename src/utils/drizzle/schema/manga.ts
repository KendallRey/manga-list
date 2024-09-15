import { pgTable, varchar, timestamp, boolean, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { MODEL } from "@/model/model";
import { UserTable } from "./authUser";

export const MangaListTable = pgTable(MODEL.MANGA_LIST.name, {
  [MODEL.MANGA_LIST.ID]: uuid(MODEL.MANGA_LIST.ID).primaryKey().defaultRandom(),
  [MODEL.MANGA_LIST.NAME]: varchar(MODEL.MANGA_LIST.NAME, { length: 255 }).notNull(),
  [MODEL.MANGA_LIST.USER_ID]: uuid(MODEL.MANGA_LIST.USER_ID)
    .notNull()
    .references(() => UserTable.id),
  [MODEL.MANGA_LIST.CREATED_AT]: timestamp(MODEL.MANGA_LIST.CREATED_AT, { withTimezone: true }).default(sql`NOW()`),
  [MODEL.MANGA_LIST.UPDATED_AT]: timestamp(MODEL.MANGA_LIST.UPDATED_AT, { withTimezone: true }).default(sql`NOW()`),
  [MODEL.MANGA_LIST.DELETED_AT]: timestamp(MODEL.MANGA_LIST.DELETED_AT, { withTimezone: true }),
  [MODEL.MANGA_LIST.ARCHIVED]: boolean(MODEL.MANGA_LIST.ARCHIVED).default(false),
});

export const MangaTable = pgTable(MODEL.MANGA.name, {
  [MODEL.MANGA.ID]: uuid(MODEL.MANGA.ID).primaryKey().defaultRandom(),
  [MODEL.MANGA.NAME]: varchar(MODEL.MANGA.NAME, { length: 255 }).notNull(),
  [MODEL.MANGA.LIST]: uuid(MODEL.MANGA.LIST).references(() => MangaListTable.id, { onDelete: "set null" }),
  [MODEL.MANGA.CREATED_AT]: timestamp(MODEL.MANGA.CREATED_AT, { withTimezone: true }).default(sql`NOW()`),
  [MODEL.MANGA.UPDATED_AT]: timestamp(MODEL.MANGA.UPDATED_AT, { withTimezone: true }).default(sql`NOW()`),
  [MODEL.MANGA.DELETED_AT]: timestamp(MODEL.MANGA.DELETED_AT, { withTimezone: true }),
  [MODEL.MANGA.ARCHIVED]: boolean(MODEL.MANGA.ARCHIVED).default(false),
});
