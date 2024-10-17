import MuiPaper from "@/components/paper/Paper";
import Dashboard from "@/components/ui/Dashboard";
import React from "react";
import MuiSkeleton from "@/components/skeleton/Skeleton";
import MuiStack from "@/components/stack/Stack";
import MangaSearchAddSkeleton from "@/app/ui/manga/MangaSearchAddSkeleton";
import MangaListSkeleton from "@/app/ui/manga/MangaListSkeleton";

const MangaPageLoading = () => {
  return (
    <Dashboard>
      <MuiPaper className="p-4" elevation={2} color="primary">
        <MangaSearchAddSkeleton />
      </MuiPaper>
      <MuiPaper className="flex flex-col gap-1 flex-grow-[2] min-h-[320px] p-4" elevation={2} color="primary">
        <MuiSkeleton height={37} className="ml-auto" component={"div"} width={64} />
        <MangaListSkeleton />
        <MuiStack direction={"row"} gap={1} className="mx-5 my-3">
          {/* <ComponentList count={9} render={(i) => <MuiSkeleton key={i} variant="circular" width={30} height={30} />} /> */}
        </MuiStack>
      </MuiPaper>
    </Dashboard>
  );
};

export default MangaPageLoading;
