"use client";

import React, { useCallback, useState } from "react";
import { GetMangaImages } from "../api/manga-image/manga-image-api";
import { IMangaImageTableSelect, IMangaTableSelect } from "@/utils/drizzle/schema";
import { MODEL } from "@/model/model";
import { useCallOnce } from "@/components/hooks/useCallOnce";
import DisplayList from "@/components/helper-components/DisplayList";
import MangaImageListItem from "./MangaImageListItem";

type MangaImageListProps = {
  manga: IMangaTableSelect;
  viewAction?: boolean;
};

const MangaImageList: React.FC<MangaImageListProps> = (props) => {
  const { manga, viewAction } = props;

  const [mangaImages, setMangaImages] = useState<IMangaImageTableSelect[] | null>();

  const getMangaImages = useCallback(async () => {
    const images = await GetMangaImages({ mangaId: manga[MODEL.MANGA.ID] });
    setMangaImages(images.data);
  }, [manga]);

  useCallOnce(getMangaImages);

  return (
    <DisplayList
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      data={mangaImages}
      render={(item) => <MangaImageListItem key={item.id} image={item} manga={manga} viewAction={viewAction} />}
    />
  );
};

export default MangaImageList;
