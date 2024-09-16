"use client";

import MuiButton from "@/components/button/Button";
import React from "react";

type IMangaListFilter = INextPage;

const MangaListFilter: React.FC<IMangaListFilter> = (props) => {
  const { searchParams } = props;

  return (
    <div className="flex items-center justify-end gap-2">
      <MuiButton>Filter</MuiButton>
    </div>
  );
};

export default MangaListFilter;
