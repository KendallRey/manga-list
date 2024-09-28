import MuiSkeleton from "@/components/skeleton/Skeleton";
import React from "react";

const MangaTagSkeleton = () => {
  return (
    <>
      {Math.random() < 0.5 && <MuiSkeleton variant="rounded" width={57} height={24} />}
      {Math.random() < 0.5 && <MuiSkeleton variant="rounded" width={57} height={24} />}
      {Math.random() < 0.5 && <MuiSkeleton variant="rounded" width={57} height={24} />}
    </>
  );
};

export default MangaTagSkeleton;
