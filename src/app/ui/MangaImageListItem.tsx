"use client";

import MuiImageList, { MuiImageListItem, MuiImageListItemBar } from "@/components/image/Image";
import React, { useCallback, useMemo, useState } from "react";
import { GetMangaImages } from "../api/manga-image/manga-image-api";
import ErrorPage from "../error/page";
import { toBucketPublicUrl } from "@/utils/supabase/helper/image";
import { HiPhoto } from "react-icons/hi2";
import MuiIconButton from "@/components/icon-button/IconButton";
import { setMangaThumbnailAction } from "../action/manga";
import { IMangaImageTableSelect, IMangaTableSelect } from "@/utils/drizzle/schema";
import { MODEL } from "@/model/model";

type IMangaImageListItem = {
  image: IMangaImageTableSelect;
  manga: IMangaTableSelect;
  viewAction?: boolean;
};

const MangaImageListItem: React.FC<IMangaImageListItem> = (props) => {
  const { image, manga, viewAction } = props;

  const [isLoading, setIsLoading] = useState(false);

  const onSetMangaThumbnail = useCallback(async () => {
    setIsLoading(true);
    await setMangaThumbnailAction(manga[MODEL.MANGA.ID], image[MODEL.MANGA_IMAGE.PATH]);
    setIsLoading(false);
  }, [image, manga]);

  const disableSetThumbnail = useMemo(() => {
    if (isLoading) return true;
    return manga[MODEL.MANGA.THUMBNAIL] === image[MODEL.MANGA_IMAGE.PATH];
  }, [image, manga, isLoading]);

  return (
    <MuiImageListItem key={image.id}>
      <img
        srcSet={`${toBucketPublicUrl(image.path)}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        src={`${toBucketPublicUrl(image.path)}?w=164&h=164&fit=crop&auto=format`}
        alt={image.path}
        loading="lazy"
      />
      {viewAction && (
        <MuiImageListItemBar
          title=""
          position="below"
          subtitle="set as cover"
          actionIcon={
            <MuiIconButton color="secondary" onClick={onSetMangaThumbnail} disabled={disableSetThumbnail}>
              <HiPhoto />
            </MuiIconButton>
          }
        />
      )}
    </MuiImageListItem>
  );
};

export default MangaImageListItem;
