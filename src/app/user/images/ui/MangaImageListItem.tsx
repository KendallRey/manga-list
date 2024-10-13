"use client";

import { MuiImageListItem, MuiImageListItemBar } from "@/components/image/Image";
import React, { useCallback, useMemo, useState } from "react";
import { toBucketPublicMangaUrl } from "@/utils/supabase/helper/image";
import { HiPhoto } from "react-icons/hi2";
import MuiIconButton from "@/components/icon-button/IconButton";
import { IMangaTableSelect } from "@/utils/drizzle/schema";
import { MODEL } from "@/model/model";
import Image from "next/image";
import { BiEdit } from "react-icons/bi";
import { useRouter } from "next/navigation";
import USER_ROUTE, { ROUTE_ID } from "@/constants/ROUTES";
import MuiChip from "@/components/chip/Chip";
import MuiLink from "@/components/link/Link";
import Link from "next/link";

type IMangaImageListItem = {
  index?: number;
  manga: IMangaTableSelect;
  viewAction?: boolean;
};

const MangaImageListItem: React.FC<IMangaImageListItem> = (props) => {
  const { index, manga, viewAction } = props;

  const router = useRouter();

  const onClickEdit = useCallback(() => {
    router.push(USER_ROUTE.MANGA_PAGE.UPDATE.href.replace(ROUTE_ID, manga[MODEL.MANGA.ID]), { scroll: false });
  }, [router, manga]);

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
    return manga[MODEL.MANGA.THUMBNAIL] ? `${toBucketPublicMangaUrl(manga[MODEL.MANGA.THUMBNAIL])}` : "/images/404.jpg";
  }, [manga]);

  const [isBlur, setIsBlur] = useState(
    manga[MODEL.MANGA.DANGER] || manga[MODEL.MANGA.SPICY] || manga[MODEL.MANGA.HIDE],
  );

  const onClickImage = useCallback(() => {
    setIsBlur((prev) => !prev);
  }, []);

  return (
    <MuiImageListItem key={manga.id} style={{ overflow: "hidden" }}>
      <img
        onClick={onClickImage}
        src={`/images/yaranaika.png?w=164&h=164&fit=crop&auto=format`}
        className={`${isBlur ? "opacity-100" : "opacity-0"} absolute z-[2] duration-200 cursor-pointer`}
      />
      <img
        srcSet={`${srcPath}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        src={`${srcPath}?w=164&h=164&fit=crop&auto=format`}
        alt={manga[MODEL.MANGA.NAME]}
        loading="lazy"
        className="duration-200"
        style={{
          filter: isBlur ? "blur(32px)" : "",
        }}
      />
      {viewAction && (
        <MuiImageListItemBar
          title={manga[MODEL.MANGA.NAME]}
          position="bottom"
          subtitle={
            <div className="flex gap-2">
              {manga[MODEL.MANGA.HIDE] && <MuiChip label="Hidden" color="secondary" variant="outlined" />}
              {manga[MODEL.MANGA.DANGER] && <MuiChip label="Danger" color="error" />}
              {manga[MODEL.MANGA.SPICY] && <MuiChip label="Spicy" color="secondary" />}
            </div>
          }
          actionIcon={
            <MuiLink component={Link} href={USER_ROUTE.MANGA_PAGE.UPDATE.href.replace(ROUTE_ID, manga[MODEL.MANGA.ID])}>
              <MuiIconButton color="secondary">
                <BiEdit />
              </MuiIconButton>
            </MuiLink>
          }
        />
      )}
    </MuiImageListItem>
  );
};

export default MangaImageListItem;
