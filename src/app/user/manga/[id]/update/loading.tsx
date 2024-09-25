"use client";

import MuiPaper from "@/components/paper/Paper";
import Dashboard from "@/components/ui/Dashboard";
import React from "react";
import MuiSkeleton from "@/components/skeleton/Skeleton";
import MuiStack from "@/components/stack/Stack";

const MangaUpdatePageLoading = () => {
  return (
    <Dashboard>
      <MuiPaper>
        <MuiStack direction={"row"}>
          <MuiSkeleton className="mx-4" width={50} height={40} />
          <MuiSkeleton className="mx-4" width={220} height={40} />
          <MuiSkeleton className="mx-4" width={50} height={40} />
        </MuiStack>
      </MuiPaper>
      <div className="flex gap-4">
        <MuiPaper className="flex-grow min-h-[320px] p-1 px-4" elevation={2} color="primary">
          <MuiSkeleton width={365} />
        </MuiPaper>
        <MuiPaper className="flex flex-col gap-6 flex-grow-[3] min-h-[320px] p-1 px-4" elevation={2} color="primary">
          <MuiSkeleton height={40} />
          <MuiSkeleton height={500} />
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
