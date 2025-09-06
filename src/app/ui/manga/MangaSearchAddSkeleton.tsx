"use client";

import { Skeleton } from "@/components/common/Skeleton";
import React from "react";

const MangaSearchAddSkeleton = () => {
  return (
    <>
      {/* Search Input + Button */}
      <div className="flex gap-2 mb-2">
        <Skeleton className="h-[51px] flex-grow rounded-md" />
        <Skeleton className="h-[51px] w-16 rounded-md" />
      </div>

      {/* Label */}
      <Skeleton className="h-4 w-[90px]" />
    </>
  );
};

export default MangaSearchAddSkeleton;
