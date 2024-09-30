"use server";

import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import USER_ROUTE from "@/constants/ROUTES";
import { LoginFormSchema } from "@/model/login/login";

export async function userLoginAction(_data: unknown) {
  const validation = LoginFormSchema.safeParse(_data);
  if (!validation.success) redirect("/error");

  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword(validation.data);

  if (error) {
    return { error: error.message };
  }

  return data;
}

export async function userSignUpAction(_data: unknown) {
  const validation = LoginFormSchema.safeParse(_data);
  if (!validation.success) redirect("/error");

  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp(validation.data);

  if (error) {
    return { error: error.message };
  }

  return data;
}

export async function userLoginFormAction(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const payload = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data, error } = await supabase.auth.signInWithPassword(payload);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect(USER_ROUTE.MANGA_PAGE.href, RedirectType.replace);
}

export async function userSignupAction(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
