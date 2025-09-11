import { MangaListItemSkeleton } from "@/app/ui/manga/MangaListItemSkeleton";
import { Skeleton } from "@/components/common/Skeleton";
import ComponentList from "@/components/helper-components/ComponentList";
import CardContainer from "@/components/shared/Card";
import React from "react";

const MangaLoading = () => {
  return (
    <CardContainer className="flex flex-col gap-5">
      <Skeleton className="h-7 w-40" />

      <Skeleton className="h-9 rounded-md" />

      <div className="grid sm:grid-cols-2 gap-5">
        <ComponentList count={10} render={(i) => <MangaListItemSkeleton key={i} />} />
      </div>
    </CardContainer>
  );
};

export default MangaLoading;
