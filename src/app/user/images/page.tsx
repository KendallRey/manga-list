import MuiPaper from "@/components/paper/Paper";
import Dashboard from "@/components/ui/Dashboard";
import React from "react";

const MangaImagesPage = () => {
  return (
    <Dashboard>
      <MuiPaper className=" p-4" elevation={2} color="primary">
        Filter Here
      </MuiPaper>
      <MuiPaper className="flex-grow p-4" elevation={2} color="primary">
        Image List Here
      </MuiPaper>
    </Dashboard>
  );
};

export default MangaImagesPage;
