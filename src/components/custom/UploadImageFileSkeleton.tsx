import React from "react";
import MuiSkeleton from "../skeleton/Skeleton";
import MuiDivider from "../divider/Divider";

const UploadImageFileSkeleton = () => {
  return (
    <div className={`dropzone flex flex-col border border-4 gap-2 border-dashed rounded p-4`}>
      <div className="flex justify-center gap-2 items-center flex-wrap">
        <MuiSkeleton height={37} variant="rounded" className="min-w-[200px]" />
        <MuiSkeleton className="min-w-[200px]" />
      </div>
      <MuiDivider />
      <MuiSkeleton height={37} variant="rounded" />
    </div>
  );
};

export default UploadImageFileSkeleton;
