import ErrorPage from "@/app/error/page";
import MuiTable, { MuiHeadTr, MuiTableBody, MuiTableHead, MuiTh } from "@/components/table/Table";
import React from "react";
import { GetUserMangaList } from "@/app/api/manga/manga-api";
import { IMangaListTableSelect } from "@/utils/drizzle/schema";
import MangaListItem from "./MangaListItem";
import TableList from "@/components/helper-components/TableList";
import TablePagination from "@/components/custom/TablePagination";
import { getSearchParams } from "@/app/api/helper/apiHelper";

type IMangaList = {
  list: IMangaListTableSelect;
} & INextPage;

const MangaList: React.FC<IMangaList> = async (props) => {
  const { searchParams, list } = props;

  const { q, ...params } = getSearchParams(searchParams);

  const mangasResponse = await GetUserMangaList({ ...searchParams, params, listId: list.id });

  if (!mangasResponse.status) {
    return <ErrorPage />;
  }

  return (
    <>
      <MuiTable
        colsWidth={["10%", "80%", "10%"]}
        size="small"
        stickyHeader
        containerProps={{ sx: { maxHeight: 480, minHeight: 480 } }}
        paginationProps={{ count: mangasResponse.data.count }}
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
            data={mangasResponse.data.results}
            render={(manga) => <MangaListItem key={manga.id} item={manga} />}
          />
        </MuiTableBody>
      </MuiTable>
    </>
  );
};

export default MangaList;
