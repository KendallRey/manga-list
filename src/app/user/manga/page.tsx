
import React from "react";
import { GetUserMangaList } from "@/app/api/manga-list/manga-list-api";
import { GetUserMangas } from "@/app/api/manga/manga-api";
import ErrorPage from "@/app/error/page";
import { getSearchParams } from "@/app/api/helper/apiHelper";
import CardContainer from "@/components/shared/Card";
import Breadcrumbs from "@/components/shared/BreadCrumbs";
import MangaList from "@/app/ui/manga/MangaList";
import MangaSearchAdd from "@/app/ui/manga/MangaSearchAdd";
import CreateMangaList from "@/app/ui/manga/CreateMangaList";

const MangaPage: React.FC<INextPage> = async (props) => {
  const { searchParams } = props;

  const _searchParams = await searchParams

  const mangaListResponse = await GetUserMangaList({});

  if (!mangaListResponse.status) {
    return <ErrorPage />;
  }
  if (!mangaListResponse.data.length) {
    return <CreateMangaList />;
  }

  const mangaList = mangaListResponse.data[0];

  const { q } = getSearchParams(_searchParams);

  const mangasResponse = await GetUserMangas({
    params: { q, ..._searchParams },
    listId: mangaList.id,
    skip: !q,
  });

  if (!mangasResponse.status) {
    return <ErrorPage />;
  }

  return (
    <>
      <Breadcrumbs/>
      <CardContainer className="my-2">
        <MangaSearchAdd listId={mangaList.id} searchParams={_searchParams} />
      </CardContainer>
      <CardContainer className="my-2">
        <MangaList searchParams={_searchParams} />
      </CardContainer>
      {/* <PreviewMangaDialog /> */}
    </>
  );
};

export default MangaPage;
