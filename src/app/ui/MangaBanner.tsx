import { MODEL } from "@/model/model";
import { IMangaTableSelect } from "@/utils/drizzle/schema";
import SupabasePublicImage from "@/utils/supabase/components/image/Image";
import { toBucketPublicMangaUrl } from "@/utils/supabase/helper/image";
import React from "react";

type IMangaBanner = {
  manga: IMangaTableSelect;
};

const MangaBanner: React.FC<IMangaBanner> = (props) => {
  const { manga } = props;

  const bgUrl = manga[MODEL.MANGA.THUMBNAIL] ? toBucketPublicMangaUrl(manga[MODEL.MANGA.THUMBNAIL]) : "/images/404.jpg";

  return (
    <div className="relative flex justify-center flex-grow max-w-[500px] mx-auto">
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
      <div className="flex z-10 justify-center max-h-[400px] min-h-[400px] m-auto p-5">
        <SupabasePublicImage path={manga[MODEL.MANGA.THUMBNAIL]} alt={manga[MODEL.MANGA.NAME]} />
      </div>
    </div>
  );
};

export default MangaBanner;
