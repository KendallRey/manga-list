import MangaCardSkeleton from "@/app/ui/manga/MangaCardSkeleton";
import MuiPaper from "@/components/paper/Paper";
import MuiSkeleton from "@/components/skeleton/Skeleton";
import React from "react";

const MangaLoading = () => {
  return (
    <MuiPaper className="flex-grow flex flex-col min-h-[240px] gap-6 p-4" elevation={2} color="primary">
      <MuiSkeleton height={24} className="mt-1" width={150} />
      <div className="flex gap-4 flex-wrap my-2">
        <MangaCardSkeleton />
        <MangaCardSkeleton />
        <MangaCardSkeleton />
      </div>
    </MuiPaper>
  );
};

export default MangaLoading;
