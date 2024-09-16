"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { CreateUserMangaList } from "@/app/api/manga-list/manga-list-api";
import { AddUserManga, ArchivedUserManga } from "@/app/api/manga/manga-api";
import { insertMangaSchema } from "@/utils/drizzle/schema";

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