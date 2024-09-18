import { GetUserManga } from "@/app/api/manga/manga-api";
import ErrorPage from "@/app/error/page";
import PageBreadCrumbs from "@/components/custom/PageBreadCrumbs";
import MuiPaper from "@/components/paper/Paper";
import Dashboard from "@/components/ui/Dashboard";
import React from "react";
import MangaPageHeader from "@/app/ui/MangaPageHeader";
import MangaUploadImage from "@/app/ui/MangaUploadImage";
import MuiTextField from "@/components/text-field/TextField";
import { updateMangaFormAction } from "@/app/action/manga";
import MuiButton from "@/components/button/Button";
import { TEXT } from "@/components/helper/field";

const UpdateMangaPage: React.FC<INextPage> = async (props) => {
  const { params } = props;

  if (!params?.id) return <ErrorPage />;

  const manga = await GetUserManga({ id: params?.id });

  if (!manga.status) return <ErrorPage />;

  return (
    <Dashboard>
      <MuiPaper>
        <PageBreadCrumbs route="/user" pathNames={[manga.data.name]} />
      </MuiPaper>
      <MuiPaper className="flex flex-col flex-grow-[2] min-h-[320px] p-4 gap-6" elevation={2} color="primary">
        <MangaPageHeader manga={manga.data} />
        <form action={updateMangaFormAction} className="flex flex-col gap-6">
          <div className="grid xl:grid-cols-2 grid-cols-1 gap-4 ">
            <input className="hidden" name="id" defaultValue={manga.data.id} />
            <MuiTextField
              required
              label={"Title"}
              name="name"
              defaultValue={manga.data.name}
              maxLength={TEXT.MAX.LONG}
            />
            <MuiTextField
              label={"Description"}
              name="description"
              defaultValue={manga.data.description}
              maxLength={TEXT.MAX.LONG}
            />
          </div>
          <MuiButton type="submit">Update</MuiButton>
        </form>
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

export default UpdateMangaPage;
