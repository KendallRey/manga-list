"use client";

import React from "react";
import DisplayList from "@/components/helper-components/DisplayList";
import MangaImageListItemSkeleton from "./MangeImageListItemSkeleton";

const MangaImageListSkeleton = () => {
  return (
    <DisplayList
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      data={[1, 2, 3]}
      render={(i) => <MangaImageListItemSkeleton key={i} viewAction />}
    />
  );
};

export default MangaImageListSkeleton;
