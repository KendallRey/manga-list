"use client";

import React, { FormEvent, useCallback, useState } from "react";
import MangaForm from "./MangaForm";
import useReduxForm from "@/redux/hooks/useReduxForm";
import { useAppSelector } from "@/redux/services/hooks";
import { setMangaForm, setMangaFormError } from "@/redux/features/manga/mangaFormSlice";
import { IMangaTableSelect, upsertMangaSchema } from "@/utils/drizzle/schema";
import MuiButton from "@/components/button/Button";
import { updateMangaAction } from "@/app/action/manga";
import { displaySnackbar } from "@/components/helper/notistack";

type IUpdateMangaForm = {
  manga: IMangaTableSelect;
};

const UpdateMangaForm: React.FC<IUpdateMangaForm> = (props) => {
  const { manga } = props;
  const [isLoading, setIsLoading] = useState(true);
  const { error, ...form } = useAppSelector((state) => state.mangaFormSlice);

  const { onValidateForm } = useReduxForm({
    form: manga,
    schema: upsertMangaSchema,
    setFormAction: setMangaForm,
    onLoad: () => setIsLoading(false),
  });

  const onUpdateManga = useCallback(async () => {
    setIsLoading(true);
    const response = await updateMangaAction(manga.id, form);
    displaySnackbar({ status: response.status, action: "update", variant: "success" });
    setIsLoading(false);
  }, [form, manga.id]);

  const onValidate = useCallback(() => {
    const isValid = onValidateForm(form, setMangaFormError, upsertMangaSchema);
    if (!isValid) return;
    onUpdateManga();
  }, [form, onUpdateManga, onValidateForm]);

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (isLoading) return;
      onValidate();
    },
    [onValidate, isLoading],
  );

  return (
    <MangaForm isLoading={isLoading} onSubmit={onSubmit}>
      <MuiButton disabled={isLoading}>Update</MuiButton>
    </MangaForm>
  );
};

export default UpdateMangaForm;
