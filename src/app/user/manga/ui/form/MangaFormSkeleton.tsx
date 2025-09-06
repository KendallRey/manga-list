"use client";

import { Skeleton } from "@/components/common/Skeleton";
import React from "react";

const MangaFormSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Title + Description */}
      <div className="grid grid-cols-1 gap-4">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-16 rounded" /> {/* Label */}
          <Skeleton className="h-10 w-full rounded" /> {/* Input */}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-24 rounded" /> {/* Label */}
          <Skeleton className="h-20 w-full rounded" /> {/* Textarea */}
        </div>
      </div>

      {/* Checkboxes */}
      <div className="flex gap-4 items-center flex-wrap">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded" /> {/* Checkbox */}
            <Skeleton className="h-4 w-12 rounded" /> {/* Label */}
          </div>
        ))}
      </div>

      {/* Radio group */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-14 rounded" /> {/* Label */}
        <div className="flex gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" /> {/* Radio */}
              <Skeleton className="h-4 w-14 rounded" /> {/* Label */}
            </div>
          ))}
        </div>
      </div>

      {/* Children placeholder (e.g., submit button / extra fields) */}
      <Skeleton className="h-10 w-24 rounded" />
    </div>
  );
};

export default MangaFormSkeleton;
