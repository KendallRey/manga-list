import { GetUserMangaList } from "@/app/api/manga-list/manga-list-api";
import { GetMangaList } from "@/app/api/manga/manga-api";
import MangaCard from "@/app/ui/manga/MangaCard";
import MuiPaper from "@/components/paper/Paper";
import MuiTypography from "@/components/typography/Typograph";
import { MODEL } from "@/model/model";
import React from "react";

const DashboardManga = async () => {
  const mangaListResponse = await GetUserMangaList({});

  if (!mangaListResponse.status) {
    return <MuiPaper></MuiPaper>;
  }
  if (!mangaListResponse.data.length) {
    return <MuiPaper></MuiPaper>;
  }

  const mangaList = mangaListResponse.data[0];

  const mangasResponse = await GetMangaList({
    params: { limit: 3, created_at: "asc" },
    listId: mangaList.id,
  });

  if (!mangasResponse.status) {
    return <MuiPaper></MuiPaper>;
  }

  return (
    <MuiPaper className="flex-grow flex flex-col min-h-[240px] gap-6 p-4" elevation={2} color="primary">
      <MuiTypography fontSize={24}>Newly Added</MuiTypography>
      <div className="flex gap-4 flex-wrap">
        {mangasResponse.data.results.map((manga) => (
          <MangaCard key={manga[MODEL.MANGA.ID]} manga={manga} />
        ))}
      </div>
    </MuiPaper>
  );
};

export default DashboardManga;
