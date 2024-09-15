"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { CreateUserMangaList } from "@/app/api/manga-list/manga-list-api";
import { AddUserManga } from "@/app/api/manga/manga-api";
import { insertMangaSchema } from "@/utils/drizzle/schema";
import { getValidationErrors } from "@/model/helper/validation";
import { formDataToObject } from "@/model/helper/form";

export async function createMangaListAction() {
  const { error } = await CreateUserMangaList({});

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
}

export async function addMangaAction(formData: FormData) {
  const payload = formDataToObject(formData);

  const validation = insertMangaSchema.safeParse(payload);

  if (!validation.success) {
    const error = getValidationErrors(validation);

    return;
  }

  const { error } = await AddUserManga({ payload: validation.data });

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
}
