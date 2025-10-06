"use client";

import Link from "next/link";
import { MODEL } from "@/model/model";
import { IMangaTableSelect } from "@/utils/drizzle/schema";
import { toBucketPublicMangaUrl } from "@/utils/supabase/helper/image";
import { useCallback } from "react";
import Image from "next/image";
import { Eye } from "lucide-react";

type MangaListItemProps = {
  manga: IMangaTableSelect;
};

export const MangaListItem: React.FC<MangaListItemProps> = ({ manga }) => {
  // const dispatch = useAppDispatch();

  const onClickThumbnail = useCallback(() => {
    // dispatch(setSearchParamsPreview(manga[MODEL.MANGA.ID]));
  }, []);

  return (
    <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-md p-4 flex flex-col lg:flex-row gap-4 items-center lg:items-start hover:shadow-lg transition">
      {/* Thumbnail */}
      <div className="cursor-pointer flex-shrink-0" onClick={onClickThumbnail}>
        {manga[MODEL.MANGA.THUMBNAIL] ? (
          <Image
            src={toBucketPublicMangaUrl(manga[MODEL.MANGA.THUMBNAIL]) || ""}
            alt={manga[MODEL.MANGA.NAME] ?? "Manga Thumbnail"}
            className="w-24 h-36 object-cover rounded-lg"
            width={250}
            height={250}
          />
        ) : (
          <div className="w-24 h-36 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400 dark:text-gray-500 text-sm">No Image</span>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="!w-full flex-1 flex flex-col justify-between">
        <div className="text-center">
          <Link
            href={`/user/manga/${manga[MODEL.MANGA.ID]}`}
            className="font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            {manga[MODEL.MANGA.NAME]}
          </Link>
          <div className="mt-2 flex flex-wrap gap-2">{/* <MangaTag manga={manga} /> */}</div>
        </div>

        {/* Actions */}
        <div className="md:absolute bottom-1 right-1 z-10 flex justify-end items-center gap-2 p-2">
          <Link
            href={`/user/manga/${manga[MODEL.MANGA.ID]}`}
            aria-label="view"
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Eye className="w-5 h-5 text-blue-600" />
          </Link>
          <Link
            href={`/user/manga/${manga[MODEL.MANGA.ID]}/update`}
            aria-label="update"
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            ✏️
          </Link>
        </div>
      </div>
    </div>
  );
};
