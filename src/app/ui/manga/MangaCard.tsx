"use client";

import { MODEL } from "@/model/model";
import { IMangaTableSelect } from "@/utils/drizzle/schema";
import { toBucketPublicMangaUrl } from "@/utils/supabase/helper/image";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { Eye, Pencil } from "lucide-react";

type MangaCardProps = {
  manga: IMangaTableSelect;
  className?: string;
};

const MangaCard: React.FC<MangaCardProps> = ({ manga, className = "" }) => {
  const [isBlur, setIsBlur] = useState(
    manga[MODEL.MANGA.DANGER] || manga[MODEL.MANGA.SPICY] || manga[MODEL.MANGA.HIDE],
  );

  const onClickImage = useCallback(() => {
    setIsBlur((prev) => !prev);
  }, []);

  const thumbnailImage = (
    manga[MODEL.MANGA.THUMBNAIL] ? toBucketPublicMangaUrl(manga[MODEL.MANGA.THUMBNAIL]) : "/images/404.jpg"
  ) as string;

  return (
    <div
      className={`relative flex flex-col flex-grow relative min-h-[240px] md:min-h-[420px] overflow-hidden border rounded-lg shadow-sm bg-white dark:bg-gray-900 ${className}`}
    >
      {/* Header */}
      <div className="z-10 p-4 flex flex-col gap-1 bg-gradient-to-b from-white/80 via-white/80 to-white/20 dark:from-gray-900/80 dark:via-gray-900/80 dark:to-gray-900/20">
        <h3 className="text-[16px] font-semibold">{manga[MODEL.MANGA.NAME]}</h3>
        <span className="text-sm font-bold dark:text-gray-100">{manga.created_at?.toDateString()}</span>
      </div>

      {/* Overlay image (yaranaika) */}
      <Image
        alt={manga[MODEL.MANGA.NAME]}
        onClick={onClickImage}
        src={`/images/yaranaika.png?w=164&h=164&fit=crop&auto=format`}
        className={`${isBlur ? "opacity-100" : "opacity-0"} absolute z-[2] bottom-0 duration-200 cursor-pointer`}
        width={320}
        height={420}
      />

      {/* Chips */}
      <div className="px-4 pb-2 flex flex-wrap gap-2">
        {manga[MODEL.MANGA.HIDE] && (
          <span className="px-2 py-0.5 text-xs border rounded text-gray-600 dark:text-gray-300">Hidden</span>
        )}
        {manga[MODEL.MANGA.DANGER] && <span className="px-2 py-0.5 text-xs bg-red-500 text-white rounded">Danger</span>}
        {manga[MODEL.MANGA.SPICY] && <span className="px-2 py-0.5 text-xs bg-pink-500 text-white rounded">Spicy</span>}
      </div>

      {/* Thumbnail */}
      <Image
        src={thumbnailImage}
        alt={manga[MODEL.MANGA.NAME]}
        fill
        className={`object-cover mx-auto ${isBlur ? "blur-2xl" : ""}`}
        style={{
          filter: isBlur ? "blur(32px)" : "",
        }}
      />

      {/* Actions */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center gap-2 p-2 bg-white/50 dark:bg-gray-900/50">
        <Link
          href={`/user/manga/${manga[MODEL.MANGA.ID]}`}
          aria-label="view"
          className="p-2 rounded-full bg-white dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Eye className="w-5 h-5 text-blue-600" />
        </Link>
        <Link
          href={`/user/manga/${manga[MODEL.MANGA.ID]}/update`}
          aria-label="update"
          className="p-2 rounded-full bg-white dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          ✏️
        </Link>
      </div>
    </div>
  );
};

export default MangaCard;
