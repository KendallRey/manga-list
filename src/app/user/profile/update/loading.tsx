import MuiPaper from "@/components/paper/Paper";
import Dashboard from "@/components/ui/Dashboard";
import React from "react";
import DisplayUserProfileSkeleton from "@/app/ui/user-profile/DisplayUserProfileSkeleton";
import MuiSkeleton from "@/components/skeleton/Skeleton";
import ProfileImageCardSkeleton from "@/app/ui/user-profile/ProfileImageCardSkeleton";
import UserProfileFormSkeleton from "@/app/ui/user-profile/UserProfileFormSkeleton";
import UploadImageFileSkeleton from "@/components/custom/UploadImageFileSkeleton";

const ProfileUpdateLoading = () => {
  return (
    <Dashboard>
      <MuiPaper className="flex flex-col items-center p-4 gap-1" elevation={2}>
        <DisplayUserProfileSkeleton />
      </MuiPaper>
      <MuiPaper className="p-4 flex flex-col gap-6 bg-primary-500" elevation={2}>
        <UserProfileFormSkeleton>
          <MuiSkeleton height={37} variant="rounded" />
        </UserProfileFormSkeleton>
        <UploadImageFileSkeleton />
      </MuiPaper>
      <MuiPaper className="flex flex-col flex-grow p-4 gap-2" elevation={2}>
        <MuiSkeleton height={24} className="mt-1" width={150} />
        <div className="flex flex-wrap gap-4">
          <ProfileImageCardSkeleton />
          <ProfileImageCardSkeleton />
        </div>
      </MuiPaper>
    </Dashboard>
  );
};

export default ProfileUpdateLoading;
