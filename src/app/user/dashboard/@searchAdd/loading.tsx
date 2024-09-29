import MangaSearchAddSkeleton from "@/app/ui/manga/MangaSearchAddSkeleton";
import MuiPaper from "@/components/paper/Paper";
import React from "react";

const MangaLoading = () => {
  return (
    <MuiPaper className="p-4" elevation={2} color="primary">
      <MangaSearchAddSkeleton />
    </MuiPaper>
  );
};

export default MangaLoading;
