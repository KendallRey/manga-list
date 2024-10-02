import DisplayUserProfileSkeleton from "@/app/ui/user-profile/DisplayUserProfileSkeleton";
import MuiPaper from "@/components/paper/Paper";
import React from "react";

const DasboardProfileLoading = () => {
  return (
    <MuiPaper className="flex items-center justify-center min-h-[240px] gap-6 p-4">
      <DisplayUserProfileSkeleton />
    </MuiPaper>
  );
};

export default DasboardProfileLoading;
