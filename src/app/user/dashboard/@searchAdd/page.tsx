import { getSearchParams } from "@/app/api/helper/apiHelper";
import { GetUserMangaList } from "@/app/api/manga-list/manga-list-api";
import { GetUserRandomMangas } from "@/app/api/manga/manga-api";
import MangaSearchAdd from "@/app/ui/manga/MangaSearchAdd";
import MuiPaper from "@/components/paper/Paper";
import React from "react";

const DashboardSearchAdd: React.FC<INextPage> = async (props) => {
  const { searchParams } = props;

  const mangaListResponse = await GetUserMangaList({});

  if (!mangaListResponse.status) {
    return <MuiPaper></MuiPaper>;
  }
  if (!mangaListResponse.data.length) {
    return <MuiPaper></MuiPaper>;
  }

  const mangaList = mangaListResponse.data[0];

  const { q } = getSearchParams(searchParams);

  const mangasResponse = await GetUserRandomMangas({
    params: { limit: 10, q },
    listId: mangaList.id,
  });

  if (!mangasResponse.status) {
    return <MuiPaper></MuiPaper>;
  }
  return (
    <MuiPaper className="p-4" elevation={2} color="primary">
      <MangaSearchAdd listId={mangaList.id} searchParams={searchParams} />
    </MuiPaper>
  );
};

export default DashboardSearchAdd;
