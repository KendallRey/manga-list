import { MODEL } from "@/model/model";
import { db } from "@/utils/drizzle/db";
import { IMangaTableInsert, IMangaTableSelect, MangaTable } from "@/utils/drizzle/schema";
import { and, eq, ilike } from "drizzle-orm";
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

export const AddUserManga = async (
  props: IApiPostProps<IMangaTableInsert>,
): Promise<IApiResponse<IMangaTableSelect>> => {
  const { payload } = props;
  try {
    const manga = await db.insert(MangaTable).values({
      [MODEL.MANGA.NAME]: payload.name,
      [MODEL.MANGA.LIST]: payload.list_id,
    });

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
