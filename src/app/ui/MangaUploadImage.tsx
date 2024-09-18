"use client";

import { addMangaImageAction } from "@/app/action/manga";
import { IMangaTableSelect } from "@/utils/drizzle/schema";
import React from "react";
import UploadFile from "../../components/custom/UploadFile";
import { uploadMangaImageToStorage } from "@/app/api/storage/upload";
import { displaySnackbar } from "@/components/helper/notistack";
import { cleanString } from "@/components/helper/string";

type IMangaUploadImage = {
  manga: IMangaTableSelect;
};

const MangaUploadImage: React.FC<IMangaUploadImage> = (props) => {
  const { manga } = props;

  const uploadFn = async (file: File) => {
    const { data, error } = await uploadMangaImageToStorage(file, cleanString(manga.name));
    if (error) {
      displaySnackbar({ action: "upload", status: "error", variant: "error" });
      return { error: error.message };
    }
    const payload = { manga: manga, imageData: data, setAsThumbnail: true };
    const response = await addMangaImageAction({ payload });
    if (response.error) {
      displaySnackbar({ action: "upload", status: "error", variant: "error" });
      return { error: response.error };
    }
    displaySnackbar({ action: "upload", status: "success", variant: "success" });
    return { data: response.data };
  };

  return <UploadFile uploadFn={uploadFn} actionText="Upload Image" />;
};

export default MangaUploadImage;
