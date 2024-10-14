import MangaCardSkeleton from "@/app/ui/manga/MangaCardSkeleton";
import DisplayUserProfileSkeleton from "@/app/ui/user-profile/DisplayUserProfileSkeleton";
import DisplayList from "@/components/helper-components/DisplayList";
import MuiPaper from "@/components/paper/Paper";
import MuiSkeleton from "@/components/skeleton/Skeleton";
import Dashboard from "@/components/ui/Dashboard";
import React from "react";

const ProfilePageLoading = () => {
  return (
    <Dashboard>
      <MuiPaper className="flex flex-col items-center p-4 gap-1" elevation={2}>
        <DisplayUserProfileSkeleton />
      </MuiPaper>
      <MuiPaper className="flex flex-col gap-1 flex-grow p-4" elevation={2}>
        <MuiSkeleton height={24} className="mt-1" width={150} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <DisplayList data={[1, 2, 3, 4]} render={(item) => <MangaCardSkeleton key={item} />} />
        </div>
      </MuiPaper>
    </Dashboard>
  );
};

export default ProfilePageLoading;
