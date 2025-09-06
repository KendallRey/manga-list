import { GetUserRandomMangaList } from "@/app/api/manga/manga-api";
import { MODEL } from "@/model/model";
import React from "react";
import ListAction from "./ListAction";
import { toSearchParams } from "@/app/api/helper/apiHelper";
import API from "@/app/api/API";
import { MangaListItem } from "@/app/ui/manga/MangaListItem";
import CardContainer from "@/components/shared/Card";
import ErrorPage from "@/app/error/page";

const DashboardRandomList: React.FC<NextPage> = async (props) => {
  const { searchParams } = props;

  const params = toSearchParams(await searchParams);
  const actionParams = params.get(API.PARAMS.KEYS.ACTION) ?? null;

  const ids = actionParams?.split(",").map((item) => Number(item));

  const mangaListResponse = await GetUserRandomMangaList({
    params: { limit: 10 },
    indexes: ids,
  });

  if (!mangaListResponse.status) {
    return (
      <CardContainer>
        <ErrorPage />
      </CardContainer>
    );
  }

  return (
    <CardContainer className="flex flex-col gap-5">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Random List</h2>

      {/* Keep your existing actions */}
      <ListAction />

      {/* Manga list */}
      <div className="grid sm:grid-cols-2 gap-5">
        {mangaListResponse.data.results.map((manga) => (
          <MangaListItem key={manga[MODEL.MANGA.ID]} manga={manga} />
        ))}
      </div>
    </CardContainer>
  );
};

export default DashboardRandomList;
