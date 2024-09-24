"use client";

import { addMangaImagesAction } from "@/app/action/manga";
import { IMangaTableSelect } from "@/utils/drizzle/schema";
import React, { useCallback } from "react";
import UploadFile, { IImageToUpload } from "../../components/custom/UploadFile";
import { uploadMangaImageToStorage } from "@/app/api/storage/upload";
import { displaySnackbar } from "@/components/helper/notistack";
import { cleanString } from "@/components/helper/string";

type IMangaUploadImage = {
  manga: IMangaTableSelect;
};

const MangaUploadImage: React.FC<IMangaUploadImage> = (props) => {
  const { manga } = props;

  const uploadsFn = useCallback(
    async (images: IImageToUpload[]) => {
      const ids: string[] = [];
      const successImages: IUploadFileToStorageSuccessResponse[] = [];
      let thumbNailId = "";
      for (const image of images) {
        const { data, error } = await uploadMangaImageToStorage(image.file, cleanString(manga.name));
        if (!error) {
          ids.push(image.key);
          successImages.push(data);
          if (image.setAsCover) thumbNailId = data.id;
        }
      }

      const payload = { manga: manga, imagesData: successImages, imageThumbnailId: thumbNailId };
      const response = await addMangaImagesAction({ payload });
      if (response.error) {
        displaySnackbar({ action: "upload", status: "error", variant: "error" });
      } else {
        displaySnackbar({ action: "upload", status: "success", variant: "success" });
      }
      return ids;
    },
    [manga],
  );

  return (
    <div>
      <UploadFile uploadsFn={uploadsFn} actionText="Upload Image" />
    </div>
  );
};

export default MangaUploadImage;
