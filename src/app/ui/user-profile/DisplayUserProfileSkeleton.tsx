"use client";

import { Skeleton } from "@/components/common/Skeleton";

export const DisplayUserProfileSkeleton: React.FC = () => {
  return (
    <div className="flex items-center gap-4">
      {/* Avatar Skeleton */}
      <Skeleton className="h-[140px] w-[140px] rounded-full" />

      {/* Info Section */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-40" /> {/* Name */}
        <Skeleton className="h-4 w-60" /> {/* Email */}
      </div>
    </div>
  );
};
