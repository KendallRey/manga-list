"use client";

import MuiPaper from "@/components/paper/Paper";
import Dashboard from "@/components/ui/Dashboard";
import React from "react";
import MuiSkeleton from "@/components/skeleton/Skeleton";
import { List } from "@mui/material";
import MuiTable, {
  MuiTableHead,
  MuiHeadTr,
  MuiTh,
  MuiTableBody,
  MuiTr,
  MuiTd,
  MuiSortTh,
} from "@/components/table/Table";
import ComponentList from "@/components/helper-components/ComponentList";
import MuiStack from "@/components/stack/Stack";

const MangaPageLoading = () => {
  return (
    <Dashboard>
      <MuiPaper className="p-4" elevation={2} color="primary">
        <div className="flex gap-2 mb-2">
          <MuiSkeleton height={51} component={"div"} className="flex-grow" />
          <MuiSkeleton height={51} component={"div"} width={64} />
        </div>
        <MuiSkeleton width={90} height={15} />
        <List className="flex flex-col gap-2"></List>
      </MuiPaper>
      <MuiPaper className="flex flex-col gap-1 flex-grow-[2] min-h-[320px] p-4" elevation={2} color="primary">
        <MuiSkeleton height={37} className="ml-auto" component={"div"} width={64} />
        <MuiTable colsWidth={["5%", "90%", "5%"]} size="small" stickyHeader containerProps={{ sx: { maxHeight: 650 } }}>
          <MuiTableHead>
            <MuiHeadTr>
              <MuiTh>Icon</MuiTh>
              <MuiSortTh name="title" onClick={() => {}}>
                Title
              </MuiSortTh>
              <MuiTh>Action</MuiTh>
            </MuiHeadTr>
          </MuiTableHead>
          <MuiTableBody>
            <ComponentList
              count={10}
              render={(i) => (
                <MuiTr key={i}>
                  <MuiTd>
                    <MuiSkeleton variant="rounded" width={40} height={46} />
                  </MuiTd>
                  <MuiTd>
                    <MuiSkeleton variant="text" sx={{ fontSize: 32 }} width={Math.max(Math.random(), 0.1) * 500} />
                  </MuiTd>
                  <MuiTd>
                    <div className="mx-1 flex gap-2">
                      <MuiSkeleton variant="rounded" width={30} height={30} />
                      <MuiSkeleton variant="rounded" width={30} height={30} />
                    </div>
                  </MuiTd>
                </MuiTr>
              )}
            ></ComponentList>
          </MuiTableBody>
        </MuiTable>
        <MuiStack direction={"row"} gap={1} className="mx-5 my-3">
          <ComponentList count={9} render={(i) => <MuiSkeleton key={i} variant="circular" width={30} height={30} />} />
        </MuiStack>
      </MuiPaper>
    </Dashboard>
  );
};

export default MangaPageLoading;
