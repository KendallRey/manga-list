import React from "react";
import BreadcrumbSkeleton from "@/components/shared/BreadCrumbsSkeleton";
import MangaBannerSkeleton from "@/app/ui/MangaBannerSkeleton";
import CardContainer from "@/components/shared/Card";
import { Skeleton } from "@/components/common/Skeleton";
import MangaFormSkeleton from "../../ui/form/MangaFormSkeleton";
import UploadImageFileSkeleton from "@/components/custom/UploadImageFileSkeleton";
import MangaImageListSkeleton from "@/app/ui/MangaImageListSkeleton";

const MangaUpdatePageLoading = () => {
  return (
    <>
      <BreadcrumbSkeleton />
      <MangaBannerSkeleton />

      <CardContainer className="lg:-mt-36 lg:!pt-24 min-h-[50vh] my-6">
        <div className="flex justify-between gap-5 items-center">
          <Skeleton className="h-6 w-32 rounded" />

          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-16 rounded" />
          </div>
        </div>
        <MangaFormSkeleton />
      </CardContainer>
      <CardContainer className=" flex flex-col gap-4 my-6">
        <Skeleton className="h-6 w-40 rounded" />
        <UploadImageFileSkeleton />
      </CardContainer>
      <CardContainer className=" flex flex-col gap-4 my-6">
        <Skeleton className="h-6 w-24 rounded" />
        <MangaImageListSkeleton />
      </CardContainer>
    </>
  );
};

export default MangaUpdatePageLoading;
