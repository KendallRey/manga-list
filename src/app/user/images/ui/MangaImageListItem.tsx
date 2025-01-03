"use client";

import { MuiImageListItem, MuiImageListItemBar } from "@/components/image/Image";
import React, { useCallback, useMemo, useState } from "react";
import { toBucketPublicMangaUrl } from "@/utils/supabase/helper/image";
import MuiIconButton from "@/components/icon-button/IconButton";
import { IMangaTableSelect } from "@/utils/drizzle/schema";
import { MODEL } from "@/model/model";
import { BiEdit } from "react-icons/bi";
import { useRouter } from "next/navigation";
import USER_ROUTE, { ROUTE_ID } from "@/constants/ROUTES";
import MuiChip from "@/components/chip/Chip";
import MuiLink from "@/components/link/Link";
import Link from "next/link";
import MuiTypography from "@/components/typography/Typograph";
import { useAppDispatch } from "@/redux/services/hooks";
import { setSearchParamsPreview } from "@/redux/features/params/searchParamsSlice";

type IMangaImageListItem = {
  index?: number;
  manga: IMangaTableSelect;
  viewAction?: boolean;
};

const MangaImageListItem: React.FC<IMangaImageListItem> = (props) => {
  const { manga, viewAction } = props;

  const dispatch = useAppDispatch();
  const router = useRouter();

  const srcPath = useMemo(() => {
    return manga[MODEL.MANGA.THUMBNAIL] ? `${toBucketPublicMangaUrl(manga[MODEL.MANGA.THUMBNAIL])}` : "/images/404.jpg";
  }, [manga]);

  const [isBlur, setIsBlur] = useState(
    manga[MODEL.MANGA.DANGER] || manga[MODEL.MANGA.SPICY] || manga[MODEL.MANGA.HIDE],
  );

  const onClickImage = useCallback(() => {
    setIsBlur((prev) => !prev);
  }, []);

  const onClickTitle = useCallback(() => {
    dispatch(setSearchParamsPreview(manga[MODEL.MANGA.ID]));
  }, [dispatch, manga]);

  return (
    <MuiImageListItem key={manga[MODEL.MANGA.ID]} style={{ overflow: "hidden" }}>
      <img
        onClick={onClickImage}
        src={`/images/yaranaika.png?w=164&h=164&fit=crop&auto=format`}
        className={`${isBlur ? "opacity-100" : "opacity-0"} max-h-[80%] absolute z-[2] duration-200 cursor-pointer`}
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
          title={
            <MuiTypography onClick={onClickTitle} className="cursor-pointer" textOverflow="ellipsis" overflow="hidden">
              {manga[MODEL.MANGA.NAME]}
            </MuiTypography>
          }
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
