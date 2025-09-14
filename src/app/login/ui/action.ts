"use server";

import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import USER_ROUTE from "@/constants/ROUTES";
import { LoginFormSchema } from "@/model/login/login";

export async function userLoginAction(_data: unknown) {
  const validation = LoginFormSchema.safeParse(_data);
  if (!validation.success) redirect("/error");

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword(validation.data);

  if (error) {
    return { error: error.message };
  }

  return data;
}

export async function userSignUpAction(_data: unknown) {
  const validation = LoginFormSchema.safeParse(_data);
  if (!validation.success) redirect("/error");

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp(validation.data);

  if (error) {
    return { error: error.message };
  }

  return data;
}

export async function userLoginFormAction(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const payload = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await supabase.auth.signInWithPassword(payload);

  if (error) {
    return error.message;
  }

  revalidatePath("/", "layout");
  redirect(USER_ROUTE.MANGA_PAGE.href, RedirectType.replace);
}

export async function userSignupFormAction(formData: FormData) {
  const supabase = await createClient();

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

export async function userLogoutFormAction() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
