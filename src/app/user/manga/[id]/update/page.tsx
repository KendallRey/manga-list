import { GetUserManga } from "@/app/api/manga/manga-api";
import ErrorPage from "@/app/error/page";
import PageBreadCrumbs from "@/components/custom/PageBreadCrumbs";
import MuiPaper from "@/components/paper/Paper";
import Dashboard from "@/components/ui/Dashboard";
import React from "react";
import MangaUploadImage from "@/app/ui/MangaUploadImage";
import MangaBanner from "@/app/ui/MangaBanner";
import MangaImageList from "@/app/ui/MangaImageList";
import MangaForm from "../../ui/form/MangaForm";
import UpdateMangaForm from "../../ui/form/UpdateMangaForm";
import { MODEL } from "@/model/model";
import MuiTypography from "@/components/typography/Typograph";
import MuiStack from "@/components/stack/Stack";
import MuiChip from "@/components/chip/Chip";
import { formatToLabel } from "@/components/helper/component";

const UpdateMangaPage: React.FC<INextPage> = async (props) => {
  const { params } = props;

  if (!params?.id) return <ErrorPage />;

  const manga = await GetUserManga({ id: params?.id });

  if (!manga.status) return <ErrorPage />;

  const { data } = manga;

  return (
    <Dashboard>
      <MuiPaper>
        <PageBreadCrumbs route="/user" pathNames={[data[MODEL.MANGA.NAME]]} />
      </MuiPaper>
      <div className="flex flex-grow-[2] gap-4 flex-wrap">
        <MuiPaper className="flex flex-col flex-grow p-4 gap-6" elevation={2} color="primary">
          <MangaBanner manga={data} />
          <MuiStack>
            <MuiTypography fontSize={24}>{data[MODEL.MANGA.NAME]}</MuiTypography>
            <MuiTypography variant="caption">{formatToLabel(data[MODEL.MANGA.TYPE])}</MuiTypography>
          </MuiStack>
          <MuiTypography variant="body2">{data[MODEL.MANGA.DESCRIPTION] || "No description"} </MuiTypography>
          <MuiStack direction={"row"} gap={1}>
            {data[MODEL.MANGA.HIDE] && <MuiChip size="medium" label="Hidden" color="secondary" variant="outlined" />}
            {data[MODEL.MANGA.DANGER] && <MuiChip size="medium" label="Danger" color="error" />}
            {data[MODEL.MANGA.SPICY] && <MuiChip size="medium" label="Spicy" color="secondary" />}
          </MuiStack>
        </MuiPaper>
        <MuiPaper className="flex flex-col flex-grow-[3] min-h-[320px] p-4 gap-6" elevation={2} color="primary">
          <UpdateMangaForm manga={manga.data} />
        </MuiPaper>
      </div>
      <MuiPaper className=" p-4" elevation={2} color="primary">
        <div className="max-w-[400px] mx-auto">
          <MangaUploadImage manga={manga.data} />
        </div>
      </MuiPaper>
      <MuiPaper className="p-6">
        <MangaImageList manga={manga.data} viewAction />
      </MuiPaper>
    </Dashboard>
  );
};

export default UpdateMangaPage;
