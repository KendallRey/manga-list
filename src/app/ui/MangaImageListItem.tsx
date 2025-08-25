"use client";

import React, { useState } from "react";
import { toBucketPublicMangaUrl } from "@/utils/supabase/helper/image";
import { setMangaThumbnailAction } from "../action/manga";
import { IMangaImageTableSelect, IMangaTableSelect } from "@/utils/drizzle/schema";
import { MODEL } from "@/model/model";
import { Button } from "@/components/common/Button";
import { Camera } from 'lucide-react';
import Image from "next/image";

type IMangaImageListItem = {
  image: IMangaImageTableSelect;
  manga: IMangaTableSelect;
  viewAction?: boolean;
};

const MangaImageListItem: React.FC<IMangaImageListItem> = (props) => {
  const { image, manga, viewAction } = props;

  const [isLoading, setIsLoading] = useState(false);

  const onSetMangaThumbnail = async () => {
    setIsLoading(true);
    await setMangaThumbnailAction(manga[MODEL.MANGA.ID], image[MODEL.MANGA_IMAGE.PATH]);
    setIsLoading(false);
  };

  const isThumbnail = manga[MODEL.MANGA.THUMBNAIL] === image[MODEL.MANGA_IMAGE.PATH]

  return (
    <div key={image.id} className="relative">
      <Image
        src={`${toBucketPublicMangaUrl(image.path)}?w=164&h=164&fit=crop&auto=format`}
        alt={image.path}
        height={400}
        width={250}
        loading="lazy"
      />
      {viewAction && <div className="flex absolute bottom-0 left-0 right-0 p-1 bg-gradient-to-t from-white to-white/50 dark:from-gray-900 dark:to-gray-900/50">
        <Button size="sm" variant={isThumbnail ? "solid" : "outline"} className="flex items-center gap-2" onClick={onSetMangaThumbnail} disabled={isThumbnail || isLoading}>
          <Camera size={16}/>
          <small>Set as cover</small>
        </Button>
      </div>}
    </div>
  );
};

export default MangaImageListItem;
