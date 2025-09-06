"use client";

import { Skeleton } from "@/components/common/Skeleton";
import React from "react";

const MangaBannerSkeleton = () => {
  return (
    <div className="relative flex justify-start items-center lg:items-start flex-grow gap-12 p-4 md:p-12 lg:p-20 flex-col lg:flex-row">
      {/* Blurred background placeholder */}
      <div
        className="absolute inset-5 z-[-10] bg-gray-300 dark:bg-gray-700"
        style={{
          filter: "blur(3px)",
        }}
      />
      <div className="absolute inset-0 z-[-5] bg-gradient-to-t from-white dark:from-neutral-900 to-transparent" />

      {/* Thumbnail skeleton */}
      <div className="z-20 p-2 max-w-[200px] bg-gray-800 dark:bg-gray-50 outline dark:outline-gray-50 outline-black outline-offset-6">
        <Skeleton className="w-[180px] h-[260px] rounded" />
      </div>

      {/* Title + Chips skeleton */}
      <div className="flex flex-col gap-2 z-20">
        <Skeleton className="h-8 w-48 rounded" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default MangaBannerSkeleton;
