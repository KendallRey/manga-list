import { GetUserMangaList } from "@/app/api/manga-list/manga-list-api";
import { GetMangaList } from "@/app/api/manga/manga-api";
import ErrorPage from "@/app/error/page";
import CreateMangaList from "@/app/ui/manga/CreateMangaList";
import MangaCard from "@/app/ui/manga/MangaCard";
import PageTitle from "@/components/custom/PageTitle";
import TablePagination from "@/components/custom/TablePagination";
import DisplayList from "@/components/helper-components/DisplayList";
import { NextPage } from "next";
import React from "react";

type IFavoriteMangaList = {
  params?: IApiParams;
};

const FavoriteMangaList: React.FC<IFavoriteMangaList> = async (props) => {
  const { params } = props;

  const mangaListResponse = await GetUserMangaList({});

  if (!mangaListResponse.status) {
    return <ErrorPage />;
  }
  if (!mangaListResponse.data.length) {
    return <CreateMangaList />;
  }

  const mangaList = mangaListResponse.data[0];

  const mangasResponse = await GetMangaList({
    params: { limit: 10, ...params },
    listId: mangaList.id,
  });

  if (!mangasResponse.status) {
    return <ErrorPage />;
  }

  return (
    <>
      <PageTitle>Favorites</PageTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <DisplayList data={mangasResponse.data.results} render={(item) => <MangaCard key={item.id} manga={item} />} />
      </div>
      <TablePagination count={mangasResponse.data.count} />
    </>
  );
};

export default FavoriteMangaList;
