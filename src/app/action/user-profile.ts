import USER_ROUTE from "@/constants/ROUTES";
import { CreateUserProfile } from "../api/user-profile/user-profile-api";
import { redirect, RedirectType } from "next/navigation";

export async function createUserProfileAction() {
  const { error } = await CreateUserProfile({});

  if (error) {
    redirect("/error");
  }

  redirect(USER_ROUTE.MANGA_PAGE.href, RedirectType.replace);
}