import React from "react";
import MuiButton from "@/components/button/Button";
import MuiTypography from "@/components/typography/Typograph";
import PageTitle from "@/components/custom/PageTitle";
import { createMangaListAction } from "@/app/action/manga";
import MuiPaper from "@/components/paper/Paper";

const CreateMangaList = () => {
  return (
    <MuiPaper className="flex-grow p-4 flex">
      <div className="flex flex-col gap-2">
        <PageTitle>Manga List</PageTitle>
        <MuiTypography variant="h6">Start listing your manga here</MuiTypography>
        <form className="py-6">
          <MuiButton formAction={createMangaListAction} type="submit">
            Get started
          </MuiButton>
        </form>
      </div>
    </MuiPaper>
  );
};

export default CreateMangaList;
