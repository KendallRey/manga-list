import MuiPaper from "@/components/paper/Paper";
import Dashboard from "@/components/ui/Dashboard";
import React from "react";
import UserProfile from "../ui/UserProfile";
import UpdateUserProfileForm from "@/app/ui/user-profile/UpdateUserProfileForm";

const ProfileUpdatePage = () => {
  return (
    <Dashboard>
      <MuiPaper className="flex flex-col items-center p-4" elevation={2}>
        <UserProfile />
      </MuiPaper>
      <MuiPaper className="flex-grow p-4 bg-primary-500" elevation={2}>
        <UpdateUserProfileForm />
      </MuiPaper>
      <MuiPaper className="flex-grow p-4" elevation={2}>
        Images
      </MuiPaper>
    </Dashboard>
  );
};

export default ProfileUpdatePage;
