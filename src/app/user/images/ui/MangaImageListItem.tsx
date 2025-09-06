"use client";

import React, { useCallback, useMemo, useState } from "react";
import { IMangaTableSelect } from "@/utils/drizzle/schema";
import Link from "next/link";
import { MODEL } from "@/model/model";
import { toBucketPublicMangaUrl } from "@/utils/supabase/helper/image";
import Image from "next/image";
import USER_ROUTE, { ROUTE_ID } from "@/constants/ROUTES";

type MangaImageListItemProps = {
  index?: number;
  manga: IMangaTableSelect;
  viewAction?: boolean;
};

const MangaImageListItem: React.FC<MangaImageListItemProps> = ({ manga, viewAction }) => {
  const [isBlur, setIsBlur] = useState(manga.danger || manga.spicy || manga.hide);

  const srcPath = useMemo(() => {
    return manga[MODEL.MANGA.THUMBNAIL] ? `${toBucketPublicMangaUrl(manga[MODEL.MANGA.THUMBNAIL])}` : "/images/404.jpg";
  }, [manga]);

  const onClickImage = useCallback(() => {
    setIsBlur((prev) => !prev);
  }, []);

  return (
    <div
      key={manga.id}
      className="relative overflow-hidden rounded-lg shadow-md h-[320px] border border-gray-200 dark:border-gray-700"
    >
      {/* Overlay image when blur is active */}
      <Image
        onClick={onClickImage}
        src="/images/yaranaika.png"
        alt="overlay"
        className={`${
          isBlur ? "opacity-100" : "opacity-0"
        } absolute top-0 left-0 h-full object-cover cursor-pointer transition-opacity duration-200 z-10`}
        width={250}
        height={400}
      />

      {/* Main thumbnail */}
      <Image
        // srcSet={`${srcPath}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        src={`${srcPath}?w=164&h=164&fit=crop&auto=format`}
        alt={manga.name}
        loading="lazy"
        className="w-full object-cover transition duration-200"
        style={{ filter: isBlur ? "blur(32px)" : "" }}
        width={250}
        height={400}
      />

      {/* Footer Bar */}
      {viewAction && (
        <div className="z-10 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2 pt-12 text-white flex justify-between items-end">
          <div>
            <Link
              href={USER_ROUTE.MANGA_PAGE.VIEW.href.replace(ROUTE_ID, manga[MODEL.MANGA.ID])}
              className="text-sm font-semibold overflow-hidden text-ellipsis cursor-pointer hover:underline"
              title={manga.name}
            >
              {manga.name}
            </Link>

            {/* Chips */}
            <div className="flex gap-2 mt-1">
              {manga.hide && (
                <span className="px-2 py-0.5 text-xs rounded-full border border-gray-400 text-gray-300">Hidden</span>
              )}
              {manga.danger && <span className="px-2 py-0.5 text-xs rounded-full bg-red-600 text-white">Danger</span>}
              {manga.spicy && <span className="px-2 py-0.5 text-xs rounded-full bg-pink-500 text-white">Spicy</span>}
            </div>
          </div>

          {/* Edit Action */}
          <Link
            href={USER_ROUTE.MANGA_PAGE.UPDATE.href.replace(ROUTE_ID, manga[MODEL.MANGA.ID])}
            className="p-1 rounded-full bg-black/40 hover:bg-black/60 transition"
          >
            ✏️
          </Link>
        </div>
      )}
    </div>
  );
};

export default MangaImageListItem;
