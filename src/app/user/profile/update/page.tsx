import MuiPaper from "@/components/paper/Paper";
import Dashboard from "@/components/ui/Dashboard";
import React from "react";
import UserProfile from "../ui/UserProfile";
import UpdateUserProfileForm from "@/app/ui/user-profile/UpdateUserProfileForm";
import PageTitle from "@/components/custom/PageTitle";
import UploadImageFile from "@/components/custom/UploadImageFile";
import UpdateUserProfile from "../ui/UpdateUserProfile";

const ProfileUpdatePage = () => {
  return (
    <Dashboard>
      <MuiPaper className="flex flex-col items-center p-4" elevation={2}>
        <UserProfile />
      </MuiPaper>
      <MuiPaper className="p-4 flex flex-col gap-6 bg-primary-500" elevation={2}>
        <UpdateUserProfile />
      </MuiPaper>
      <MuiPaper className="flex-grow p-4" elevation={2}>
        <PageTitle>Profile Images</PageTitle>
      </MuiPaper>
    </Dashboard>
  );
};

export default ProfileUpdatePage;
