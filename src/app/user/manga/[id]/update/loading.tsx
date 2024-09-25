"use client";

import MuiPaper from "@/components/paper/Paper";
import Dashboard from "@/components/ui/Dashboard";
import React from "react";
import MuiSkeleton from "@/components/skeleton/Skeleton";
import MuiStack from "@/components/stack/Stack";

const MangaUpdatePageLoading = () => {
  return (
    <Dashboard>
      <MuiPaper className="p-2 flex">
        <MuiSkeleton width={50} height={24} />
        <MuiSkeleton width={4.6} height={24} className="mx-2" />
        <MuiSkeleton width={Math.random() * 500} height={24} />
        <MuiSkeleton width={4.6} height={24} className="mx-2" />
        <MuiSkeleton width={50} height={24} />
      </MuiPaper>
      <div className="flex gap-4">
        <MuiPaper className="flex-grow min-h-[320px] p-1 px-4" elevation={2} color="primary">
          <MuiSkeleton width={365} />
        </MuiPaper>
        <MuiPaper className="flex flex-col gap-4 flex-grow-[3] min-h-[320px] p-4" elevation={2} color="primary">
          <MuiSkeleton height={50} />
          <MuiSkeleton height={487} />
          <div className="flex gap-4">
            <MuiSkeleton height={20} width={20} variant="rounded" />
            <MuiSkeleton height={20} width={50} variant="rounded" />
          </div>
          <div className="flex gap-4">
            <MuiSkeleton height={20} width={20} variant="rounded" />
            <MuiSkeleton height={20} width={50} variant="rounded" />
          </div>
        </MuiPaper>
      </div>
    </Dashboard>
  );
};

export default MangaUpdatePageLoading;
