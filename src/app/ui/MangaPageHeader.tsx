import { IMangaTableSelect } from "@/utils/drizzle/schema";
import React from "react";
import ImageServer from "./ImageServer";
import { MODEL } from "@/model/model";
import { getSignedUrlServer } from "@/utils/supabase/helper/server-storage";
import MuiTypography from "@/components/typography/Typograph";
import SupabasePublicImage from "@/utils/supabase/components/image/Image";
import { toBucketPublicUrl } from "@/utils/supabase/helper/image";

type IMangaPageHeader = {
  manga: IMangaTableSelect;
};

const MangaPageHeader: React.FC<IMangaPageHeader> = async (props) => {
  const { manga } = props;

  const bgUrl = toBucketPublicUrl(manga[MODEL.MANGA.THUMBNAIL]) || "";

  return (
    <div className="flex gap-5 flex-wrap">
      <div className="relative flex justify-center flex-grow max-w-[500px]">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${bgUrl})`,
            opacity: 0.5,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            filter: "blur(3px)",
          }}
        ></div>
        <div className="flex z-10 justify-center max-h-[400px] min-h-[400px] p-5">
          <SupabasePublicImage path={manga[MODEL.MANGA.THUMBNAIL]} alt={manga[MODEL.MANGA.NAME]} />
        </div>
      </div>
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
