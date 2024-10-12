"use server";

import { revalidatePath } from "next/cache";
import { CreateUserProfile, UpdateUserProfile } from "../api/user-profile/user-profile-api";
import {
  IUserProfileImageTableSelect,
  IUserProfileTableSelect,
  upsertUserProfileSchema,
  UserProfileImageTable,
  UserProfileTable,
} from "@/utils/drizzle/schema";
import { errorResponse, successResponse } from "../api/helper/apiHelper";
import API from "../api/API";
import { UpdateUserManga } from "../api/manga/manga-api";
import { MODEL } from "@/model/model";
import { db } from "@/utils/drizzle/db";
import { eq, sql } from "drizzle-orm";

export async function createUserProfileAction() {
  const response = await CreateUserProfile({});
  if (response.data) {
    revalidatePath("/", "layout");
  }

  return response;
}

export async function updateUserProfileAction(_id: string, data: Record<string, any>) {
  const validation = upsertUserProfileSchema.safeParse({ id: _id, ...data });
  if (!validation.success) {
    return errorResponse({ code: API.CODE.ERROR.BAD_REQUEST, error: API.MESSAGE.ERROR.INCOMPLETE_FORM });
  }

  const {
    data: { id, ...payload },
  } = validation;
  const response = await UpdateUserProfile({ id, payload });
  if (response.status) revalidatePath("/", "layout");
  return response;
}

export const addUserProfileImagesAction = async (
  props: IApiPostProps<{
    profile: IUserProfileTableSelect;
    imagesData: IUploadFileToStorageSuccessResponse[];
    imageThumbnailId?: string;
  }>,
): Promise<IApiResponse<IUserProfileImageTableSelect[]>> => {
  const {
    payload: { profile, imagesData, imageThumbnailId },
  } = props;

  try {
    const payload = imagesData.map((image) => ({
      [MODEL.USER_PROFILE_IMAGE.URL]: image.publicUrl,
      [MODEL.USER_PROFILE_IMAGE.FULL_PATH]: image.fullPath,
      [MODEL.USER_PROFILE_IMAGE.IMAGE_ID]: image.id,
      [MODEL.USER_PROFILE_IMAGE.PATH]: image.path,
      [MODEL.USER_PROFILE_IMAGE.PUBLIC_URL]: image.publicUrl,
      [MODEL.USER_PROFILE_IMAGE.USER_PROFILE_ID]: profile[MODEL.USER_PROFILE.ID],
    }));

    let mangaImages: IUserProfileImageTableSelect[] | undefined = undefined;
    await db.transaction(async (trx) => {
      mangaImages = await trx.insert(UserProfileImageTable).values(payload).returning();
      const imageAsCover = imagesData.find((image) => image.id === imageThumbnailId);
      if (!imageAsCover) return;
      const userProfilePayload = {
        [MODEL.USER_PROFILE.IMAGE_URL]: imageAsCover.path,
      };
      await trx
        .update(UserProfileTable)
        .set({
          ...userProfilePayload,
          [MODEL.USER_PROFILE.UPDATED_AT]: sql`NOW()`,
        })
        .where(eq(UserProfileTable[MODEL.USER_PROFILE.ID], profile[MODEL.USER_PROFILE.ID]));
    });

    revalidatePath("/", "layout");
    if (mangaImages) return successResponse({ data: mangaImages, code: API.CODE.SUCCESS.CREATED });
    return errorResponse({ code: API.CODE.ERROR.BAD_REQUEST });
  } catch (error) {
    return errorResponse({ code: API.CODE.ERROR.SERVER_ERROR });
  }
};
