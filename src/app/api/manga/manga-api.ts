"use server";

import { MODEL } from "@/model/model";
import { db } from "@/utils/drizzle/db";
import { IMangaTableInsert, IMangaTableSelect, MangaTable } from "@/utils/drizzle/schema";
import { and, eq, ilike, sql } from "drizzle-orm";
import { toSearchParams } from "../helper/apiHelper";

type IGetUserMangas = {
  listId: string;
} & IApiProps;

export const GetUserMangas = async (props: IGetUserMangas): Promise<IApiResponse<IMangaTableSelect[]>> => {
  const { params, skip, listId } = props;
  try {
    const search = toSearchParams(params);
    const q = search.get("q");

    if (skip)
      return {
        status: "ok",
        code: 200,
        data: [],
      };
    const mangas = await db
      .select()
      .from(MangaTable)
      .where(
        and(
          eq(MangaTable[MODEL.MANGA.LIST], listId),
          eq(MangaTable[MODEL.MANGA.ARCHIVED], false),
          q ? ilike(MangaTable[MODEL.MANGA.NAME], `%${q}%`) : undefined,
        ),
      );

    return {
      status: "ok",
      code: 200,
      data: mangas,
    };
  } catch (error) {
    return {
      status: null,
      error: "Fetching Failed",
      code: 500,
    };
  }
};

export type IGetUserManga = {
  id: string;
} & IApiProps;

export const GetUserManga = async (props: IGetUserManga): Promise<IApiResponse<IMangaTableSelect>> => {
  const { params, skip, id } = props;
  try {
    const mangas = await db.select().from(MangaTable).where(eq(MangaTable[MODEL.MANGA.ID], id));

    if (!mangas.length)
      return {
        status: null,
        error: "Fetching Failed",
        code: 404,
      };

    return {
      status: "ok",
      code: 200,
      data: mangas[0],
    };
  } catch (error) {
    return {
      status: null,
      error: "Fetching Failed",
      code: 500,
    };
  }
};

export const AddUserManga = async (
  props: IApiPostProps<IMangaTableInsert>,
): Promise<IApiResponse<IMangaTableSelect>> => {
  const { payload } = props;
  try {
    const manga = await db.insert(MangaTable).values(payload).returning();

    return {
      status: "ok",
      code: 200,
      data: manga[0],
    };
  } catch (error) {
    return {
      status: null,
      error: "Fetching Failed",
      code: 500,
    };
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

    return {
      status: "ok",
      code: 200,
      data: manga[0],
    };
  } catch (error) {
    return {
      status: null,
      error: "Archived Failed",
      code: 500,
    };
  }
};
