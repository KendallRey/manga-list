"use client";

import React from "react";
import { Skeleton } from "../common/Skeleton";

const UploadImageFileSkeleton: React.FC = () => {
  return (
    <div className="dropzone flex flex-col gap-4 border-2 border-dashed rounded-xl p-6 bg-gray-50 dark:bg-gray-800">
      {/* Upload UI Placeholder */}
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <Skeleton className="h-10 w-32 rounded-lg" /> {/* Browse File button */}
        <Skeleton className="h-4 w-40" /> {/* drag & drop text */}
      </div>

      {/* Upload Button Placeholder */}
      <div className="flex justify-center">
        <Skeleton className="h-10 w-28 rounded-lg" />
      </div>

      {/* Image Preview Grid Placeholder */}
      <div className="grid gap-4 mt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-64 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
};

export default UploadImageFileSkeleton;
