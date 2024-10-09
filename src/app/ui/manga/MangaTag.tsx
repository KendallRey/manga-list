import MuiChip from "@/components/chip/Chip";
import { MODEL } from "@/model/model";
import { IMangaTableSelect } from "@/utils/drizzle/schema";
import React from "react";

type IMangaTag = {
  manga: IMangaTableSelect;
};

const MangaTag: React.FC<IMangaTag> = (props) => {
  const { manga } = props;

  return (
    <>
      {manga[MODEL.MANGA.HIDE] && <MuiChip color="secondary" label="Hidden" />}
      {manga[MODEL.MANGA.DANGER] && <MuiChip color="secondary" label="Danger" />}
      {manga[MODEL.MANGA.SPICY] && <MuiChip color="secondary" label="Spicy" />}
    </>
  );
};

export default MangaTag;
