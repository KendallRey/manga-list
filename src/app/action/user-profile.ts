"use server";

import { revalidatePath } from "next/cache";
import { CreateUserProfile, UpdateUserProfile } from "../api/user-profile/user-profile-api";
import { upsertUserProfileSchema } from "@/utils/drizzle/schema";
import { errorResponse } from "../api/helper/apiHelper";
import API from "../api/API";
import { UpdateUserManga } from "../api/manga/manga-api";

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
