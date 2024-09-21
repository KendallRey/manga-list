"use client";

import MuiImageList from "@/components/image/Image";
import { IMangaTableSelect } from "@/utils/drizzle/schema";
import React, { useCallback, useEffect, useState } from "react";
import MangaImageListItem from "./MangaImageListItem";
import { useRouter, useSearchParams } from "next/navigation";
import { toSearchParams } from "@/app/api/helper/apiHelper";

type IMangaImageList = {
  mangas: IMangaTableSelect[];
  canLoadMore?: boolean;
};

const IMAGES_PER_LOAD = 20;

const MangaImageList: React.FC<IMangaImageList> = (props) => {
  const { mangas, canLoadMore } = props;

  const router = useRouter();
  const params = useSearchParams();

  const [lastCount, setLastCount] = useState(mangas.length);

  useEffect(() => {
    setLastCount(mangas.length);
  }, [mangas]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
      if (canLoadMore) {
        const _params = toSearchParams(params);
        _params.set("limit", String(lastCount + IMAGES_PER_LOAD));
        router.replace(`?${_params.toString()}`, { scroll: false });
      }
    }
  }, [lastCount, router]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [canLoadMore, handleScroll]);

  return (
    <MuiImageList
      cols={5}
      rowHeight={350}
      sx={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      {mangas.map((manga, i) => (
        <MangaImageListItem key={manga.id} index={i + 1} manga={manga} viewAction />
      ))}
    </MuiImageList>
  );
};

export default MangaImageList;
