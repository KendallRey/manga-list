import { getSearchParams } from "@/app/api/helper/apiHelper";
import { GetMangaList, GetUserMangas } from "@/app/api/manga/manga-api";
import MuiPaper from "@/components/paper/Paper";
import Dashboard from "@/components/ui/Dashboard";
import React from "react";
import CreateMangaList from "../manga/ui/CreateMangaList";
import ErrorPage from "@/app/error/page";
import { GetUserMangaList } from "@/app/api/manga-list/manga-list-api";
import MangaImageList from "./ui/MangaImageList";

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

  const { q, ...params } = getSearchParams(searchParams);

  const mangasResponse = await GetMangaList({
    params: { ...params },
    overrideParams: { limit: 10 },
    listId: mangaList.id,
  });

  if (!mangasResponse.status) {
    return <ErrorPage />;
  }

  return (
    <Dashboard>
      <MuiPaper className=" p-4" elevation={2} color="primary">
        Filter Here
      </MuiPaper>
      <MuiPaper className="flex-grow p-4" elevation={2} color="primary">
        <MangaImageList mangas={mangasResponse.data.results} />
      </MuiPaper>
    </Dashboard>
  );
};

export default MangaImagesPage;
