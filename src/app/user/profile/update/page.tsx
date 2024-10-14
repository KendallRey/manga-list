import MuiPaper from "@/components/paper/Paper";
import Dashboard from "@/components/ui/Dashboard";
import React from "react";
import UserProfile from "../ui/UserProfile";
import UpdateUserProfile from "../ui/UpdateUserProfile";
import UserProfileImages from "@/app/ui/user-profile/UserProfileImages";

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
        <UserProfileImages />
      </MuiPaper>
    </Dashboard>
  );
};

export default ProfileUpdatePage;
