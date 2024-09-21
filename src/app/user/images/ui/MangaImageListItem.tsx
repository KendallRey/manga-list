"use client";

import { MuiImageListItem, MuiImageListItemBar } from "@/components/image/Image";
import React, { useMemo } from "react";
import { toBucketPublicUrl } from "@/utils/supabase/helper/image";
import { HiPhoto } from "react-icons/hi2";
import MuiIconButton from "@/components/icon-button/IconButton";
import { IMangaTableSelect } from "@/utils/drizzle/schema";
import { MODEL } from "@/model/model";
import Image from "next/image";

type IMangaImageListItem = {
  index?: number;
  manga: IMangaTableSelect;
  viewAction?: boolean;
};

const MangaImageListItem: React.FC<IMangaImageListItem> = (props) => {
  const { index, manga, viewAction } = props;

  // const onSetMangaThumbnail = useCallback(async () => {
  //   setIsLoading(true);
  //   await setMangaThumbnailAction(manga[MODEL.MANGA.ID], image[MODEL.MANGA_IMAGE.PATH]);
  //   setIsLoading(false);
  // }, [image, manga]);

  // const disableSetThumbnail = useMemo(() => {
  //   if (isLoading) return true;
  //   return manga[MODEL.MANGA.THUMBNAIL] === image[MODEL.MANGA_IMAGE.PATH];
  // }, [image, manga, isLoading]);

  const srcPath = useMemo(() => {
    return manga[MODEL.MANGA.THUMBNAIL] ? `${toBucketPublicUrl(manga[MODEL.MANGA.THUMBNAIL])}` : "/images/404.jpg";
  }, [manga]);

  return (
    <MuiImageListItem key={manga.id}>
      <img
        srcSet={`${srcPath}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        src={`${srcPath}?w=164&h=164&fit=crop&auto=format`}
        alt={manga[MODEL.MANGA.NAME]}
        loading="lazy"
      />
      {viewAction && (
        <MuiImageListItemBar
          title={manga[MODEL.MANGA.NAME]}
          position="bottom"
          actionIcon={
            <MuiIconButton color="secondary">
              <HiPhoto />
            </MuiIconButton>
          }
        />
      )}
    </MuiImageListItem>
  );
};

export default MangaImageListItem;
