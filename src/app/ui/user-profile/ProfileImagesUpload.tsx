"use client";

import { addUserProfileImagesAction } from "@/app/action/user-profile";
import { uploadProfileImageToStorage } from "@/app/api/storage/upload";
import UploadImageFile, { IImageToUpload } from "@/components/custom/UploadImageFile";
import { displaySnackbar } from "@/components/helper/notistack";
import { cleanString } from "@/components/helper/string";
import { MODEL } from "@/model/model";
import { IUserProfileTableSelect } from "@/utils/drizzle/schema";
import React, { useCallback } from "react";

type IProfileImagesUpload = {
  userProfile: IUserProfileTableSelect;
};

const ProfileImagesUpload: React.FC<IProfileImagesUpload> = (props) => {
  const { userProfile } = props;

  const uploadsFn = useCallback(
    async (images: IImageToUpload[]) => {
      const ids: string[] = [];
      const successImages: IUploadFileToStorageSuccessResponse[] = [];
      let thumbNailId = "";
      for (const image of images) {
        const { data, error } = await uploadProfileImageToStorage(
          image.file,
          cleanString(userProfile[MODEL.USER_PROFILE.NAME]),
        );
        if (!error) {
          ids.push(image.key);
          successImages.push(data);
          if (image.setAsCover) thumbNailId = data.id;
        }
      }

      const payload = { profile: userProfile, imagesData: successImages, imageThumbnailId: thumbNailId };
      const response = await addUserProfileImagesAction({ payload });
      if (response.error) {
        displaySnackbar({ action: "upload", status: "error", variant: "error" });
      } else {
        displaySnackbar({ action: "upload", status: "success", variant: "success" });
      }
      return ids;
    },
    [userProfile],
  );

  return <UploadImageFile uploadsFn={uploadsFn} />;
};

export default ProfileImagesUpload;
