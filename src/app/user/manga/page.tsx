import MuiPaper from "@/components/paper/Paper";
import Dashboard from "@/components/ui/Dashboard";
import React from "react";
import Search from "@/components/custom/Search";
import { GetUserMangaList } from "@/app/api/manga-list/manga-list-api";
import MangaList from "./ui/MangaList";
import { GetUserMangas } from "@/app/api/manga/manga-api";
import ErrorPage from "@/app/error/page";
import CreateMangaList from "./ui/CreateMangaList";
import MuiButton from "@/components/button/Button";
import { addMangaAction } from "./ui/action";
import { toSearchParams } from "@/app/api/helper/apiHelper";
import MuiList, { MuiListItem } from "@/components/list/List";
import MuiTypography from "@/components/typography/Typograph";

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

  const searchParam = toSearchParams(searchParams);

  const mangasResponse = await GetUserMangas({
    params: searchParams,
    listId: mangaList.id,
    skip: !searchParam.get("q"),
  });
  if (!mangasResponse.status) {
    return <ErrorPage />;
  }

  return (
    <Dashboard>
      <MuiPaper className="p-4" elevation={2} color="primary">
        <div className="flex gap-2">
          <Search />
          <form className="flex">
            <input value={mangaList.id} name="list_id" className="hidden" readOnly />
            <input value={searchParam.get("q") ?? ""} name="name" className="hidden" readOnly />
            <MuiButton type="submit" formAction={addMangaAction}>
              Add
            </MuiButton>
          </form>
        </div>
        <MuiTypography variant="caption">{mangasResponse.data.length} results</MuiTypography>
        <MuiList className="flex flex-col gap-1">
          {mangasResponse.data.map((manga) => (
            <MuiListItem key={manga.id}>{manga.name}</MuiListItem>
          ))}
        </MuiList>
      </MuiPaper>

      <MuiPaper className="flex-grow-[2] min-h-[320px] p-4" elevation={2} color="primary">
        <MangaList list={mangaList} />
      </MuiPaper>
    </Dashboard>
  );
};

export default MangaPage;
