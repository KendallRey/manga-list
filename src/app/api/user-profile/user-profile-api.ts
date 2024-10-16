"use server";

import { MODEL } from "@/model/model";
import { db } from "@/utils/drizzle/db";
import { IUserProfileTableSelect, UserProfileTable } from "@/utils/drizzle/schema";
import { createClient } from "@/utils/supabase/server";
import { eq, sql } from "drizzle-orm";
import API from "../API";
import { errorResponse, successResponse } from "../helper/apiHelper";

export const CreateUserProfile = async (props: IApiProps): Promise<IApiResponse<IUserProfileTableSelect>> => {
  try {
    const supabase = createClient();
    const userData = await supabase.auth.getUser();
    const { user } = userData.data;
    if (!user)
      return {
        status: null,
        error: "Fetching user failed",
        code: 500,
      };

    const userProfile = await db
      .insert(UserProfileTable)
      .values({
        [MODEL.USER_PROFILE.NAME]: user.email ?? user.id,
        [MODEL.USER_PROFILE.USER_ID]: user.id,
      })
      .returning();

    return {
      status: "ok",
      code: 200,
      data: userProfile[0],
    };
  } catch (error) {
    return {
      status: null,
      error: "Create profile failed",
      code: 500,
    };
  }
};

export const GetUserProfiles = async (props: IApiProps): Promise<IApiResponse<IUserProfileTableSelect[]>> => {
  const { params } = props;
  try {
    const supabase = createClient();
    const userData = await supabase.auth.getUser();

    const userProfiles = await db
      .select()
      .from(UserProfileTable)
      .where(eq(UserProfileTable[MODEL.USER_PROFILE.USER_ID], userData.data.user?.id ?? ""))
      .limit(1);

    return {
      status: "ok",
      code: 200,
      data: userProfiles,
    };
  } catch (error) {
    return {
      status: null,
      error: "Fetching Failed",
      code: 500,
    };
  }
};

export const UpdateUserProfile = async (
  props: IApiPutProps<Record<string, any>>,
): Promise<IApiResponse<IUserProfileTableSelect>> => {
  const { id, payload } = props;
  try {
    const manga = await db
      .update(UserProfileTable)
      .set({
        ...payload,
        [MODEL.MANGA.UPDATED_AT]: sql`NOW()`,
      })
      .where(eq(UserProfileTable[MODEL.USER_PROFILE.ID], String(id)))
      .returning();

    return successResponse({ data: manga[0], code: API.CODE.SUCCESS.OK });
  } catch (error) {
    return errorResponse({ code: API.CODE.ERROR.SERVER_ERROR });
  }
};
