"use client";

import { IMangaTableSelect } from "@/utils/drizzle/schema";
import React, { useCallback, useEffect, useState } from "react";
import MangaImageListItem from "./MangaImageListItem";
import { useRouter, useSearchParams } from "next/navigation";
import { toSearchParams } from "@/app/api/helper/apiHelper";
import ComponentList from "@/components/helper-components/ComponentList";
import DisplayList from "@/components/helper-components/DisplayList";
import { MODEL } from "@/model/model";

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
    if(isLoadingMore) return
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
      if (canLoadMore) {
        const _params = toSearchParams(params);
        _params.set("limit", String(lastCount + IMAGES_PER_LOAD));
        router.replace(`?${_params.toString()}`, { scroll: false });
        setIsLoadingMore(true);
      }
    }
  }, [setIsLoadingMore, canLoadMore, isLoadingMore, lastCount, router]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <DisplayList
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          data={mangas}
          render={(manga) => <MangaImageListItem key={manga[MODEL.MANGA.ID]} manga={manga} viewAction/>}
        />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
        <ComponentList
            count={isLoadingMore ? 5 : 0}
            render={(i) => (
              <MangaImageSkeleton key={i} />
            )}
          />
      </div>
    </>
  );
};

export default MangaImageList;

type MangaImageSkeletonProps = {
  viewAction?: boolean;
};

const MangaImageSkeleton: React.FC<MangaImageSkeletonProps> = ({ viewAction = true }) => {
  return (
    <div className="relative overflow-hidden rounded-xl h-[320px] shadow-md bg-gray-200 dark:bg-gray-800 animate-pulse">
      {/* Thumbnail skeleton */}
      <div className="w-full bg-gray-300 dark:bg-gray-700" />

      {viewAction && (
        <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/60 to-transparent">
          {/* Title skeleton */}
          <div className="h-4 w-2/3 rounded bg-gray-400 dark:bg-gray-600 mb-2" />

          {/* Chips skeleton */}
          <div className="flex gap-2">
            <div className="h-5 w-12 rounded-full bg-gray-400 dark:bg-gray-600" />
            <div className="h-5 w-14 rounded-full bg-gray-400 dark:bg-gray-600" />
            <div className="h-5 w-10 rounded-full bg-gray-400 dark:bg-gray-600" />
          </div>
        </div>
      )}
    </div>
  );
};

