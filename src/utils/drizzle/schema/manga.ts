import { pgTable, varchar, timestamp, boolean, uuid, index, pgEnum } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { MODEL } from "@/model/model";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const MangaListTable = pgTable(MODEL.MANGA_LIST.name, {
  [MODEL.MANGA_LIST.ID]: uuid(MODEL.MANGA_LIST.ID).primaryKey().defaultRandom(),
  [MODEL.MANGA_LIST.NAME]: varchar(MODEL.MANGA_LIST.NAME, { length: 255 }).notNull(),
  [MODEL.MANGA_LIST.USER_ID]: varchar(MODEL.MANGA_LIST.USER_ID, { length: 255 }).notNull(),
  [MODEL.MANGA_LIST.CREATED_AT]: timestamp(MODEL.MANGA_LIST.CREATED_AT, { withTimezone: true }).default(sql`NOW()`),
  [MODEL.MANGA_LIST.UPDATED_AT]: timestamp(MODEL.MANGA_LIST.UPDATED_AT, { withTimezone: true }).default(sql`NOW()`),
  [MODEL.MANGA_LIST.DELETED_AT]: timestamp(MODEL.MANGA_LIST.DELETED_AT, { withTimezone: true }),
  [MODEL.MANGA_LIST.ARCHIVED]: boolean(MODEL.MANGA_LIST.ARCHIVED).default(false),
});
export type IMangaListTableInsert = typeof MangaListTable.$inferInsert;
export type IMangaListTableSelect = typeof MangaListTable.$inferSelect;
export const insertMangaListSchema = createInsertSchema(MangaListTable);
export const selectMangaListSchema = createSelectSchema(MangaListTable);

export const MangaTypeEnum = pgEnum(MODEL.MANGA.TYPE, Object.values(MODEL.ENUM.MANGA_TYPE) as [string, ...string[]]);

export const MangaTable = pgTable(
  MODEL.MANGA.name,
  {
    [MODEL.MANGA.ID]: uuid(MODEL.MANGA.ID).primaryKey().defaultRandom(),
    [MODEL.MANGA.NAME]: varchar(MODEL.MANGA.NAME, { length: 255 }).notNull(),
    [MODEL.MANGA.URL]: varchar(MODEL.MANGA.URL, { length: 255 }),
    [MODEL.MANGA.THUMBNAIL]: varchar(MODEL.MANGA.THUMBNAIL, { length: 255 }),
    [MODEL.MANGA.DESCRIPTION]: varchar(MODEL.MANGA.DESCRIPTION, { length: 2048 }),
    [MODEL.MANGA.LIST]: uuid(MODEL.MANGA.LIST).references(() => MangaListTable.id, { onDelete: "set null" }),
    [MODEL.MANGA.CREATED_AT]: timestamp(MODEL.MANGA.CREATED_AT, { withTimezone: true }).default(sql`NOW()`),
    [MODEL.MANGA.UPDATED_AT]: timestamp(MODEL.MANGA.UPDATED_AT, { withTimezone: true }).default(sql`NOW()`),
    [MODEL.MANGA.DELETED_AT]: timestamp(MODEL.MANGA.DELETED_AT, { withTimezone: true }),
    [MODEL.MANGA.ARCHIVED]: boolean(MODEL.MANGA.ARCHIVED).default(false),
    [MODEL.MANGA.HIDE]: boolean(MODEL.MANGA.HIDE).default(false),
    [MODEL.MANGA.DANGER]: boolean(MODEL.MANGA.DANGER).default(false),
    [MODEL.MANGA.SPICY]: boolean(MODEL.MANGA.SPICY).default(false),
    [MODEL.MANGA.TYPE]: MangaTypeEnum(MODEL.MANGA.TYPE),
  },
  (table) => {
    return {
      name_idx: index(MODEL.MANGA.NAME_IDX).on(table[MODEL.MANGA.NAME]),
    };
  },
);
export type IMangaTableInsert = typeof MangaTable.$inferInsert;
export type IMangaTableSelect = typeof MangaTable.$inferSelect;
export const insertMangaSchema = createInsertSchema(MangaTable);
export const upsertMangaSchema = createSelectSchema(MangaTable).pick({
  [MODEL.MANGA.ID]: true,
  [MODEL.MANGA.NAME]: true,
  [MODEL.MANGA.DESCRIPTION]: true,
  [MODEL.MANGA.HIDE]: true,
  [MODEL.MANGA.SPICY]: true,
  [MODEL.MANGA.DANGER]: true,
  [MODEL.MANGA.URL]: true,
  [MODEL.MANGA.TYPE]: true,
});
export const selectMangaSchema = createSelectSchema(MangaTable);

export const MangaImageTable = pgTable(MODEL.MANGA_IMAGE.name, {
  [MODEL.MANGA_IMAGE.ID]: uuid(MODEL.MANGA.ID).primaryKey().defaultRandom(),
  [MODEL.MANGA_IMAGE.MANGA_ID]: uuid(MODEL.MANGA_IMAGE.MANGA_ID).references(() => MangaTable.id, {
    onDelete: "set null",
  }),
  [MODEL.MANGA_IMAGE.URL]: varchar(MODEL.MANGA_IMAGE.URL, { length: 500 }).notNull(),
  [MODEL.MANGA_IMAGE.IMAGE_ID]: varchar(MODEL.MANGA_IMAGE.IMAGE_ID, { length: 255 }).notNull(),
  [MODEL.MANGA_IMAGE.PATH]: varchar(MODEL.MANGA_IMAGE.PATH, { length: 500 }).notNull(),
  [MODEL.MANGA_IMAGE.FULL_PATH]: varchar(MODEL.MANGA_IMAGE.FULL_PATH, { length: 500 }).notNull(),
  [MODEL.MANGA_IMAGE.PUBLIC_URL]: varchar(MODEL.MANGA_IMAGE.PUBLIC_URL, { length: 500 }).notNull(),
  [MODEL.MANGA_IMAGE.CREATED_AT]: timestamp(MODEL.MANGA_IMAGE.CREATED_AT, { withTimezone: true }).default(sql`NOW()`),
  [MODEL.MANGA_IMAGE.UPDATED_AT]: timestamp(MODEL.MANGA_IMAGE.UPDATED_AT, { withTimezone: true }).default(sql`NOW()`),
  [MODEL.MANGA_IMAGE.DELETED_AT]: timestamp(MODEL.MANGA_IMAGE.DELETED_AT, { withTimezone: true }),
  [MODEL.MANGA_IMAGE.ARCHIVED]: boolean(MODEL.MANGA_IMAGE.ARCHIVED).default(false),
});
export type IMangaImageTableInsert = typeof MangaImageTable.$inferInsert;
export type IMangaImageTableSelect = typeof MangaImageTable.$inferSelect;
export const insertMangaImageSchema = createInsertSchema(MangaImageTable);
export const selectMangaImageSchema = createSelectSchema(MangaImageTable);
