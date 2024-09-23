import { getSearchParams } from "@/app/api/helper/apiHelper";
import { GetMangaList } from "@/app/api/manga/manga-api";
import MuiPaper from "@/components/paper/Paper";
import Dashboard from "@/components/ui/Dashboard";
import React from "react";
import CreateMangaList from "../manga/ui/CreateMangaList";
import ErrorPage from "@/app/error/page";
import { GetUserMangaList } from "@/app/api/manga-list/manga-list-api";
import MangaImageList from "./ui/MangaImageList";
import Search from "@/components/custom/Search";

const MangaImagesPage: React.FC<INextPage> = async (props) => {
  const { searchParams } = props;

  const mangaListResponse = await GetUserMangaList({});

  if (!mangaListResponse.status) {
    return <ErrorPage />;
  }
  if (!mangaListResponse.data.length) {
    return <CreateMangaList />;
  }

  const mangaList = mangaListResponse.data[0];

  const { q, limit, ...params } = getSearchParams({ limit: 20, ...searchParams });
  const mangasResponse = await GetMangaList({
    defaultParams: {},
    params: { limit: limit, q, ...params },
    listId: mangaList.id,
  });

  if (!mangasResponse.status) {
    return <ErrorPage />;
  }

  const { results, count } = mangasResponse.data;

  return (
    <Dashboard>
      <MuiPaper className=" p-4" elevation={2} color="primary">
        <Search />
      </MuiPaper>
      <MuiPaper className="flex-grow p-4" elevation={2} color="primary">
        <MangaImageList mangas={results} canLoadMore={results.length < count} />
      </MuiPaper>
    </Dashboard>
  );
};

export default MangaImagesPage;
