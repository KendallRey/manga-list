import { GetUserManga } from "@/app/api/manga/manga-api";
import ErrorPage from "@/app/error/page";
import PageBreadCrumbs from "@/components/custom/PageBreadCrumbs";
import MuiPaper from "@/components/paper/Paper";
import Dashboard from "@/components/ui/Dashboard";
import React from "react";
import MangaUploadImage from "../../../ui/MangaUploadImage";
import MangaPageHeader from "@/app/ui/MangaPageHeader";

const ViewMangaPage: React.FC<INextPage> = async (props) => {
  const { params } = props;

  const manga = await GetUserManga({ id: params?.id! as string });

  if (!manga.status) return <ErrorPage />;

  return (
    <Dashboard>
      <MuiPaper>
        <PageBreadCrumbs route="/user" pathNames={[manga.data.name]} />
      </MuiPaper>
      <MuiPaper className="flex flex-col flex-grow-[2] min-h-[320px] p-4 gap-2" elevation={2} color="primary">
        <MangaPageHeader manga={manga.data} />
      </MuiPaper>
      <div className="flex flex-grow-[2] gap-4 flex-wrap">
        <MuiPaper className=" p-4" elevation={2} color="primary">
          <MangaUploadImage manga={manga.data} />
        </MuiPaper>
        <MuiPaper className="flex-grow p-4" elevation={2} color="primary"></MuiPaper>
      </div>
    </Dashboard>
  );
};

export default ViewMangaPage;
