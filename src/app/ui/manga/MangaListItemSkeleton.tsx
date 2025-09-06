"use client";

import { Skeleton } from "@/components/common/Skeleton";

export const MangaListItemSkeleton: React.FC = () => {
  return (
    <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-md p-4 flex flex-col lg:flex-row gap-4 items-center lg:items-start">
      {/* Thumbnail */}
      <div className="flex-shrink-0">
        <Skeleton className="w-24 h-36 rounded-lg" />
      </div>

      {/* Info Section */}
      <div className="flex-1 flex flex-col justify-between w-full">
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <div className="flex gap-2 mt-2">
            <Skeleton className="h-4 w-12 rounded" />
            <Skeleton className="h-4 w-16 rounded" />
            <Skeleton className="h-4 w-10 rounded" />
          </div>
        </div>

        {/* Actions */}
        <div className="absolute bottom-1 right-1 mt-3 flex gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
};
