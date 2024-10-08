"use server";

import { GetUserManga } from "@/app/api/manga/manga-api";
import ErrorPage from "@/app/error/page";
import PageBreadCrumbs from "@/components/custom/PageBreadCrumbs";
import MuiPaper from "@/components/paper/Paper";
import Dashboard from "@/components/ui/Dashboard";
import React from "react";
import MangaPageHeader from "@/app/ui/MangaPageHeader";
import MuiLink from "@/components/link/Link";
import USER_ROUTE, { ROUTE_ID } from "@/constants/ROUTES";
import { MODEL } from "@/model/model";
import MangaImageList from "@/app/ui/MangaImageList";
import Link from "next/link";

const ViewMangaPage: React.FC<INextPage> = async (props) => {
  const { params } = props;

  if (!params?.id) return <ErrorPage />;

  const manga = await GetUserManga({ id: params.id });

  if (!manga.status) return <ErrorPage />;

  return (
    <Dashboard>
      <MuiPaper>
        <PageBreadCrumbs route="/user" pathNames={[manga.data.name]} />
      </MuiPaper>
      <MuiPaper className="flex flex-col flex-grow-[2] min-h-[320px] p-4 gap-2" elevation={2} color="primary">
        <MangaPageHeader manga={manga.data} />
        <div className="flex justify-end">
          <MuiLink
            component={Link}
            href={USER_ROUTE.MANGA_PAGE.UPDATE.href.replace(ROUTE_ID, manga.data[MODEL.MANGA.ID])}
          >
            Edit Manga Info
          </MuiLink>
        </div>
      </MuiPaper>
      <MuiPaper className="p-6">
        <MangaImageList manga={manga.data} />
      </MuiPaper>
    </Dashboard>
  );
};

export default ViewMangaPage;
