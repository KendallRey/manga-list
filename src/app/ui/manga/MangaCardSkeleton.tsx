import { Skeleton } from "@/components/common/Skeleton";
import React from "react";

const MangaCardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={`relative flex flex-col flex-grow relative min-h-[240px] md:min-h-[420px] border rounded-lg shadow-sm bg-white dark:bg-gray-900 ${className}`}
    >
      {/* Header */}
      <div className="p-4 flex flex-col gap-1">
        <Skeleton className="h-5 w-32 rounded" />
        <Skeleton className="h-4 w-24 rounded" />
      </div>

      {/* Overlay image (yaranaika placeholder) */}
      <div className="absolute z-[2] bottom-0 w-24 h-24 opacity-0" />

      {/* Chips */}
      <div className="px-4 pb-2 flex flex-wrap gap-2">
        <Skeleton className="h-5 w-12 rounded" />
        <Skeleton className="h-5 w-14 rounded" />
        <Skeleton className="h-5 w-12 rounded" />
      </div>

      {/* Thumbnail */}
      <Skeleton className="mx-auto w-full h-[420px] rounded-md" />

      {/* Actions */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center gap-2 p-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );
};

export default MangaCardSkeleton;
