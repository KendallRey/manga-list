"use server";

import { GetUserManga } from "@/app/api/manga/manga-api";
import ErrorPage from "@/app/error/page";
import React from "react";
import MangaImageList from "@/app/ui/MangaImageList";
import Breadcrumbs from "@/components/shared/BreadCrumbs";
import CardContainer from "@/components/shared/Card";
import MangaBanner from "@/app/ui/MangaBanner";
import Link from "next/link";
import USER_ROUTE, { ROUTE_ID } from "@/constants/ROUTES";
import { MODEL } from "@/model/model";
import { Pencil } from "lucide-react";

const ViewMangaPage: React.FC<INextPage> = async (props) => {
  const { params } = props;

  const _params = await params

  if (!_params?.id) return <ErrorPage />;

  const manga = await GetUserManga({ id: _params.id });

  if (!manga.status) return <ErrorPage />;

  return (
    <>
    <Breadcrumbs indexes={[3]} names={[manga.data.name]} ellipsisIndexes={[3]}/>
    <MangaBanner manga={manga.data} />
    <CardContainer className="lg:-mt-36 lg:!pt-24 min-h-[50vh] flex flex-col gap-4">
      <div className="flex justify-between gap-5">
        <h2 className="text-xl font-bold">Images</h2>
        <Link
          href={USER_ROUTE.MANGA_PAGE.UPDATE.href.replace(
            ROUTE_ID,
            manga.data[MODEL.MANGA.ID]
          )}
          className="z-10 text-sm flex items-center gap-2 text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400"
        >
          Update <Pencil size={18} />
        </Link>
      </div>
      <MangaImageList manga={manga.data} viewAction/>
    </CardContainer>
    </>
  );
};

export default ViewMangaPage;
