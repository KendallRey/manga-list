import MuiAvatar from "@/components/avatar/Avatar";
import MuiPaper from "@/components/paper/Paper";
import React from "react";

const DashboardProfile = () => {
  return (
    <MuiPaper className="flex-grow flex items-center justify-center min-h-[240px] gap-6 p-4">
      <MuiAvatar sx={{ width: 140, height: 140 }} />
    </MuiPaper>
  );
};

export default DashboardProfile;
