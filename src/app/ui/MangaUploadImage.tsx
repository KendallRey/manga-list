"use client";

import { addMangaImagesAction } from "@/app/action/manga";
import { IMangaTableSelect } from "@/utils/drizzle/schema";
import React, { useCallback } from "react";
import UploadImageFile, { IImageToUpload } from "../../components/custom/UploadImageFile";
import { uploadMangaImageToStorage } from "@/app/api/storage/upload";
import { displaySnackbar } from "@/components/helper/notistack";
import { cleanString } from "@/components/helper/string";
import { MODEL } from "@/model/model";

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

      const payload = { mangaId: manga[MODEL.MANGA.ID], imagesData: successImages, imageThumbnailId: thumbNailId };
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
    <div className="w-full">
      <UploadImageFile uploadsFn={uploadsFn} actionText="Upload Image" />
    </div>
  );
};

export default MangaUploadImage;
