import MuiPaper from "@/components/paper/Paper";
import Dashboard from "@/components/ui/Dashboard";
import React from "react";
import MuiSkeleton from "@/components/skeleton/Skeleton";
import MuiStack from "@/components/stack/Stack";
import ComponentList from "@/components/helper-components/ComponentList";

const MangaUpdatePageLoading = () => {
  return (
    <Dashboard>
      <MuiPaper className="p-2 flex">
        <MuiSkeleton width={50} height={24} />
        <MuiSkeleton width={4.6} height={24} className="mx-2" />
        <MuiSkeleton width={Math.random() * 500} height={24} />
        <MuiSkeleton width={4.6} height={24} className="mx-2" />
        <MuiSkeleton width={50} height={24} />
      </MuiPaper>
      <div className="flex gap-4 flex-wrap">
        <MuiPaper className="flex flex-col flex-grow gap-6 min-h-[320px] p-4" elevation={2} color="primary">
          <MuiSkeleton width={440} className="flex-grow min-h-[400px] mx-auto p-5" />
          <MuiStack marginTop={4} gap={1.3}>
            <MuiSkeleton variant="text" height={20} width={Math.max(Math.random(), 0.5) * 450} />
            <MuiSkeleton variant="text" height={13} width={60} />
          </MuiStack>
          <MuiSkeleton variant="text" height={13} width={Math.random() * 550} className="mt-8 mb-7" />
        </MuiPaper>
        <MuiPaper className="flex flex-col gap-4 flex-grow-[3] min-h-[320px] p-4" elevation={2} color="primary">
          <MuiSkeleton height={50} className="min-w-[310px]" />
          <MuiSkeleton height={487} className="flex-grow" />
          <div className="flex gap-3 my-4">
            <ComponentList
              count={3}
              render={(i) => (
                <div key={i} className="flex gap-2">
                  <MuiSkeleton height={20} width={20} variant="rounded" />
                  <MuiSkeleton height={20} width={50} variant="rounded" />
                </div>
              )}
            />
          </div>
          <div>
            <MuiSkeleton height={20} width={50} variant="text" />
            <div className="flex gap-3 my-4">
              <ComponentList
                count={3}
                render={(i) => (
                  <div key={i} className="flex gap-2">
                    <MuiSkeleton height={20} width={20} variant="rounded" />
                    <MuiSkeleton height={20} width={60} variant="rounded" />
                  </div>
                )}
              />
            </div>
          </div>
          <MuiSkeleton height={37} variant="rounded" />
        </MuiPaper>
      </div>
    </Dashboard>
  );
};

export default MangaUpdatePageLoading;
