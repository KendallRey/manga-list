"use client";

import { updateUserProfileImageAction } from "@/app/action/user-profile";
import MuiCard, { IMuiCardProps } from "@/components/card/Card";
import MuiCardActions from "@/components/card/CardActions";
import MuiCardHeader from "@/components/card/CardHeader";
import { customEnqueueSnackbar } from "@/components/helper/notistack";
import MuiIconButton from "@/components/icon-button/IconButton";
import { MODEL } from "@/model/model";
import { IUserProfileImageTableSelect } from "@/utils/drizzle/schema";
import { toBucketPublicProfileUrl } from "@/utils/supabase/helper/image";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { GiPhotoCamera } from "react-icons/gi";

type IProfileImageCard = {
  profileImage: IUserProfileImageTableSelect;
} & IMuiCardProps;

const ProfileImageCard: React.FC<IProfileImageCard> = (props) => {
  const { profileImage, className, ...otherProps } = props;

  const [isLoading, setIsLoading] = useState(false);

  const thumbnailImage = (
    profileImage[MODEL.USER_PROFILE_IMAGE.PATH]
      ? toBucketPublicProfileUrl(profileImage[MODEL.USER_PROFILE_IMAGE.PATH])
      : "/images/404.jpg"
  ) as string;

  const onChangeProfileImage = useCallback(async () => {
    setIsLoading(true);
    customEnqueueSnackbar({
      variant: "info",
      message: "Updating profile image...",
    });
    const response = await updateUserProfileImageAction(profileImage);
    setIsLoading(false);
    if (!response.status) {
      customEnqueueSnackbar({
        variant: "error",
        message: response.error,
      });
      return;
    }
    customEnqueueSnackbar({
      variant: "success",
      message: "Profile image updated!",
    });
  }, [profileImage]);

  return (
    <MuiCard className={`flex-grow relative ${className ?? ""}`} variant="outlined" {...otherProps}>
      <MuiCardHeader
        titleTypographyProps={{
          fontSize: 16,
          fontWeight: 550,
        }}
        subheader={profileImage[MODEL.USER_PROFILE_IMAGE.CREATED_AT]?.toDateString()}
      />
      <Image
        src={thumbnailImage}
        width={320}
        height={420}
        alt={profileImage[MODEL.USER_PROFILE_IMAGE.FULL_PATH]}
        className="mx-auto"
      />
      <MuiCardActions disableSpacing>
        <MuiIconButton color="primary" aria-label="view" disabled={isLoading} onClick={onChangeProfileImage}>
          <GiPhotoCamera />
        </MuiIconButton>
      </MuiCardActions>
    </MuiCard>
  );
};

export default ProfileImageCard;
