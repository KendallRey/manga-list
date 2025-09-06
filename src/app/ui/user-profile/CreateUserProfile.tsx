"use client";

import { createUserProfileAction } from "@/app/action/user-profile";
import { Button } from "@/components/common/Button";
import { customEnqueueSnackbar } from "@/components/helper/notistack";
import CardContainer from "@/components/shared/Card";
import { Loader2 } from "lucide-react";
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
    <CardContainer>
      <div className="flex flex-col gap-2 w-full">
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Start customizing your profile here</h2>

        <form onSubmit={onCreateUserProfile} className="py-6">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Get started
          </Button>
        </form>
      </div>
    </CardContainer>
  );
};

export default CreateUserProfile;
