"use client";

import { IMangaTableSelect } from "@/utils/drizzle/schema";
import React, { useCallback, useEffect, useState } from "react";
import MangaImageListItem from "./MangaImageListItem";
import { useRouter, useSearchParams } from "next/navigation";
import { toSearchParams } from "@/app/api/helper/apiHelper";
import ComponentList from "@/components/helper-components/ComponentList";
import DisplayList from "@/components/helper-components/DisplayList";
import { MODEL } from "@/model/model";
import MangaImageSkeleton from "./MangaImageSkeleton";

type MangaImageListProps = {
  mangas: IMangaTableSelect[];
  canLoadMore?: boolean;
};

const IMAGES_PER_LOAD = 20;

const MangaImageList: React.FC<MangaImageListProps> = (props) => {
  const { mangas, canLoadMore } = props;

  const router = useRouter();
  const params = useSearchParams();

  const [lastCount, setLastCount] = useState(mangas.length);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    if (lastCount === mangas.length) setIsLoadingMore(false);
  }, [setIsLoadingMore, lastCount, mangas.length]);

  useEffect(() => {
    setLastCount(mangas.length);
  }, [mangas.length]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
      if (canLoadMore) {
        const _params = toSearchParams(params);
        _params.set("limit", String(lastCount + IMAGES_PER_LOAD));
        router.replace(`?${_params.toString()}`, { scroll: false });
        setIsLoadingMore(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIsLoadingMore, canLoadMore, lastCount, router]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <DisplayList
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        data={mangas}
        render={(manga) => <MangaImageListItem key={manga[MODEL.MANGA.ID]} manga={manga} viewAction />}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 !mt-[-14px]">
        <ComponentList count={isLoadingMore ? 5 : 0} render={(i) => <MangaImageSkeleton key={i} />} />
      </div>
    </>
  );
};

export default MangaImageList;
