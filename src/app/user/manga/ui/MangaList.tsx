import ErrorPage from "@/app/error/page";
import MuiTable, { MuiHeadTr, MuiSortTh, MuiTableBody, MuiTableHead, MuiTh } from "@/components/table/Table";
import React from "react";
import { GetUserMangaList } from "@/app/api/manga/manga-api";
import { IMangaListTableSelect } from "@/utils/drizzle/schema";
import MangaListItem from "./MangaListItem";
import TableList from "@/components/helper-components/TableList";
import TablePagination from "@/components/custom/TablePagination";
import { getSearchParams } from "@/app/api/helper/apiHelper";
import MangaListHead from "./MangaListHead";

type IMangaList = {
  list: IMangaListTableSelect;
} & INextPage;

const MangaList: React.FC<IMangaList> = async (props) => {
  const { searchParams, list } = props;

  const { q, ...params } = getSearchParams(searchParams);

  const mangasResponse = await GetUserMangaList({ ...searchParams, params, listId: list.id });

  return (
    <>
      <MuiTable
        colsWidth={["10%", "80%", "10%"]}
        size="small"
        stickyHeader
        paginationProps={{ count: mangasResponse?.data?.count, limit: Number(params.limit) }}
      >
        <MangaListHead />
        <MuiTableBody>
          <TableList
            colSpan={3}
            isLoading={false}
            errorText={mangasResponse.error}
            isError={Boolean(mangasResponse.error)}
            data={mangasResponse?.data?.results}
            render={(manga) => <MangaListItem key={manga.id} item={manga} />}
          />
        </MuiTableBody>
      </MuiTable>
    </>
  );
};

export default MangaList;
