import { getSearchParams } from "@/app/api/helper/apiHelper";
import { GetMangaList } from "@/app/api/manga/manga-api";
import { MODEL } from "@/model/model";
import React from "react";
import ErrorPage from "@/app/error/page";
import DisplayList from "@/components/helper-components/DisplayList";
import { MangaListItem } from "./MangaListItem";
import TablePagination from "@/components/shared/TablePagination";
import { formatToCount } from "@/components/helper/component";

type MangaListProps = {
  searchParams?: Record<string, unknown>;
};

const MangaList: React.FC<MangaListProps> = async (props) => {
  const { searchParams } = props;
  const { q, ...params } = getSearchParams({ created_at: "asc", ...searchParams });

  const mangaListResponse = await GetMangaList({ ...searchParams, params });

  if (!mangaListResponse.status) return <ErrorPage />;

  return (
    <>
      <DisplayList
        className="grid lg:grid-cols-2 gap-5"
        data={mangaListResponse.data.results}
        render={(manga) => <MangaListItem key={manga[MODEL.MANGA.ID]} manga={manga} />}
      />
      <div className="text-end py-2">
        {formatToCount(mangaListResponse.data.count)} results
      </div>
      {Boolean(mangaListResponse.data.count) && <TablePagination count={mangaListResponse.data.count} />}
    </>
  );
};

export default MangaList;
