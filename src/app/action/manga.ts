"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { CreateUserMangaList } from "@/app/api/manga-list/manga-list-api";
import { AddUserManga, ArchivedUserManga, UpdateUserManga } from "@/app/api/manga/manga-api";
import {
  IMangaImageTableInsert,
  IMangaImageTableSelect,
  IMangaTableSelect,
  insertMangaSchema,
  MangaImageTable,
  MangaTable,
} from "@/utils/drizzle/schema";
import { MODEL } from "@/model/model";
import { db } from "@/utils/drizzle/db";
import API from "../api/API";
import { errorResponse, successResponse } from "../api/helper/apiHelper";
import { uploadMangaImageToStorage } from "../api/storage/upload";
import { eq, sql } from "drizzle-orm";

export async function createMangaListAction() {
  const { error } = await CreateUserMangaList({});

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
}

export async function addMangaAction(payload: object) {
  const validation = insertMangaSchema.safeParse(payload);

  if (!validation.success) {
    return {
      status: null,
      error: "Fetching Failed",
      code: 500,
    };
  }

  const response = await AddUserManga({ payload: validation.data });

  revalidatePath("/", "layout");
  return response;
}

export async function archivedMangaAction(id: ID) {
  const response = await ArchivedUserManga({ payload: id });

  revalidatePath("/", "layout");
  return response;
}

export async function hideMangaAction(id: ID) {
  const payload = {
    [MODEL.MANGA.HIDE]: true,
  };
  const response = await UpdateUserManga({ id, payload });

  revalidatePath("/", "layout");
  return response;
}

export async function unhideMangaAction(id: ID) {
  const payload = {
    [MODEL.MANGA.HIDE]: false,
  };
  const response = await UpdateUserManga({ id, payload });

  revalidatePath("/", "layout");
  return response;
}

export async function uploadMangaImageAction(id: ID) {
  const payload = {
    [MODEL.MANGA.HIDE]: false,
  };
  const response = await UpdateUserManga({ id, payload });

  revalidatePath("/", "layout");
  return response;
}

export const AddMangaImageAction = async (
  props: IApiPostProps<{
    manga: IMangaTableSelect;
    imageData: IUploadFileToStorageSuccessResponse;
    setAsThumbnail?: boolean;
  }>,
): Promise<IApiResponse<IMangaImageTableSelect>> => {
  const {
    payload: { manga, imageData, setAsThumbnail },
  } = props;

  try {
    const payload: IMangaImageTableInsert = {
      [MODEL.MANGA_IMAGE.URL]: imageData.publicUrl,
      [MODEL.MANGA_IMAGE.FULL_PATH]: imageData.fullPath,
      [MODEL.MANGA_IMAGE.IMAGE_ID]: imageData.id,
      [MODEL.MANGA_IMAGE.PATH]: imageData.path,
      [MODEL.MANGA_IMAGE.PUBLIC_URL]: imageData.publicUrl,
      [MODEL.MANGA_IMAGE.MANGA_ID]: manga[MODEL.MANGA.ID],
    };

    let mangaImage: IMangaImageTableSelect | undefined = undefined;
    await db.transaction(async (trx) => {
      const mangaImages = await trx.insert(MangaImageTable).values(payload).returning();
      mangaImage = mangaImages[0];
      if (!setAsThumbnail || !mangaImage) return;
      const mangaPayload = {
        [MODEL.MANGA.THUMBNAIL]: mangaImage.path,
      };
      await trx
        .update(MangaTable)
        .set({
          ...mangaPayload,
          [MODEL.MANGA.UPDATED_AT]: sql`NOW()`,
        })
        .where(eq(MangaTable[MODEL.MANGA.ID], manga[MODEL.MANGA.ID]));
    });

    revalidatePath("/", "layout");
    if (mangaImage) return successResponse({ data: mangaImage, code: API.CODE.SUCCESS.CREATED });
    return errorResponse({ code: API.CODE.ERROR.BAD_REQUEST });
  } catch (error) {
    return errorResponse({ code: API.CODE.ERROR.SERVER_ERROR });
  }
};
