"use client";

import MuiPaper from "@/components/paper/Paper";
import Dashboard from "@/components/ui/Dashboard";
import React from "react";
import MuiSkeleton from "@/components/skeleton/Skeleton";

const MangaViewPageLoading = () => {
  return (
    <Dashboard>
      <MuiPaper className="p-2 flex">
        <MuiSkeleton width={50} height={24} />
        <MuiSkeleton width={4.6} height={24} className="mx-2" />
        <MuiSkeleton width={Math.random() * 500} height={24} />
      </MuiPaper>
      <MuiPaper className="flex-grow-[2] min-h-[320px] p-4" elevation={2} color="primary">
        <MuiSkeleton />
      </MuiPaper>
    </Dashboard>
  );
};

export default MangaViewPageLoading;
