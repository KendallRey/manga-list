import { GetUserMangaList } from "@/app/api/manga-list/manga-list-api";
import { GetMangaList } from "@/app/api/manga/manga-api";
import ErrorPage from "@/app/error/page";
import CreateMangaList from "@/app/ui/manga/CreateMangaList";
import MangaCard from "@/app/ui/manga/MangaCard";
import DisplayList from "@/components/helper-components/DisplayList";
import TablePagination from "@/components/shared/TablePagination";
import React from "react";

type FavoriteMangaListProps = {
  params?: ApiParamsType;
};

const FavoriteMangaList: React.FC<FavoriteMangaListProps> = async (props) => {
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
    <div className="flex flex-col gap-5">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Favorites</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DisplayList
          data={mangaListResponse.data.results}
          render={(item) => <MangaCard key={item.id} manga={item} />}
        />
      </div>
      {Boolean(mangaListResponse.data.count) && <TablePagination count={mangaListResponse.data.count} />}
    </div>
  );
};

export default FavoriteMangaList;
