import { IMangaTableSelect } from "@/utils/drizzle/schema";
import React from "react";
import { MODEL } from "@/model/model";
import MuiTypography from "@/components/typography/Typograph";
import MangaBanner from "./MangaBanner";

type IMangaPageHeader = {
  manga: IMangaTableSelect;
};

const MangaPageHeader: React.FC<IMangaPageHeader> = (props) => {
  const { manga } = props;

  return (
    <div className="flex gap-5 flex-wrap">
      <MangaBanner manga={manga} />
      <div className="flex flex-grow flex-col gap-5 items-center max-w-[500px] mx-auto">
        <MuiTypography fontSize={32} textAlign={"center"}>
          {manga[MODEL.MANGA.NAME]}
        </MuiTypography>
        {manga[MODEL.MANGA.DESCRIPTION] ? (
          <MuiTypography fontSize={16} variant="body1">
            {manga[MODEL.MANGA.DESCRIPTION]}
          </MuiTypography>
        ) : (
          <em>no description</em>
        )}
      </div>
    </div>
  );
};

export default MangaPageHeader;
