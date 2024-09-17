"use server";

import { MODEL } from "@/model/model";
import { db } from "@/utils/drizzle/db";
import { IMangaTableInsert, IMangaTableSelect, MangaTable } from "@/utils/drizzle/schema";
import { and, eq, ilike, sql } from "drizzle-orm";
import { errorResponse, getSearchParams, successResponse } from "../helper/apiHelper";
import API from "../API";
import { generateSqlFilterFromModel } from "@/utils/drizzle/helper/filter";

type IGetUserMangas = {
  listId: string;
} & IApiProps;

export const GetUserMangas = async (props: IGetUserMangas): Promise<IApiResponse<IMangaTableSelect[]>> => {
  const { params, skip, listId } = props;

  try {
    const { q, page, limit, ...sqlParams } = getSearchParams(params);

    const sqlTableParams = generateSqlFilterFromModel(MangaTable, MODEL.MANGA, sqlParams);

    if (skip) return successResponse({ data: [] });

    const baseQuery = db
      .select()
      .from(MangaTable)
      .where(
        and(
          eq(MangaTable[MODEL.MANGA.LIST], listId),
          eq(MangaTable[MODEL.MANGA.ARCHIVED], false),
          ...sqlTableParams,
          q ? ilike(MangaTable[MODEL.MANGA.NAME], `%${q}%`) : undefined,
        ),
      );

    const mangas = await baseQuery;

    return successResponse({ data: mangas });
  } catch (error) {
    return errorResponse({ data: {}, code: API.CODE.ERROR.SERVER_ERROR });
  }
};

type IGetUserMangaList = {
  listId: string;
} & IApiProps;

export const GetUserMangaList = async (props: IGetUserMangaList): Promise<IApiResponse<IList<IMangaTableSelect>>> => {
  const { params, skip, listId } = props;

  try {
    const { q, page, limit, ...sqlParams } = getSearchParams(params);
    const sqlTableParams = generateSqlFilterFromModel(MangaTable, MODEL.MANGA, sqlParams);

    if (skip) return successResponse({ data: { count: 0, results: [] } });

    const totalCount = await db
      .select({
        count: sql<number>`count(*)`.as("count"),
      })
      .from(MangaTable)
      .where(
        and(
          eq(MangaTable[MODEL.MANGA.LIST], listId),
          eq(MangaTable[MODEL.MANGA.ARCHIVED], false),
          ...sqlTableParams,
          q ? ilike(MangaTable[MODEL.MANGA.NAME], `%${q}%`) : undefined,
        ),
      );

    const baseQuery = db
      .select()
      .from(MangaTable)
      .where(
        and(
          eq(MangaTable[MODEL.MANGA.LIST], listId),
          eq(MangaTable[MODEL.MANGA.ARCHIVED], false),
          ...sqlTableParams,
          q ? ilike(MangaTable[MODEL.MANGA.NAME], `%${q}%`) : undefined,
        ),
      )
      .limit(limit)
      .offset((page - 1) * limit);

    const mangas = await baseQuery;

    return successResponse({ data: { count: totalCount[0].count, results: mangas } });
  } catch (error) {
    return errorResponse({ data: {}, code: API.CODE.ERROR.SERVER_ERROR });
  }
};

export type IGetUserManga = {
  id: string;
} & IApiProps;

export const GetUserManga = async (props: IGetUserManga): Promise<IApiResponse<IMangaTableSelect>> => {
  const { id } = props;
  try {
    const mangas = await db.select().from(MangaTable).where(eq(MangaTable[MODEL.MANGA.ID], id));

    if (!mangas.length) return errorResponse({ code: API.CODE.ERROR.BAD_REQUEST, data: {} });

    return successResponse({ data: mangas[0] });
  } catch (error) {
    return errorResponse({ code: API.CODE.ERROR.SERVER_ERROR, data: {} });
  }
};

export const AddUserManga = async (
  props: IApiPostProps<IMangaTableInsert>,
): Promise<IApiResponse<IMangaTableSelect>> => {
  const { payload } = props;
  try {
    const manga = await db.insert(MangaTable).values(payload).returning();

    return successResponse({ data: manga[0], code: API.CODE.SUCCESS.CREATED });
  } catch (error) {
    return errorResponse({ code: API.CODE.ERROR.SERVER_ERROR, data: {} });
  }
};

export const ArchivedUserManga = async (props: IApiPostProps<ID>): Promise<IApiResponse<IMangaTableSelect>> => {
  const { payload } = props;
  try {
    const manga = await db
      .update(MangaTable)
      .set({
        [MODEL.MANGA.ARCHIVED]: true,
        [MODEL.MANGA.DELETED_AT]: sql`NOW()`,
      })
      .where(eq(MangaTable[MODEL.MANGA.ID], String(payload)))
      .returning();

    return successResponse({ data: manga[0], code: API.CODE.SUCCESS.CREATED });
  } catch (error) {
    return errorResponse({ code: API.CODE.ERROR.SERVER_ERROR, data: {} });
  }
};
