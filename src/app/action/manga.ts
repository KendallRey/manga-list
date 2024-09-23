"use server";

import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

import { CreateUserMangaList } from "@/app/api/manga-list/manga-list-api";
import { AddUserManga, ArchivedUserManga, UpdateUserManga } from "@/app/api/manga/manga-api";
import {
  IMangaImageTableInsert,
  IMangaImageTableSelect,
  IMangaTableSelect,
  insertMangaSchema,
  MangaImageTable,
  MangaTable,
  upsertMangaSchema,
} from "@/utils/drizzle/schema";
import { MODEL } from "@/model/model";
import { db } from "@/utils/drizzle/db";
import API from "../api/API";
import { errorResponse, successResponse } from "../api/helper/apiHelper";
import { eq, sql } from "drizzle-orm";
import USER_ROUTE from "@/constants/ROUTES";
import { formDataToObject } from "@/model/helper/form";

export async function createMangaListAction() {
  const { error } = await CreateUserMangaList({});

  if (error) {
    redirect("/error");
  }

  redirect(USER_ROUTE.MANGA_PAGE.href, RedirectType.replace);
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

export async function updateMangaAction(_id: string, data: Record<string, any>) {
  const validation = upsertMangaSchema.safeParse({ id: _id, ...data });
  if (!validation.success) {
    return errorResponse({ code: API.CODE.ERROR.BAD_REQUEST, error: API.MESSAGE.ERROR.INCOMPLETE_FORM });
  }

  const {
    data: { id, ...payload },
  } = validation;
  const response = await UpdateUserManga({ id, payload });
  if (response.status) revalidatePath("/", "layout");
  return response;
}

export async function updateMangaFormAction(formData: FormData) {
  const data = formDataToObject(formData);

  const validation = upsertMangaSchema.safeParse(data);
  if (!validation.success) {
    return errorResponse({ code: API.CODE.ERROR.BAD_REQUEST, error: API.MESSAGE.ERROR.INCOMPLETE_FORM });
  }

  const {
    data: { id, ...payload },
  } = validation;
  const response = await UpdateUserManga({ id, payload });

  revalidatePath("/", "layout");
  return response;
}

export async function setMangaHideAction(id: ID, hide: boolean) {
  const payload = {
    [MODEL.MANGA.HIDE]: hide,
  };
  const response = await UpdateUserManga({ id, payload });

  revalidatePath("/", "layout");
  return response;
}

export async function setMangaSpicyAction(id: ID, isSpicy: boolean) {
  const payload = {
    [MODEL.MANGA.SPICY]: isSpicy,
  };
  const response = await UpdateUserManga({ id, payload });

  revalidatePath("/", "layout");
  return response;
}

export async function setMangaDangerAction(id: ID, isDanger: boolean) {
  const payload = {
    [MODEL.MANGA.DANGER]: isDanger,
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

export const addMangaImageAction = async (
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

export const setMangaThumbnailAction = async (id: ID, imagePath: string) => {
  const payload = {
    [MODEL.MANGA.THUMBNAIL]: imagePath,
  };
  const response = await UpdateUserManga({ id, payload });

  revalidatePath("/", "layout");
  return response;
};
