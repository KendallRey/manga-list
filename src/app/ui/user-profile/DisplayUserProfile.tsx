import MuiAvatar from "@/components/avatar/Avatar";
import MuiStack from "@/components/stack/Stack";
import MuiTypography from "@/components/typography/Typograph";
import { MODEL } from "@/model/model";
import { IUserProfileTableSelect } from "@/utils/drizzle/schema";
import { createClient } from "@/utils/supabase/server";
import React from "react";

type IDisplayUserProfile = {
  userProfile: IUserProfileTableSelect;
};

const DisplayUserProfile: React.FC<IDisplayUserProfile> = async (props) => {
  const { userProfile } = props;
  const supabase = createClient();
  const useData = await supabase.auth.getUser();

  return (
    <>
      <MuiAvatar sx={{ width: 140, height: 140 }} />
      <MuiStack>
        <MuiTypography variant="h6">{userProfile[MODEL.USER_PROFILE.NAME]}</MuiTypography>
        <MuiTypography variant="body2">{useData.data.user?.email}</MuiTypography>
      </MuiStack>
    </>
  );
};

export default DisplayUserProfile;
