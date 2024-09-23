"use client";

import MuiImageList from "@/components/image/Image";
import { IMangaTableSelect } from "@/utils/drizzle/schema";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import MangaImageListItem from "./MangaImageListItem";
import { useRouter, useSearchParams } from "next/navigation";
import { toSearchParams } from "@/app/api/helper/apiHelper";
import { useMediaQuery, useTheme } from "@mui/material";

type IMangaImageList = {
  mangas: IMangaTableSelect[];
  canLoadMore?: boolean;
};

const IMAGES_PER_LOAD = 20;

const MangaImageList: React.FC<IMangaImageList> = (props) => {
  const { mangas, canLoadMore } = props;

  const router = useRouter();
  const params = useSearchParams();
  const theme = useTheme();

  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  const colSpan = useMemo(() => (isLg ? 5 : isMd ? 3 : isSm ? 2 : 1), [isLg, isMd, isSm]);

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
      cols={colSpan}
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
