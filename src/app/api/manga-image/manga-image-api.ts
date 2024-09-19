import { MODEL } from "@/model/model";
import { db } from "@/utils/drizzle/db";
import { generateSqlQueriesFromModel } from "@/utils/drizzle/helper/filter";
import { IMangaImageTableSelect, IMangaTableSelect, MangaImageTable, MangaTable } from "@/utils/drizzle/schema";
import { and, eq, ilike } from "drizzle-orm";
import API from "../API";
import { getSearchParams, successResponse, errorResponse } from "../helper/apiHelper";

type IGetMangaImages = {
  mangaId: string;
} & IApiProps;

export const GetMangaImages = async (props: IGetMangaImages): Promise<IApiResponse<IMangaImageTableSelect[]>> => {
  const { params, skip, mangaId } = props;

  try {
    // const { q, page, limit, hide, ...sqlParams } = getSearchParams(params);

    // const { filterBys } = generateSqlQueriesFromModel(MangaTable, MODEL.MANGA, sqlParams, { default: { hide: false } });

    if (skip) return successResponse({ data: [] });

    const baseQuery = db
      .select()
      .from(MangaImageTable)
      .where(
        and(
          eq(MangaImageTable[MODEL.MANGA_IMAGE.MANGA_ID], mangaId),
          eq(MangaImageTable[MODEL.MANGA_IMAGE.ARCHIVED], false),
        ),
      );

    const mangaImages = await baseQuery;

    return successResponse({ data: mangaImages });
  } catch (error) {
    return errorResponse({ code: API.CODE.ERROR.SERVER_ERROR });
  }
};
