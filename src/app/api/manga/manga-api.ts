"use server";

import { MODEL } from "@/model/model";
import { db } from "@/utils/drizzle/db";
import { IMangaTableInsert, IMangaTableSelect, MangaTable } from "@/utils/drizzle/schema";
import { and, count, eq, ilike, inArray, sql } from "drizzle-orm";
import { errorResponse, getSearchParams, successResponse } from "../helper/apiHelper";
import API from "../API";
import { generateSqlQueriesFromModel } from "@/utils/drizzle/helper/filter";

type IGetUserMangas = {
  listId: string;
} & IApiProps;

export const GetUserMangas = async (props: IGetUserMangas): Promise<IApiResponse<IMangaTableSelect[]>> => {
  const { params, skip, listId, defaultParams, overrideParams } = props;

  try {
    const { q, page, limit, hide, ...sqlParams } = getSearchParams(params);

    const { filterBys, orderBys } = generateSqlQueriesFromModel(MangaTable, MODEL.MANGA, sqlParams, {
      default: { ...defaultParams, hide: false },
      override: { ...overrideParams },
    });

    if (skip) return successResponse({ data: [] });

    const baseQuery = db
      .select()
      .from(MangaTable)
      .where(
        and(
          eq(MangaTable[MODEL.MANGA.LIST], listId),
          eq(MangaTable[MODEL.MANGA.ARCHIVED], false),
          ...filterBys,
          q ? ilike(MangaTable[MODEL.MANGA.NAME], `%${q}%`) : undefined,
        ),
      )
      .orderBy(...orderBys);

    const mangas = await baseQuery;

    return successResponse({ data: mangas });
  } catch (error) {
    return errorResponse({ code: API.CODE.ERROR.SERVER_ERROR });
  }
};
type IGetUserMangaCount = {
  listId: string;
} & IApiProps;

export const GetUserMangaCount = async (props: IGetUserMangaCount): Promise<IApiResponse<number>> => {
  const { params, skip, listId, defaultParams, overrideParams } = props;

  try {
    const { q, page, limit, hide, ...sqlParams } = getSearchParams(params);

    const { filterBys, orderBys } = generateSqlQueriesFromModel(MangaTable, MODEL.MANGA, sqlParams, {
      default: { ...defaultParams, hide: false },
      override: { ...overrideParams },
    });

    if (skip) return successResponse({ data: 0 });

    const baseQuery = db
      .select({ count: count() })
      .from(MangaTable)
      .where(
        and(
          eq(MangaTable[MODEL.MANGA.LIST], listId),
          eq(MangaTable[MODEL.MANGA.ARCHIVED], false),
          ...filterBys,
          q ? ilike(MangaTable[MODEL.MANGA.NAME], `%${q}%`) : undefined,
        ),
      )
      .orderBy(...orderBys);

    const mangas = await baseQuery;

    return successResponse({ data: mangas.length ? mangas[0].count : 0 });
  } catch (error) {
    return errorResponse({ code: API.CODE.ERROR.SERVER_ERROR });
  }
};

type IGetRandomUserMangas = {
  listId: string;
  indexes?: number[];
} & IApiProps;

export const GetUserRandomMangaList = async (
  props: IGetRandomUserMangas,
): Promise<IApiResponse<IList<IMangaTableSelect>>> => {
  const { params, skip, indexes, listId, defaultParams, overrideParams } = props;

  try {
    const { q, page, limit, hide, ...sqlParams } = getSearchParams(params);

    const { filterBys } = generateSqlQueriesFromModel(MangaTable, MODEL.MANGA, sqlParams, {
      default: { ...defaultParams, hide: false },
      override: { ...overrideParams },
    });

    if (skip) return successResponse({ data: { results: [], count: 0 } });

    const nonArchivedMangas = await db
      .select({ [MODEL.MANGA.ID]: MangaTable[MODEL.MANGA.ID] })
      .from(MangaTable)
      .where(and(eq(MangaTable[MODEL.MANGA.LIST], listId), eq(MangaTable[MODEL.MANGA.ARCHIVED], false), ...filterBys));

    const _count = nonArchivedMangas.length;
    const randomIdIndexes = indexes ?? [];
    const randomNonArchivedMangas = randomIdIndexes.map((index) => nonArchivedMangas[index]);
    const randomNonArchivedMangasIds = randomNonArchivedMangas.map((manga) => manga[MODEL.MANGA.ID]);

    const baseQuery = randomNonArchivedMangasIds.length
      ? db
          .select()
          .from(MangaTable)
          .where(
            and(
              eq(MangaTable[MODEL.MANGA.LIST], listId),
              eq(MangaTable[MODEL.MANGA.ARCHIVED], false),
              ...filterBys,
              inArray(MangaTable[MODEL.MANGA.ID], randomNonArchivedMangasIds),
            ),
          )
      : db
          .select()
          .from(MangaTable)
          .where(
            and(eq(MangaTable[MODEL.MANGA.LIST], listId), eq(MangaTable[MODEL.MANGA.ARCHIVED], false), ...filterBys),
          )
          .orderBy(sql`RANDOM()`)
          .limit(limit);

    const mangas = await baseQuery;

    return successResponse({ data: { results: mangas, count: _count } });
  } catch (error) {
    return errorResponse({ code: API.CODE.ERROR.SERVER_ERROR });
  }
};

