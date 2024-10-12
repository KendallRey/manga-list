import { GetUserProfiles } from "@/app/api/user-profile/user-profile-api";
import ErrorPage from "@/app/error/page";
import ProfileImagesUpload from "@/app/ui/user-profile/ProfileImagesUpload";
import UpdateUserProfileForm from "@/app/ui/user-profile/UpdateUserProfileForm";
import React from "react";

const UpdateUserProfile = async () => {
  const userProfilesResponse = await GetUserProfiles({});

  if (!userProfilesResponse.status) {
    return <ErrorPage />;
  }
  if (!userProfilesResponse.data.length) {
    return <></>;
  }

  return (
    <>
      <UpdateUserProfileForm />
      <ProfileImagesUpload userProfile={userProfilesResponse.data[0]} />
    </>
  );
};

export default UpdateUserProfile;
