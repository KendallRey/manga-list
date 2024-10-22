"use client";

import React, { useMemo } from "react";
import MangaBannerSkeleton from "./MangaBannerSkeleton";
import MuiStack from "@/components/stack/Stack";
import MuiSkeleton from "@/components/skeleton/Skeleton";
import { useAppMediaQuery } from "@/components/hooks/useAppMediaQuery";

const MangaPageHeaderSkeleton = () => {
  const { sm, md, lg } = useAppMediaQuery();

  const width = useMemo(() => {
    if (sm) return 100;
    if (md) return 200;
    return 350;
  }, [sm, md, lg]);

  return (
    <div className="flex gap-5 flex-wrap">
      <MangaBannerSkeleton />
      <div className="flex flex-grow flex-col gap-5 items-center max-w-[500px] mx-auto">
        <MuiStack marginTop={4} gap={1.3}>
          <MuiSkeleton variant="text" height={20} width={Math.random() * width} />
          <MuiSkeleton variant="text" height={13} width={60} />
        </MuiStack>
        <MuiSkeleton variant="text" height={13} width={Math.random() * (width + 10)} className="mt-8 mb-7" />
      </div>
    </div>
  );
};

export default MangaPageHeaderSkeleton;
