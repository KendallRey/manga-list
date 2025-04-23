"use client";

import { GetUserRandomMangaList } from "@/app/api/manga/manga-api";
import MuiList from "@/components/list/List";
import MuiPaper from "@/components/paper/Paper";
import MuiTypography from "@/components/typography/Typograph";
import { MODEL } from "@/model/model";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ListAction from "./ListAction";
import { toSearchParams } from "@/app/api/helper/apiHelper";
import API from "@/app/api/API";
import { MangaListItem } from "@/app/ui/manga/MangaListItem";
import { useSearchParams } from "next/navigation";
import { IMangaTableSelect } from "@/utils/drizzle/schema";

const DashboardRandomList: React.FC = () => {
  const searchParams = useSearchParams();
  const params = toSearchParams(searchParams);
  const actionParams = params.get(API.PARAMS.KEYS.ACTION) ?? null;

  const ids = useMemo(() => actionParams?.split(",").map((item) => Number(item)), [actionParams]);
  const [mangaResponse, setMangaResponse] = useState<IApiResponse<IList<IMangaTableSelect>>>();

  const fetchMangaRandomList = useCallback(async () => {
    const mangaListResponse = await GetUserRandomMangaList({
      params: { limit: 10 },
      indexes: ids,
    });
    setMangaResponse(mangaListResponse);
  }, [ids]);

  useEffect(() => {
    fetchMangaRandomList();
  }, [fetchMangaRandomList]);

  if (!mangaResponse?.status) {
    return <MuiPaper></MuiPaper>;
  }

  return (
    <MuiPaper className="flex-grow flex flex-col min-h-[240px] gap-6 p-4" elevation={2} color="primary">
      <MuiTypography fontSize={24}>Random List</MuiTypography>
      <ListAction />
      <MuiList>
        {mangaResponse?.data.results.map((manga) => <MangaListItem key={manga[MODEL.MANGA.ID]} manga={manga} />)}
      </MuiList>
    </MuiPaper>
  );
};

export default DashboardRandomList;
