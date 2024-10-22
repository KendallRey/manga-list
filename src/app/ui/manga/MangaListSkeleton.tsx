import ComponentList from "@/components/helper-components/ComponentList";
import MuiList from "@/components/list/List";
import React from "react";
import MangaListItemSkeleton from "./MangaListItemSkeleton";

const MangaListSkeleton = () => {
  return (
    <MuiList>
      <ComponentList count={10} render={(id) => <MangaListItemSkeleton key={id} />} />
    </MuiList>
  );
};

export default MangaListSkeleton;
