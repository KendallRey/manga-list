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
        <div className="flex gap-2">
          <MuiSkeleton height={51} component={"div"} className="flex-grow" />
          <MuiSkeleton height={51} component={"div"} width={64} />
        </div>
        <MuiSkeleton width={90} />
        <List className="flex flex-col gap-2"></List>
      </MuiPaper>
      <MuiPaper className="flex-grow-[2] min-h-[320px] p-4" elevation={2} color="primary">
        <MuiSkeleton height={40} className="ml-auto" component={"div"} width={64} />
        <MuiTable
          colsWidth={["10%", "80%", "10%"]}
          size="small"
          stickyHeader
          containerProps={{ sx: { maxHeight: 650 } }}
        >
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
            <ComponentList count={10}>
              <MuiTr>
                <MuiTd>
                  <MuiSkeleton variant="rounded" width={40} height={40} />
                </MuiTd>
                <MuiTd>
                  <MuiSkeleton variant="text" sx={{ fontSize: 32 }} />
                </MuiTd>
                <MuiTd>
                  <div className="mx-1 flex gap-2">
                    <MuiSkeleton variant="rounded" width={30} height={30} />
                    <MuiSkeleton variant="rounded" width={30} height={30} />
                  </div>
                </MuiTd>
              </MuiTr>
            </ComponentList>
          </MuiTableBody>
        </MuiTable>
        <MuiStack direction={"row"} gap={1} className="mx-5">
          <ComponentList count={9}>
            <MuiSkeleton variant="circular" width={30} height={30} />
          </ComponentList>
        </MuiStack>
      </MuiPaper>
    </Dashboard>
  );
};

export default MangaPageLoading;
