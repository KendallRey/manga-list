import { GetUserProfiles } from "@/app/api/user-profile/user-profile-api";
import ErrorPage from "@/app/error/page";
import CreateUserProfile from "@/app/ui/user-profile/CreateUserProfile";
import DisplayUserProfile from "@/app/ui/user-profile/DisplayUserProfile";
import React from "react";

const UserProfile = async () => {
  const userProfilesResponse = await GetUserProfiles({});

  if (!userProfilesResponse.status) {
    return <ErrorPage />;
  }
  if (!userProfilesResponse.data.length) {
    return <CreateUserProfile />;
  }

  const userProfile = userProfilesResponse.data[0];

  return <DisplayUserProfile userProfile={userProfile} />;
};

export default UserProfile;
