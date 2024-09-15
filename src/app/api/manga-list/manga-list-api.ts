import { MODEL } from "@/model/model";
import { db } from "@/utils/drizzle/db";
import { IMangaListTableSelect, IMangaTableSelect, MangaListTable } from "@/utils/drizzle/schema";
import { createClient } from "@/utils/supabase/server";
import { eq } from "drizzle-orm";

export const GetUserMangaLists = async (props: IApiProps) => {
  const { params } = props;
  try {
    const supabase = createClient();
    const userData = await supabase.auth.getUser();

    const mangaLists = await db
      .select({
        id: MangaListTable[MODEL.MANGA_LIST.ID],
        name: MangaListTable[MODEL.MANGA_LIST.NAME],
      })
      .from(MangaListTable)
      .where(eq(MangaListTable.user_id, userData.data.user?.id ?? ""));

    return mangaLists;
  } catch (error) {
    return { message: "Unexpected error occurred", error: "test" };
  }
};

export const GetUserMangaList = async (props: IApiProps): Promise<IApiResponse<IMangaListTableSelect[]>> => {
  const { params } = props;
  try {
    const supabase = createClient();
    const userData = await supabase.auth.getUser();

    const mangaLists = await db
      .select()
      .from(MangaListTable)
      .where(eq(MangaListTable.user_id, userData.data.user?.id ?? ""))
      .limit(1);

    return {
      status: "ok",
      code: 200,
      data: mangaLists,
    };
  } catch (error) {
    return {
      status: null,
      error: "Fetching Failed",
      code: 500,
    };
  }
};

export const CreateUserMangaList = async (props: IApiProps): Promise<IApiResponse<IMangaTableSelect>> => {
  try {
    const supabase = createClient();
    const userData = await supabase.auth.getUser();
    const { user } = userData.data;
    if (!user)
      return {
        status: null,
        error: "Fetching Failed",
        code: 500,
      };
    const mangaList = await db.insert(MangaListTable).values({
      [MODEL.MANGA_LIST.NAME]: user.id,
      [MODEL.MANGA_LIST.USER_ID]: user.id,
    });

    return {
      status: "ok",
      code: 200,
      data: mangaList[0],
    };
  } catch (error) {
    return {
      status: null,
      error: "Fetching Failed",
      code: 500,
    };
  }
};
