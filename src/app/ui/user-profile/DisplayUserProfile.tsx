import { MODEL } from "@/model/model";
import { IUserProfileTableSelect } from "@/utils/drizzle/schema";
import { toBucketPublicProfileUrl } from "@/utils/supabase/helper/image";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import React from "react";

type DisplayUserProfileProps = {
  userProfile: IUserProfileTableSelect;
};

const DisplayUserProfile: React.FC<DisplayUserProfileProps> = async (props) => {
  const { userProfile } = props;
  const supabase = await createClient();
  const useData = await supabase.auth.getUser();

  const thumbnailImage = (
    userProfile[MODEL.USER_PROFILE.IMAGE_URL]
      ? toBucketPublicProfileUrl(userProfile[MODEL.USER_PROFILE.IMAGE_URL])
      : "/images/404.jpg"
  ) as string;

  return (
    <div className="flex items-center gap-4">
      <Image src={thumbnailImage} alt="User Avatar" width={140} height={140} className="rounded-full object-cover" />
      <div className="flex flex-col">
        <h6 className="text-lg font-semibold">{userProfile["name"]}</h6>
        <p className="text-sm text-muted-foreground">{useData.data.user?.email}</p>
      </div>
    </div>
  );
};

export default DisplayUserProfile;
