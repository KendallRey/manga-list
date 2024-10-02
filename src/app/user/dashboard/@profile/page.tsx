import { GetUserProfiles } from "@/app/api/user-profile/user-profile-api";
import CreateUserProfile from "@/app/ui/user-profile/CreateUserProfile";
import DisplayUserProfile from "@/app/ui/user-profile/DisplayUserProfile";
import MuiPaper from "@/components/paper/Paper";
import React from "react";

const DashboardProfile: React.FC<INextPage> = async (props) => {
  const userProfilesResponse = await GetUserProfiles({});

  if (!userProfilesResponse.status) {
    return <MuiPaper></MuiPaper>;
  }
  if (!userProfilesResponse.data.length) {
    return <CreateUserProfile />;
  }

  const userProfile = userProfilesResponse.data[0];

  return (
    <MuiPaper className="flex items-center flex-wrap justify-center min-h-[240px] gap-6 p-4">
      <DisplayUserProfile userProfile={userProfile} />
    </MuiPaper>
  );
};

export default DashboardProfile;
