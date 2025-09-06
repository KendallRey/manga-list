import MangaCardSkeleton from "@/app/ui/manga/MangaCardSkeleton";
import { Skeleton } from "@/components/common/Skeleton";
import ComponentList from "@/components/helper-components/ComponentList";
import CardContainer from "@/components/shared/Card";
import React from "react";

const MangaLoading = () => {
  return (
    <CardContainer className="flex flex-col gap-5">
      <Skeleton className="h-6 w-40" />

      <div className="grid lg:grid-cols-3 gap-4">
        <ComponentList count={3} render={(i) => <MangaCardSkeleton key={i} />} />
      </div>
    </CardContainer>
  );
};

export default MangaLoading;
