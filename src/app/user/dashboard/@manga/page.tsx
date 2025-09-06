import { GetMangaList } from "@/app/api/manga/manga-api";
import ErrorPage from "@/app/error/page";
import MangaCard from "@/app/ui/manga/MangaCard";
import CardContainer from "@/components/shared/Card";
import { MODEL } from "@/model/model";
import React from "react";

const DashboardManga = async () => {
  const mangasResponse = await GetMangaList({
    params: { limit: 3, created_at: "asc" },
  });

  if (!mangasResponse.status) {
    return (
      <CardContainer>
        <ErrorPage />
      </CardContainer>
    );
  }

  return (
    <CardContainer className="flex flex-col gap-5">
      <h2 className="text-2xl font-bold tracking-tight">Newly Added</h2>
      <div className="grid lg:grid-cols-3 gap-4">
        {mangasResponse.data.results.map((manga) => (
          <MangaCard key={manga[MODEL.MANGA.ID]} manga={manga} />
        ))}
      </div>
    </CardContainer>
  );
};

export default DashboardManga;
