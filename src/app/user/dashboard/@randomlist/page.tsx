import { GetUserRandomMangaList } from "@/app/api/manga/manga-api";
import MuiList from "@/components/list/List";
import MuiPaper from "@/components/paper/Paper";
import MuiTypography from "@/components/typography/Typograph";
import { MODEL } from "@/model/model";
import React from "react";
import ListAction from "./ListAction";
import { toSearchParams } from "@/app/api/helper/apiHelper";
import API from "@/app/api/API";
import { MangaListItem } from "@/app/ui/manga/MangaListItem";

const DashboardRandomList: React.FC<INextPage> = async (props) => {
  const { searchParams } = props;

  const params = toSearchParams(searchParams);
  const actionParams = params.get(API.PARAMS.KEYS.ACTION) ?? null;

  const ids = actionParams?.split(",").map((item) => Number(item));

  const mangaListResponse = await GetUserRandomMangaList({
    params: { limit: 10 },
    indexes: ids,
  });

  if (!mangaListResponse.status) {
    return <MuiPaper></MuiPaper>;
  }

  return (
    <MuiPaper className="flex-grow flex flex-col min-h-[240px] gap-6 p-4" elevation={2} color="primary">
      <MuiTypography fontSize={24}>Random List</MuiTypography>
      <ListAction />
      <MuiList>
        {mangaListResponse.data.results.map((manga) => (
          <MangaListItem key={manga[MODEL.MANGA.ID]} manga={manga} />
        ))}
      </MuiList>
    </MuiPaper>
  );
};

export default DashboardRandomList;
