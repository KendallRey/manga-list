import MuiSkeleton from "@/components/skeleton/Skeleton";
import React from "react";

const MangaBannerSkeleton = () => {
  return (
    <>
      <MuiSkeleton width={"100%"} className="flex-grow min-w-[120px] min-h-[400px] mx-auto p-5" />
    </>
  );
};

export default MangaBannerSkeleton;
