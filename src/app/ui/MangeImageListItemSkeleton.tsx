"use client";

import { Skeleton } from "@/components/common/Skeleton";
import React from "react";

type MangaImageListItemSkeletonProps = {
  viewAction?: boolean;
};

const MangaImageListItemSkeleton: React.FC<MangaImageListItemSkeletonProps> = ({ viewAction }) => {
  return (
    <div className="relative">
      {/* Image placeholder */}
      <Skeleton className="w-[250px] h-[400px] rounded" />

      {viewAction && (
        <div className="flex absolute bottom-0 left-0 right-0 p-1 bg-gradient-to-t from-white to-white/50 dark:from-gray-900 dark:to-gray-900/50">
          <Skeleton className="h-8 w-28 rounded-md" />
        </div>
      )}
    </div>
  );
};

export default MangaImageListItemSkeleton;
