import { IMangaTableSelect } from "@/utils/drizzle/schema";
import React from "react";
import MangaBanner from "./MangaBanner";
import { Eye, Pencil, ShieldAlert, Flame, EyeOff } from "lucide-react";
import Chip from "@/components/common/Chip";

type IMangaPageHeader = {
  manga: IMangaTableSelect;
};

const MangaPageHeader: React.FC<IMangaPageHeader> = (props) => {
  const { manga } = props;

  return (
    <div className="">
      <MangaBanner manga={manga} />
    </div>
  );
};

export default MangaPageHeader;
