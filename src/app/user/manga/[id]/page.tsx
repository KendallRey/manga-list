import { GetUserManga } from "@/app/api/manga/manga-api";
import ErrorPage from "@/app/error/page";
import PageBreadCrumbs from "@/components/custom/PageBreadCrumbs";
import MuiPaper from "@/components/paper/Paper";
import MuiTypography from "@/components/typography/Typograph";
import Dashboard from "@/components/ui/Dashboard";
import React from "react";
import UploadFile from "./UploadFile";

const ViewMangaPage: React.FC<INextPage> = async (props) => {
  const { params } = props;

  const manga = await GetUserManga({ id: params?.id! as string });

  if (!manga.status) return <ErrorPage />;

  return (
    <Dashboard>
      <MuiPaper>
        <PageBreadCrumbs route="/user" pathNames={[manga.data.name]} />
      </MuiPaper>
      <MuiPaper className="flex-grow-[2] min-h-[320px] p-4" elevation={2} color="primary">
        <MuiTypography fontSize={24}>{manga.data.name}</MuiTypography>
        <UploadFile/>
      </MuiPaper>
    </Dashboard>
  );
};

export default ViewMangaPage;
