import ErrorPage from "@/app/error/page";
import MuiTable, { MuiHeadTr, MuiTableBody, MuiTableHead, MuiTd, MuiTh, MuiTr } from "@/components/table/Table";
import React from "react";
import { GetUserMangas } from "@/app/api/manga/manga-api";
import { IMangaListTableSelect } from "@/utils/drizzle/schema";
import MangaListItem from "./MangaListItem";
import TableList from "@/components/helper-components/TableList";
import TablePagination from "@/components/custom/TablePagination";

type IMangaList = {
  list: IMangaListTableSelect;
} & INextPage;

const MangaList: React.FC<IMangaList> = async (props) => {
  const { searchParams, list } = props;

  const mangasResponse = await GetUserMangas({ params: { ...searchParams, limit: 10 }, listId: list.id });

  if (!mangasResponse.status) {
    return <ErrorPage />;
  }

  return (
    <>
      <MuiTable
        colsWidth={["10%", "80%", "10%"]}
        size="small"
        stickyHeader
        containerProps={{ sx: { maxHeight: 500, minHeight: 500 } }}
      >
        <MuiTableHead>
          <MuiHeadTr>
            <MuiTh>Icon</MuiTh>
            <MuiTh>Title</MuiTh>
            <MuiTh>Action</MuiTh>
          </MuiHeadTr>
        </MuiTableHead>
        <MuiTableBody>
          <TableList
            colSpan={3}
            isLoading={false}
            isError={false}
            data={mangasResponse.data}
            render={(manga) => <MangaListItem key={manga.id} item={manga} />}
          />
        </MuiTableBody>
      </MuiTable>
      <TablePagination count={20} />
    </>
  );
};

export default MangaList;
