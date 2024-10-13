import { GetUserProfileImages } from "@/app/api/user-profile-image/user-profile-image-api";
import ErrorPage from "@/app/error/page";
import PageTitle from "@/components/custom/PageTitle";
import DisplayList from "@/components/helper-components/DisplayList";
import React from "react";
import ProfileImageCard from "./ProfileImageCard";
import { MODEL } from "@/model/model";

const UserProfileImages = async () => {
  const userProfileImages = await GetUserProfileImages({});

  if (!userProfileImages.status) {
    return <ErrorPage />;
  }
  if (!userProfileImages.data.length) {
    return <></>;
  }

  return (
    <>
      <PageTitle>Profile Images</PageTitle>
      <div className="flex flex-wrap gap-4">
        <DisplayList
          data={userProfileImages.data}
          render={(image) => <ProfileImageCard key={image[MODEL.USER_PROFILE_IMAGE.ID]} profileImage={image} />}
        />
      </div>
    </>
  );
};

export default UserProfileImages;
