import { IMangaTableSelect } from "@/utils/drizzle/schema";
import React from "react";
import ImageServer from "./ImageServer";
import { MODEL } from "@/model/model";
import { getSignedUrlServer } from "@/utils/supabase/helper/server-storage";
import MuiTypography from "@/components/typography/Typograph";

type IMangaPageHeader = {
  manga: IMangaTableSelect;
};

const MangaPageHeader: React.FC<IMangaPageHeader> = async (props) => {
  const { manga } = props;
  const response = await getSignedUrlServer(manga[MODEL.MANGA.THUMBNAIL]);

  return (
    <div className="flex flex-col gap-2">
      <div className="relative flex justify-center flex-grow">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${response?.data?.signedUrl})`,
            opacity: 0.5,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            filter: "blur(3px)",
          }}
        ></div>
        <div className="flex z-10 justify-center max-h-[400px] min-h-[400px]">
          <ImageServer path={manga[MODEL.MANGA.THUMBNAIL]} alt={manga[MODEL.MANGA.NAME]} />
        </div>
      </div>
      <MuiTypography fontSize={24}>{manga[MODEL.MANGA.NAME]}</MuiTypography>
      {manga[MODEL.MANGA.DESCRIPTION] ? (
        <MuiTypography fontSize={16} variant="body1">
          {manga[MODEL.MANGA.DESCRIPTION]}
        </MuiTypography>
      ) : (
        <em>no description</em>
      )}
    </div>
  );
};

export default MangaPageHeader;
