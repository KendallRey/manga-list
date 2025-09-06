import { GetUserProfiles } from "@/app/api/user-profile/user-profile-api";
import ErrorPage from "@/app/error/page";
import CreateUserProfile from "@/app/ui/user-profile/CreateUserProfile";
import DisplayUserProfile from "@/app/ui/user-profile/DisplayUserProfile";
import CardContainer from "@/components/shared/Card";
import React from "react";

const DashboardProfile = async () => {
  const userProfilesResponse = await GetUserProfiles({});

  if (!userProfilesResponse.status) {
    return (
      <CardContainer>
        <ErrorPage />
      </CardContainer>
    );
  }
  if (!userProfilesResponse.data.length) {
    return <CreateUserProfile />;
  }

  const userProfile = userProfilesResponse.data[0];

  return (
    <CardContainer>
      <DisplayUserProfile userProfile={userProfile} />
    </CardContainer>
  );
};

export default DashboardProfile;
