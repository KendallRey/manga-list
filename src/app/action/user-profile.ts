"use server";

import { revalidatePath } from "next/cache";
import { CreateUserProfile } from "../api/user-profile/user-profile-api";

export async function createUserProfileAction() {
  const response = await CreateUserProfile({});
  if (response.data) {
    revalidatePath("/", "layout");
  }

  return response;
}
