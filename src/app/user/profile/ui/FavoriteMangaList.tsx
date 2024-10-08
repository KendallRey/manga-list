import { GetUserMangaList } from "@/app/api/manga-list/manga-list-api";
import { GetMangaList } from "@/app/api/manga/manga-api";
import ErrorPage from "@/app/error/page";
import CreateMangaList from "@/app/ui/manga/CreateMangaList";
import MangaCard from "@/app/ui/manga/MangaCard";
import PageTitle from "@/components/custom/PageTitle";
import TablePagination from "@/components/custom/TablePagination";
import DisplayList from "@/components/helper-components/DisplayList";
import React from "react";

type IFavoriteMangaList = {
  params?: IApiParams;
};

const FavoriteMangaList: React.FC<IFavoriteMangaList> = async (props) => {
  const { params } = props;

  const userMangaListsResponse = await GetUserMangaList({});

  if (!userMangaListsResponse.status) {
    return <ErrorPage />;
  }
  if (!userMangaListsResponse.data.length) {
    return <CreateMangaList />;
  }

  const mangaList = userMangaListsResponse.data[0];

  const mangaListResponse = await GetMangaList({
    params: { limit: 10, ...params },
    overrideParams: { favorite: true },
    listId: mangaList.id,
  });

  if (!mangaListResponse.status) {
    return <ErrorPage />;
  }

  return (
    <>
      <PageTitle>Favorites</PageTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <DisplayList
          data={mangaListResponse.data.results}
          render={(item) => <MangaCard key={item.id} manga={item} sx={{ height: 500 }} />}
        />
      </div>
      <TablePagination count={mangaListResponse.data.count} />
    </>
  );
};

export default FavoriteMangaList;
