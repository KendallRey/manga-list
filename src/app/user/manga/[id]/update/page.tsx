import { GetUserManga } from "@/app/api/manga/manga-api";
import ErrorPage from "@/app/error/page";
import React from "react";
import MangaUploadImage from "@/app/ui/MangaUploadImage";
import UpdateMangaForm from "../../ui/form/UpdateMangaForm";
import Breadcrumbs from "@/components/shared/BreadCrumbs";
import MangaBanner from "@/app/ui/MangaBanner";
import CardContainer from "@/components/shared/Card";
import MangaImageList from "@/app/ui/MangaImageList";
import Link from "next/link";
import USER_ROUTE, { ROUTE_ID } from "@/constants/ROUTES";
import { Eye } from "lucide-react";
import { MODEL } from "@/model/model";

const UpdateMangaPage: React.FC<NextPage> = async (props) => {
  const { params } = props;
  const _params = await params;

  if (!_params?.id) return <ErrorPage />;

  const manga = await GetUserManga({ id: _params?.id });

  if (!manga.status) return <ErrorPage />;

  return (
    <>
      <Breadcrumbs indexes={[3]} names={[manga.data.name]} ellipsisIndexes={[3]} />
      <MangaBanner manga={manga.data} />
      <CardContainer className="lg:-mt-36 lg:!pt-24 min-h-[50vh] my-6">
        <div className="flex justify-end gap-5">
          <Link
            href={USER_ROUTE.MANGA_PAGE.VIEW.href.replace(ROUTE_ID, manga.data[MODEL.MANGA.ID])}
            className="z-10 text-sm flex items-center gap-2 text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400"
          >
            View <Eye size={18} />
          </Link>
        </div>
        <UpdateMangaForm manga={manga.data} />
      </CardContainer>
      <CardContainer className=" flex flex-col gap-4 my-6">
        <h3 className="text-xl font-bold">Upload Images</h3>
        <MangaUploadImage manga={manga.data} />
      </CardContainer>
      <CardContainer className=" flex flex-col gap-4 my-6">
        <h3 className="text-xl font-bold">Images</h3>
        <MangaImageList manga={manga.data} viewAction />
      </CardContainer>
    </>
  );
};

export default UpdateMangaPage;
