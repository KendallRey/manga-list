import MuiPaper from "@/components/paper/Paper";
import Dashboard from "@/components/ui/Dashboard";
import React from "react";
import MuiSkeleton from "@/components/skeleton/Skeleton";
import { List } from "@mui/material";

const MangaPageLoading: React.FC<INextPage> = async (props) => {
  const { searchParams } = props;

  return (
    <Dashboard>
      <MuiPaper className="p-4" elevation={2} color="primary">
        <div className="flex gap-2">
          <MuiSkeleton height={52} className="flex-grow" />
          <MuiSkeleton height={52} width={64} />
        </div>
        <List className="flex flex-col gap-2"></List>
      </MuiPaper>
      <MuiPaper className="flex-grow-[2] min-h-[320px] p-4" elevation={2} color="primary">
        <MuiSkeleton height={52} />
        <MuiSkeleton height={52} />
        <MuiSkeleton height={52} />
        <MuiSkeleton height={52} />
        <MuiSkeleton height={52} />
        <MuiSkeleton height={52} />
        <MuiSkeleton height={52} />
        <MuiSkeleton height={52} />
      </MuiPaper>
    </Dashboard>
  );
};

export default MangaPageLoading;
