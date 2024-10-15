import React from "react";
import MangaBannerSkeleton from "./MangaBannerSkeleton";
import MuiStack from "@/components/stack/Stack";
import MuiSkeleton from "@/components/skeleton/Skeleton";

const MangaPageHeaderSkeleton = () => {
  return (
    <div className="flex gap-5 flex-wrap">
      <MangaBannerSkeleton />
      <div className="flex flex-grow flex-col gap-5 items-center max-w-[500px] mx-auto">
        <MuiStack marginTop={4} gap={1.3}>
          <MuiSkeleton variant="text" height={20} width={Math.max(Math.random(), 0.5) * 350} />
          <MuiSkeleton variant="text" height={13} width={60} />
        </MuiStack>
        <MuiSkeleton variant="text" height={13} width={Math.random() * 450} className="mt-8 mb-7" />
      </div>
    </div>
  );
};

export default MangaPageHeaderSkeleton;
