"use client";

import MuiImageList from "@/components/image/Image";
import React, { useCallback, useMemo, useState } from "react";
import { GetMangaImages } from "../api/manga-image/manga-image-api";
import MangaImageListItem from "./MangaImageListItem";
import { IMangaImageTableSelect, IMangaTableSelect } from "@/utils/drizzle/schema";
import { MODEL } from "@/model/model";
import { useCallOnce } from "@/components/hooks/useCallOnce";
import { useAppMediaQuery } from "@/components/hooks/useAppMediaQuery";
import DisplayList from "@/components/helper-components/DisplayList";

type IMangaImageList = {
  manga: IMangaTableSelect;
  viewAction?: boolean;
};

const MangaImageList: React.FC<IMangaImageList> = (props) => {
  const { manga, viewAction } = props;

  const { lg, md, sm } = useAppMediaQuery();

  const colSpan = useMemo(() => (lg ? 5 : md ? 3 : sm ? 2 : 1), [lg, md, sm]);

  const [mangaImages, setMangaImages] = useState<IMangaImageTableSelect[] | null>();

  const getMangaImages = useCallback(async () => {
    const images = await GetMangaImages({ mangaId: manga[MODEL.MANGA.ID] });
    setMangaImages(images.data);
  }, [manga]);

  useCallOnce(getMangaImages);

  return (
    <MuiImageList sx={{ height: 600 }} cols={colSpan} rowHeight={320}>
      <DisplayList
        data={mangaImages}
        render={(item) => <MangaImageListItem key={item.id} image={item} manga={manga} viewAction={viewAction} />}
      />
    </MuiImageList>
  );
};

export default MangaImageList;