type IGetMangaList = {
  listId: string;
} & IApiProps;

export const GetMangaList = async (props: IGetMangaList): Promise<IApiResponse<IList<IMangaTableSelect>>> => {
  const { params, skip, listId, defaultParams, overrideParams } = props;

  try {
    const { q, page, limit, ...sqlParams } = getSearchParams(params);

    const { orderBys, groupByColumns, filterBys } = generateSqlQueriesFromModel(MangaTable, MODEL.MANGA, sqlParams, {
      default: { ...defaultParams, hide: false },
      override: { ...overrideParams },
    });
    if (skip) return successResponse({ data: { count: 0, results: [] } });

    const filters = and(
      eq(MangaTable[MODEL.MANGA.LIST], listId),
      eq(MangaTable[MODEL.MANGA.ARCHIVED], false),
      ...filterBys,
      q ? ilike(MangaTable[MODEL.MANGA.NAME], `%${q}%`) : undefined,
    );

    const totalCount = await db
      .select({
        count: sql<number>`count(*)`.as("count"),
      })
      .from(MangaTable)
      .where(filters);

    const baseQuery = db
      .select()
      .from(MangaTable)
      .where(filters)
      // .groupBy(groupByColumns)
      .orderBy(...orderBys)
      .limit(limit)
      .offset((page - 1) * limit);

    const count = totalCount[0].count;
    const mangas = await baseQuery;

    const isOverPage = Math.max(Math.ceil(count / limit), 1) < page;
    if (isOverPage !== false)
      return errorResponse({ code: API.CODE.ERROR.NOT_FOUND, error: API.MESSAGE.ERROR.INVALID_PAGE });
    return successResponse({ data: { count: Number(count), results: mangas } });
  } catch (error) {
    return errorResponse({ code: API.CODE.ERROR.SERVER_ERROR });
  }
};

export type IGetUserManga = {
  id: unknown;
} & IApiProps;

export const GetUserManga = async (props: IGetUserManga): Promise<IApiResponse<IMangaTableSelect>> => {
  const { id } = props;
  try {
    const mangas = await db
      .select()
      .from(MangaTable)
      .where(eq(MangaTable[MODEL.MANGA.ID], String(id)));

    if (!mangas.length) return errorResponse({ code: API.CODE.ERROR.BAD_REQUEST });

    return successResponse({ data: mangas[0] });
  } catch (error) {
    return errorResponse({ code: API.CODE.ERROR.SERVER_ERROR });
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
    return errorResponse({ code: API.CODE.ERROR.SERVER_ERROR });
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
    return errorResponse({ code: API.CODE.ERROR.SERVER_ERROR });
  }
};

export const UpdateUserManga = async (
  props: IApiPutProps<Record<string, any>>,
): Promise<IApiResponse<IMangaTableSelect>> => {
  const { id, payload } = props;
  try {
    const manga = await db
      .update(MangaTable)
      .set({
        ...payload,
        [MODEL.MANGA.UPDATED_AT]: sql`NOW()`,
      })
      .where(eq(MangaTable[MODEL.MANGA.ID], String(id)))
      .returning();

    return successResponse({ data: manga[0], code: API.CODE.SUCCESS.OK });
  } catch (error) {
    return errorResponse({ code: API.CODE.ERROR.SERVER_ERROR });
  }
};
