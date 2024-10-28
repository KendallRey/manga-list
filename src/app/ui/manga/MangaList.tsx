import { getSearchParams } from "@/app/api/helper/apiHelper";
import { GetMangaList } from "@/app/api/manga/manga-api";
import { getHeaders } from "@/app/helper/headers";
import MuiList from "@/components/list/List";
import { MODEL } from "@/model/model";
import React from "react";
import ErrorPage from "@/app/error/page";
import DisplayList from "@/components/helper-components/DisplayList";
import { MangaListItem } from "./MangaListItem";
import TablePagination from "@/components/custom/TablePagination";
import MuiTypography from "@/components/typography/Typograph";

const MangaList = async () => {
  const { searchParams } = getHeaders();
  const { q, ...params } = getSearchParams(searchParams);

  const mangaListResponse = await GetMangaList({ ...searchParams, params });

  if (!mangaListResponse.status) return <ErrorPage />;

  return (
    <>
      <MuiList>
        <DisplayList
          data={mangaListResponse.data.results}
          render={(manga) => <MangaListItem key={manga[MODEL.MANGA.ID]} manga={manga} />}
        />
      </MuiList>
      <MuiTypography textAlign="end" variant="caption">
        {mangaListResponse.data.count} results
      </MuiTypography>
      {Boolean(mangaListResponse.data.count) && <TablePagination count={mangaListResponse.data.count} />}
    </>
  );
};

export default MangaList;
