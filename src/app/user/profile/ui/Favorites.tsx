import { GetUserMangaList } from "@/app/api/manga-list/manga-list-api";
import { GetMangaList } from "@/app/api/manga/manga-api";
import ErrorPage from "@/app/error/page";
import CreateMangaList from "@/app/ui/manga/CreateMangaList";
import MangaCard from "@/app/ui/manga/MangaCard";
import PageTitle from "@/components/custom/PageTitle";
import DisplayList from "@/components/helper-components/DisplayList";
import React from "react";

const Favorites = async () => {
  const mangaListResponse = await GetUserMangaList({});

  if (!mangaListResponse.status) {
    return <ErrorPage />;
  }
  if (!mangaListResponse.data.length) {
    return <CreateMangaList />;
  }

  const mangaList = mangaListResponse.data[0];

  const mangasResponse = await GetMangaList({
    params: { limit: 10 },
    listId: mangaList.id,
  });

  if (!mangasResponse.status) {
    return <ErrorPage />;
  }

  return (
    <>
      <PageTitle>Favorites</PageTitle>
      <div className="flex flex-wrap gap-6">
        <DisplayList data={mangasResponse.data.results} render={(item) => <MangaCard key={item.id} manga={item} />} />
      </div>
    </>
  );
};

export default Favorites;
