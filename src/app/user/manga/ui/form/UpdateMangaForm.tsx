"use client";

import React, { FormEvent, useCallback, useState } from "react";
import MangaForm from "./MangaForm";
import { IMangaTableSelect } from "@/utils/drizzle/schema";
import { updateMangaAction } from "@/app/action/manga";
import { displaySnackbar } from "@/components/helper/notistack";
import { useMangaStore } from "@/store/manga-store-provider";
import { Button } from "@/components/common/Button";
import { useCallOnce } from "@/components/hooks/useCallOnce";

type UpdateMangaFormProps = {
  manga: IMangaTableSelect;
};

const UpdateMangaForm: React.FC<UpdateMangaFormProps> = (props) => {
  const { manga } = props;
  const [isLoading, setIsLoading] = useState(false);
  const { form, setForm } = useMangaStore((state) => state);

  const onSubmitManga = async (e?: FormEvent) => {
    e?.preventDefault();
    setIsLoading(true);
    const response = await updateMangaAction(manga.id, form);
    displaySnackbar({ status: response.status, action: "update", variant: "success" });
    setIsLoading(false);
  };

  const setMangaForm = useCallback(() => {
    setForm(manga);
  }, [manga, setForm]);

  useCallOnce(setMangaForm);

  return (
    <MangaForm isLoading={isLoading} onSubmit={onSubmitManga}>
      <Button disabled={isLoading} onClick={() => onSubmitManga()}>
        Update
      </Button>
    </MangaForm>
  );
};

export default UpdateMangaForm;
