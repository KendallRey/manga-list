import MuiTable, { MuiTableBody } from "@/components/table/Table";
import React from "react";
import { GetMangaList } from "@/app/api/manga/manga-api";
import MangaListItem from "./MangaListItem";
import TableList from "@/components/helper-components/TableList";
import { getSearchParams } from "@/app/api/helper/apiHelper";
import MangaListHead from "./MangaListHead";

type IMangaList = INextPage;

const MangaList: React.FC<IMangaList> = async (props) => {
  const { searchParams } = props;

  const { q, ...params } = getSearchParams(searchParams);

  const mangaResponseList = await GetMangaList({ ...searchParams, params });

  return (
    <>
      <MuiTable
        colsWidth={["5%", "90%", "5%"]}
        size="small"
        stickyHeader
        paginationProps={{ count: mangaResponseList?.data?.count, limit: Number(params.limit) }}
      >
        <MangaListHead />
        <MuiTableBody>
          <TableList
            colSpan={3}
            isLoading={false}
            errorText={mangaResponseList.error}
            isError={Boolean(mangaResponseList.error)}
            data={mangaResponseList?.data?.results}
            render={(manga) => <MangaListItem key={manga.id} item={manga} />}
          />
        </MuiTableBody>
      </MuiTable>
    </>
  );
};

export default MangaList;
