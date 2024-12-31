import MuiPaper from "@/components/paper/Paper";
import Dashboard from "@/components/ui/Dashboard";
import React from "react";
import { GetUserMangaList } from "@/app/api/manga-list/manga-list-api";
import { GetUserMangas } from "@/app/api/manga/manga-api";
import ErrorPage from "@/app/error/page";
import CreateMangaList from "../../ui/manga/CreateMangaList";
import { getSearchParams } from "@/app/api/helper/apiHelper";
import MangaListFilter from "./ui/MangaListFilterSorting";
import MangaSearchAdd from "../../ui/manga/MangaSearchAdd";
import MangaList from "@/app/ui/manga/MangaList";
import PreviewMangaDialog from "@/app/ui/manga/PreviewMangaDialog";

const MangaPage: React.FC<INextPage> = async (props) => {
  const { searchParams } = props;

  const mangaListResponse = await GetUserMangaList({});

  if (!mangaListResponse.status) {
    return <ErrorPage />;
  }
  if (!mangaListResponse.data.length) {
    return <CreateMangaList />;
  }

  const mangaList = mangaListResponse.data[0];

  const { q } = getSearchParams(searchParams);

  const mangasResponse = await GetUserMangas({
    params: { q, ...searchParams },
    listId: mangaList.id,
    skip: !q,
  });

  if (!mangasResponse.status) {
    return <ErrorPage />;
  }

  return (
    <>
      <Dashboard>
        <MuiPaper className="p-4" elevation={2} color="primary">
          <MangaSearchAdd listId={mangaList.id} searchParams={searchParams} />
        </MuiPaper>

        <MuiPaper className="flex flex-col flex-grow-[2] gap-1 min-h-[320px] p-4" elevation={2} color="primary">
          <MangaListFilter searchParams={searchParams} />
          <MangaList searchParams={searchParams} />
        </MuiPaper>
      </Dashboard>
      <PreviewMangaDialog />
    </>
  );
};

export default MangaPage;
