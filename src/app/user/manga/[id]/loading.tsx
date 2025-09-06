import MangaBannerSkeleton from "@/app/ui/MangaBannerSkeleton";
import MangaImageListSkeleton from "@/app/ui/MangaImageListSkeleton";
import { Skeleton } from "@/components/common/Skeleton";
import BreadcrumbSkeleton from "@/components/shared/BreadCrumbsSkeleton";
import CardContainer from "@/components/shared/Card";
import React from "react";

const MangaViewPageLoading = () => {
  return (
    <>
      <BreadcrumbSkeleton />
      <MangaBannerSkeleton />
      <CardContainer className="lg:-mt-36 lg:!pt-24 min-h-[50vh] flex flex-col gap-4">
        <div className="flex justify-between gap-5 items-center">
          <Skeleton className="h-6 w-32 rounded" />

          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-16 rounded" />
          </div>
        </div>
        <MangaImageListSkeleton />
      </CardContainer>
    </>
  );
};

export default MangaViewPageLoading;
