import MuiImageList from "@/components/image/Image";
import { IMangaTableSelect } from "@/utils/drizzle/schema";
import React from "react";
import MangaImageListItem from "./MangaImageListItem";

type IMangaImageList = {
  mangas: IMangaTableSelect[];
};

const MangaImageList: React.FC<IMangaImageList> = (props) => {
  const { mangas } = props;

  return (
    <MuiImageList sx={{ height: 600 }} cols={5} rowHeight={320}>
      {mangas.map((manga) => (
        <MangaImageListItem key={manga.id} manga={manga} />
      ))}
    </MuiImageList>
  );
};

export default MangaImageList;
