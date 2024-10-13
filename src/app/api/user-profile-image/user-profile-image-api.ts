import { MODEL } from "@/model/model";
import { db } from "@/utils/drizzle/db";
import { IUserProfileImageTableSelect, UserProfileImageTable, UserProfileTable } from "@/utils/drizzle/schema";
import { eq } from "drizzle-orm";
import API from "../API";
import { createClient } from "@/utils/supabase/server";

type IGetUserProfileImages = {} & IApiProps;

export const GetUserProfileImages = async (
  props: IGetUserProfileImages,
): Promise<IApiResponse<IUserProfileImageTableSelect[]>> => {
  const {} = props;
  try {
    const supabase = createClient();
    const userData = await supabase.auth.getUser();

    const userProfiles = await db
      .select()
      .from(UserProfileTable)
      .where(eq(UserProfileTable[MODEL.USER_PROFILE.USER_ID], userData.data.user?.id ?? ""))
      .limit(1);

    if (!userProfiles.length)
      return {
        status: "ok",
        code: API.CODE.SUCCESS.OK,
        data: [],
      };

    const userProfile = userProfiles[0];

    const userProfileImages = await db
      .select()
      .from(UserProfileImageTable)
      .where(eq(UserProfileImageTable[MODEL.USER_PROFILE_IMAGE.USER_PROFILE_ID], userProfile[MODEL.USER_PROFILE.ID]));

    return {
      status: "ok",
      code: API.CODE.SUCCESS.OK,
      data: userProfileImages,
    };
  } catch (error) {
    return {
      status: null,
      error: "Fetching Failed",
      code: API.CODE.ERROR.SERVER_ERROR,
    };
  }
};
