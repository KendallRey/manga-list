"use client";

import { createUserProfileAction } from "@/app/action/user-profile";
import MuiButton from "@/components/button/Button";
import PageTitle from "@/components/custom/PageTitle";
import { customEnqueueSnackbar } from "@/components/helper/notistack";
import MuiPaper from "@/components/paper/Paper";
import MuiTypography from "@/components/typography/Typograph";
import { CircularProgress } from "@mui/material";
import React, { useCallback, useState } from "react";

const CreateUserProfile = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onCreateUserProfile = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await createUserProfileAction();
    if (response.error) {
      setIsLoading(false);
      customEnqueueSnackbar({
        variant: "error",
        message: response.error,
      });
      return;
    }
    customEnqueueSnackbar({
      variant: "success",
      message: "User Profile created successfully",
    });
  }, []);

  return (
    <MuiPaper className="p-4 flex">
      <div className="flex flex-col gap-2">
        <PageTitle>Profile</PageTitle>
        <MuiTypography variant="h6">Start customizing your profile here</MuiTypography>
        <form onSubmit={onCreateUserProfile} className="py-6">
          <MuiButton type="submit" endIcon={isLoading && <CircularProgress size={20} />} disabled={isLoading}>
            Get started
          </MuiButton>
        </form>
      </div>
    </MuiPaper>
  );
};

export default CreateUserProfile;
