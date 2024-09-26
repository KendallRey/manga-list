"use client";

import { FormCheckbox } from "@/components/checkbox/Checkbox";
import { TEXT } from "@/components/helper/field";
import { FormRadio, FormRadioGroup } from "@/components/radio/Radio";
import MuiTextField from "@/components/text-field/TextField";
import { MODEL } from "@/model/model";
import { editMangaForm } from "@/redux/features/manga/mangaFormSlice";
import { InputRecord } from "@/redux/helper/input";
import useReduxForm from "@/redux/hooks/useReduxForm";
import { useAppSelector } from "@/redux/services/hooks";
import React, { useCallback } from "react";

type IMangaForm = {
  children?: React.ReactNode;
  isLoading?: boolean;
} & React.ComponentProps<"form">;

const MangaForm: React.FC<IMangaForm> = (props) => {
  const { children, isLoading, ...otherProps } = props;

  const { error, ...form } = useAppSelector((state) => state.mangaFormSlice);
  const { onChangeForm } = useReduxForm();

  const onChange = useCallback(
    (e: InputRecord) => {
      onChangeForm(e, editMangaForm);
    },
    [onChangeForm],
  );

  return (
    <>
      <form className="flex flex-col gap-6" {...otherProps}>
        <div className="grid grid-cols-1 gap-4 ">
          <MuiTextField
            required
            label={"Title"}
            name={MODEL.MANGA.NAME}
            value={form[MODEL.MANGA.NAME] ?? ""}
            maxLength={TEXT.MAX.LONG}
            errorText={error?.[MODEL.MANGA.NAME]}
            onChange={onChange}
            disabled={isLoading}
          />
          <MuiTextField
            label={"Description"}
            name={MODEL.MANGA.DESCRIPTION}
            value={form[MODEL.MANGA.DESCRIPTION] ?? ""}
            maxLength={TEXT.MAX.DESCRIPTION}
            onChange={onChange}
            disabled={isLoading}
            multiline
            rows={20}
          />
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <FormCheckbox
            label="Hide"
            name={MODEL.MANGA.HIDE}
            checked={form[MODEL.MANGA.HIDE] ?? false}
            onChange={onChange}
            disabled={isLoading}
          />
          <FormCheckbox
            label="Spicy"
            name={MODEL.MANGA.SPICY}
            checked={form[MODEL.MANGA.SPICY] ?? false}
            onChange={onChange}
            disabled={isLoading}
          />
          <FormCheckbox
            label="Danger"
            name={MODEL.MANGA.DANGER}
            checked={form[MODEL.MANGA.DANGER] ?? false}
            onChange={onChange}
            disabled={isLoading}
          />
        </div>
        <FormRadioGroup
          label={"Type:"}
          name={MODEL.MANGA.TYPE}
          onChange={onChange}
          value={form[MODEL.MANGA.TYPE] ?? ""}
          row
        >
          <FormRadio label={"Manga"} value={MODEL.ENUM.MANGA_TYPE.MANGA} disabled={isLoading} />
          <FormRadio label={"Manhwa"} value={MODEL.ENUM.MANGA_TYPE.MANHWA} disabled={isLoading} />
          <FormRadio label={"Manhua"} value={MODEL.ENUM.MANGA_TYPE.MANHUA} disabled={isLoading} />
        </FormRadioGroup>
        {children}
      </form>
    </>
  );
};

export default MangaForm;
