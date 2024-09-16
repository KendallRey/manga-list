import MuiPaper from "@/components/paper/Paper";
import Dashboard from "@/components/ui/Dashboard";
import React from "react";
import MuiSkeleton from "@/components/skeleton/Skeleton";

const MangaViewPageLoading: React.FC<INextPage> = async (props) => {
  const { searchParams } = props;

  return (
    <Dashboard>
      <MuiPaper>
        <MuiSkeleton className="mx-4" width={120} height={38} />
      </MuiPaper>
      <MuiPaper className="flex-grow-[2] min-h-[320px] p-4" elevation={2} color="primary">
        <MuiSkeleton />
      </MuiPaper>
    </Dashboard>
  );
};

export default MangaViewPageLoading;
