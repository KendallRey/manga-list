"use server";

import { MODEL } from "@/model/model";
import { db } from "@/utils/drizzle/db";
import { IMangaTableInsert, IMangaTableSelect, MangaTable } from "@/utils/drizzle/schema";
import { and, eq, ilike, sql } from "drizzle-orm";
import { errorResponse, successResponse, toSearchParams } from "../helper/apiHelper";
import API from "../API";

type IGetUserMangas = {
  listId: string;
} & IApiProps;

const DEFAULT_LIMIT = 100;

export const GetUserMangas = async (props: IGetUserMangas): Promise<IApiResponse<IMangaTableSelect[]>> => {
  const { params, ignore, skip, listId } = props;

  try {
    const search = toSearchParams(params);
    const q = search.get("q");
    const page = Number(search.get("page") || 1) - 1;
    const limit = Number(search.get("limit") || DEFAULT_LIMIT);

    if (skip) return successResponse({ data: [] });

    const baseQuery = db
      .select()
      .from(MangaTable)
      .where(
        and(
          eq(MangaTable[MODEL.MANGA.LIST], listId),
          eq(MangaTable[MODEL.MANGA.ARCHIVED], false),
          q ? ilike(MangaTable[MODEL.MANGA.NAME], `%${q}%`) : undefined,
        ),
      )
      .limit(limit)
      .offset(page * limit);

    const mangas = await baseQuery;

    return successResponse({ data: mangas });
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
