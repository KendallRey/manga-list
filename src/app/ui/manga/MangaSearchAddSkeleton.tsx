import MuiSkeleton from "@/components/skeleton/Skeleton";
import { List } from "@mui/material";
import React from "react";

const MangaSearchAddSkeleton = () => {
  return (
    <>
      <div className="flex gap-2 mb-2">
        <MuiSkeleton height={51} component={"div"} className="flex-grow" />
        <MuiSkeleton height={51} component={"div"} width={64} />
      </div>
      <MuiSkeleton width={90} height={15} />
      <List className="flex flex-col gap-2"></List>
    </>
  );
};

export default MangaSearchAddSkeleton;
