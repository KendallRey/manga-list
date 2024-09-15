import React from "react";
import { createMangaListAction } from "./action";
import MuiButton from "@/components/button/Button";
import MuiTypography from "@/components/typography/Typograph";
import PageTitle from "@/components/custom/PageTitle";

const CreateMangaList = () => {
  return (
    <div className="flex flex-col gap-2">
      <PageTitle>Manga List</PageTitle>
      <MuiTypography variant="h6">Start listing your manga here</MuiTypography>
      <form className="py-6">
        <MuiButton formAction={createMangaListAction} type="submit">
          Get started
        </MuiButton>
      </form>
    </div>
  );
};

export default CreateMangaList;
