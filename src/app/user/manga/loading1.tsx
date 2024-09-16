import MuiPaper from "@/components/paper/Paper";
import Dashboard from "@/components/ui/Dashboard";
import React from "react";
import MuiSkeleton from "@/components/skeleton/Skeleton";
import { List } from "@mui/material";
import MuiTable, { MuiTableHead, MuiHeadTr, MuiTh, MuiTableBody, MuiTr, MuiTd } from "@/components/table/Table";
import ComponentList from "@/components/helper-components/ComponentList";

const MangaPageLoading: React.FC<INextPage> = async (props) => {
  const { searchParams } = props;

  return (
    <Dashboard>
      <MuiPaper className="p-4" elevation={2} color="primary">
        <div className="flex gap-2">
          <MuiSkeleton height={52} component={"div"} className="flex-grow" />
          <MuiSkeleton height={52} component={"div"} width={64} />
        </div>
        <MuiSkeleton width={90} />
        <List className="flex flex-col gap-2"></List>
      </MuiPaper>
      <MuiPaper className="flex-grow-[2] min-h-[320px] p-4" elevation={2} color="primary">
        <MuiTable
          colsWidth={["10%", "80%", "10%"]}
          size="small"
          stickyHeader
          containerProps={{ sx: { maxHeight: 500 } }}
        >
          <MuiTableHead>
            <MuiHeadTr>
              <MuiTh>Icon</MuiTh>
              <MuiTh>Title</MuiTh>
              <MuiTh>Action</MuiTh>
            </MuiHeadTr>
          </MuiTableHead>
          <MuiTableBody>
            <ComponentList count={8}>
              <MuiTr>
                <MuiTd>
                  <MuiSkeleton variant="circular" width={40} height={40} />
                </MuiTd>
                <MuiTd>
                  <MuiSkeleton variant="text" sx={{ fontSize: 24 }} />
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
      </MuiPaper>
    </Dashboard>
  );
};

export default MangaPageLoading;
