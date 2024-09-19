import MuiImageList from "@/components/image/Image";
import React from "react";
import { GetMangaImages } from "../api/manga-image/manga-image-api";
import ErrorPage from "../error/page";
import MangaImageListItem from "./MangaImageListItem";
import { IMangaTableSelect } from "@/utils/drizzle/schema";
import { MODEL } from "@/model/model";

type IMangaImageList = {
  manga: IMangaTableSelect;
  viewAction?: boolean;
};

const MangaImageList: React.FC<IMangaImageList> = async (props) => {
  const { manga, viewAction } = props;

  const images = await GetMangaImages({ mangaId: manga[MODEL.MANGA.ID] });

  if (!images.status) return <ErrorPage />;

  return (
    <MuiImageList sx={{ height: 600 }} cols={5} rowHeight={320}>
      {images.data.map((item) => (
        <MangaImageListItem image={item} manga={manga} viewAction={viewAction} />
      ))}
    </MuiImageList>
  );
};

export default MangaImageList;
