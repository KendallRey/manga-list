import Chip from "@/components/common/Chip";
import { MODEL } from "@/model/model";
import { IMangaTableSelect } from "@/utils/drizzle/schema";
import SupabasePublicImage from "@/utils/supabase/components/image/Image";
import { toBucketPublicMangaUrl } from "@/utils/supabase/helper/image";
import React from "react";
import { ShieldAlert, Flame, EyeOff } from "lucide-react";

type MangaBannerProps = {
  manga: IMangaTableSelect;
};

const MangaBanner: React.FC<MangaBannerProps> = (props) => {
  const { manga } = props;

  const bgUrl = manga[MODEL.MANGA.THUMBNAIL] ? toBucketPublicMangaUrl(manga[MODEL.MANGA.THUMBNAIL]) : "/images/404.jpg";

  return (
    <div className="relative flex justify-start items-center lg:items-start flex-grow gap-12 p-4 md:p-12 lg:p-20 flex-col lg:flex-row">
      <div
        className="absolute inset-5 z-[-10]"
        style={{
          backgroundImage: `url(${bgUrl})`,
          backgroundRepeat: "no-repeat",
          opacity: 0.5,
          backgroundPosition: "center",
          backgroundSize: "cover",
          filter: "blur(3px)",
        }}
      />
      <div className="absolute inset-0 z-[-5] bg-gradient-to-t from-white dark:from-neutral-900 to-transparent" />
      <div className="z-20 p-2 max-w-[200px] bg-gray-800 dark:bg-gray-50 outline dark:outline-gray-50 outline-black outline-offset-6">
        <SupabasePublicImage path={manga[MODEL.MANGA.THUMBNAIL]} alt={manga[MODEL.MANGA.NAME]} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl md:text-2xl text-gray-800 dark:text-white lg:text-4xl font-bold z-20">
          {manga[MODEL.MANGA.NAME]}
        </h1>
        <div className="flex gap-2">
          {manga[MODEL.MANGA.HIDE] && (
            <Chip color="secondary" variant="outline" icon={<EyeOff size={14} />}>
              Hidden
            </Chip>
          )}
          {manga[MODEL.MANGA.DANGER] && (
            <Chip color="danger" variant="outline" icon={<ShieldAlert size={14} />}>
              Danger
            </Chip>
          )}
          {manga[MODEL.MANGA.SPICY] && (
            <Chip color="pink" variant="outline" icon={<Flame size={14} />}>
              Spicy
            </Chip>
          )}
        </div>
      </div>
    </div>
  );
};

export default MangaBanner;
