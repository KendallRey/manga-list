"use client";

import React from "react";
import { FormCheckbox } from "@/components/common/FormCheckbox";
import { FormRadio, FormRadioGroup } from "@/components/common/FormRadio";
import { TextareaField } from "@/components/common/TextareaField";
import { TextField } from "@/components/common/TextField";
import { TEXT } from "@/components/helper/field";
import { MODEL } from "@/model/model";
import { useMangaStore } from "@/store/manga-store-provider";

type MangaFormProps = {
  children?: React.ReactNode;
  isLoading?: boolean;
} & React.ComponentProps<"form">;

const MangaForm: React.FC<MangaFormProps> = (props) => {
  const { children, isLoading, ...otherProps } = props;

  const { error, form, onChange, onCheck } = useMangaStore((state) => state);

  return (
    <>
      <form className="flex flex-col gap-6" {...otherProps}>
        <div className="grid grid-cols-1 gap-4 ">
          <TextField
            required
            label={"Title"}
            name={MODEL.MANGA.NAME}
            value={form[MODEL.MANGA.NAME] ?? ""}
            maxLength={TEXT.MAX.LONG}
            error={error?.[MODEL.MANGA.NAME]}
            onChange={onChange}
            disabled={isLoading}
          />
          <TextareaField
            label={"Description"}
            name={MODEL.MANGA.DESCRIPTION}
            value={form[MODEL.MANGA.DESCRIPTION] ?? ""}
            maxLength={TEXT.MAX.DESCRIPTION}
            onChange={onChange}
            disabled={isLoading}
            rows={2}
          />
        </div>
        <div className="flex gap-4 items-center flex-wrap">
          <FormCheckbox
            label="Hide"
            name={MODEL.MANGA.HIDE}
            checked={form[MODEL.MANGA.HIDE] ?? false}
            onChange={onCheck}
            disabled={isLoading}
          />
          <FormCheckbox
            label="Spicy"
            name={MODEL.MANGA.SPICY}
            checked={form[MODEL.MANGA.SPICY] ?? false}
            onChange={onCheck}
            disabled={isLoading}
          />
          <FormCheckbox
            label="Danger"
            name={MODEL.MANGA.DANGER}
            checked={form[MODEL.MANGA.DANGER] ?? false}
            onChange={onCheck}
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
