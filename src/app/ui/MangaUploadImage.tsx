"use client";

import { addMangaImageAction } from "@/app/action/manga";
import { IMangaTableSelect } from "@/utils/drizzle/schema";
import React, { useCallback, useState } from "react";
import UploadFile from "../../components/custom/UploadFile";
import { uploadMangaImageToStorage } from "@/app/api/storage/upload";
import { displaySnackbar } from "@/components/helper/notistack";
import { cleanString } from "@/components/helper/string";
import { FormCheckbox } from "@/components/checkbox/Checkbox";

type IMangaUploadImage = {
  manga: IMangaTableSelect;
};

const MangaUploadImage: React.FC<IMangaUploadImage> = (props) => {
  const { manga } = props;

  const [makeThumbnail, setMakeThumbnail] = useState(true);

  const uploadFn = useCallback(
    async (file: File) => {
      const { data, error } = await uploadMangaImageToStorage(file, cleanString(manga.name));
      if (error) {
        displaySnackbar({ action: "upload", status: "error", variant: "error" });
        return { error: error.message };
      }
      const payload = { manga: manga, imageData: data, setAsThumbnail: makeThumbnail };
      const response = await addMangaImageAction({ payload });
      if (response.error) {
        displaySnackbar({ action: "upload", status: "error", variant: "error" });
        return { error: response.error };
      }
      displaySnackbar({ action: "upload", status: "success", variant: "success" });
      return { data: response.data };
    },
    [manga, makeThumbnail],
  );

  const onChangeSetAsCover = useCallback(
    (e: RCE<HTMLInputElement>) => {
      const { checked } = e.target;
      setMakeThumbnail(checked);
    },
    [setMakeThumbnail],
  );

  return (
    <div>
      <FormCheckbox label="Set as Cover" checked={makeThumbnail} onChange={onChangeSetAsCover} />
      <UploadFile uploadFn={uploadFn} actionText="Upload Image" />
    </div>
  );
};

export default MangaUploadImage;
