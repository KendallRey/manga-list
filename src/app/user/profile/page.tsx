import MuiPaper from "@/components/paper/Paper";
import Dashboard from "@/components/ui/Dashboard";
import React from "react";
import UserProfile from "./ui/UserProfile";
import PageTitle from "@/components/custom/PageTitle";
import { blue } from "@mui/material/colors";
import FavoriteMangaList from "./ui/FavoriteMangaList";

const ProfilePage: React.FC<INextPage> = async (props) => {
  const { searchParams } = props;

  return (
    <Dashboard>
      <MuiPaper className="flex flex-col items-center p-4" elevation={2}>
        <UserProfile />
      </MuiPaper>
      <MuiPaper className="flex-grow p-4" elevation={2}>
        <FavoriteMangaList params={searchParams} />
      </MuiPaper>
    </Dashboard>
  );
};

export default ProfilePage;
