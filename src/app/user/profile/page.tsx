import MuiPaper from "@/components/paper/Paper";
import Dashboard from "@/components/ui/Dashboard";
import React from "react";
import UserProfile from "./ui/UserProfile";
import PageTitle from "@/components/custom/PageTitle";
import { blue } from "@mui/material/colors";

const ProfilePage = async () => {
  return (
    <Dashboard>
      <MuiPaper className="flex flex-col items-center p-4" elevation={2}>
        <UserProfile />
      </MuiPaper>
      <div className="flex flex-wrap gap-4">
        <MuiPaper className="flex-grow p-4 bg-primary-500" sx={{ background: blue[500], color: "white" }} elevation={2}>
          Stats 1
        </MuiPaper>
        <MuiPaper className="flex-grow p-4" elevation={2}>
          Stats 1
        </MuiPaper>
        <MuiPaper className="flex-grow p-4" elevation={2}>
          Stats 1
        </MuiPaper>
      </div>
      <MuiPaper className="flex-grow p-4" elevation={2}>
        <PageTitle>Favorites</PageTitle>
      </MuiPaper>
    </Dashboard>
  );
};

export default ProfilePage;
