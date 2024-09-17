import MuiPaper from "@/components/paper/Paper";
import Dashboard from "@/components/ui/Dashboard";
import React from "react";
import Search from "@/components/custom/Search";
import { GetUserMangaList } from "@/app/api/manga-list/manga-list-api";
import MangaList from "./ui/MangaList";
import { GetUserMangas } from "@/app/api/manga/manga-api";
import ErrorPage from "@/app/error/page";
import CreateMangaList from "./ui/CreateMangaList";
import { getSearchParams } from "@/app/api/helper/apiHelper";
import MuiList, { MuiListItem } from "@/components/list/List";
import MuiTypography from "@/components/typography/Typograph";
import AddMangaList from "./ui/AddMangaList";
import MangaListFilter from "./ui/MangaListFilter";

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
    <Dashboard>
      <MuiPaper className="p-4" elevation={2} color="primary">
        <div className="flex gap-2">
          <Search />
          <AddMangaList id={mangaList.id} name={q} />
        </div>
        <MuiTypography variant="caption">{mangasResponse.data.length} results</MuiTypography>
        <MuiList className="flex flex-col gap-1">
          {mangasResponse.data.map((manga) => (
            <MuiListItem key={manga.id}>{manga.name}</MuiListItem>
          ))}
        </MuiList>
      </MuiPaper>

      <MuiPaper className="flex flex-col flex-grow-[2] gap-1 min-h-[320px] p-4" elevation={2} color="primary">
        <MangaListFilter />
        <MangaList list={mangaList} searchParams={searchParams} />
      </MuiPaper>
    </Dashboard>
  );
};

export default MangaPage;
