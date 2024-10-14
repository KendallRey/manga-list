"use client";

import { GetUserProfiles } from "@/app/api/user-profile/user-profile-api";
import { useCallOnce } from "@/components/hooks/useCallOnce";
import { setUserProfileForm, setUserProfileFormError } from "@/redux/features/user-profile/userProfileFormSlice";
import useReduxForm from "@/redux/hooks/useReduxForm";
import { useAppDispatch, useAppSelector } from "@/redux/services/hooks";
import { IUserProfileTableSelect, upsertUserProfileSchema } from "@/utils/drizzle/schema";
import React, { FormEvent, useCallback, useState } from "react";
import UserProfileForm from "./UserProfileForm";
import { updateUserProfileAction } from "@/app/action/user-profile";
import MuiButton from "@/components/button/Button";
import { displaySnackbar } from "@/components/helper/notistack";

type IUpdateUserProfileForm = object;

const UpdateUserProfileForm: React.FC<IUpdateUserProfileForm> = (props) => {
  const {} = props;

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { error, ...form } = useAppSelector((state) => state.userProfileFormSlice);

  const { onValidateForm, setSafeForm } = useReduxForm({
    form: form,
    schema: upsertUserProfileSchema,
    setFormAction: setUserProfileForm,
    onLoad: () => setIsLoading(false),
  });

  const [userProfile, setUserProfile] = useState<IUserProfileTableSelect>();

  const loadUserProfileForm = useCallback(async () => {
    const userProfiles = await GetUserProfiles({});
    if (!userProfiles.data?.length) return;
    const userProfile = userProfiles.data[0];
    setSafeForm(userProfile, setUserProfileForm, upsertUserProfileSchema);
    setUserProfile(userProfile);
  }, [dispatch]);

  useCallOnce(loadUserProfileForm);

  const onUpdateManga = useCallback(async () => {
    if (!userProfile?.id) return;
    setIsLoading(true);
    const response = await updateUserProfileAction(userProfile.id, form);
    displaySnackbar({ status: response.status, action: "update", variant: "success" });
    setIsLoading(false);
  }, [form, userProfile?.id]);

  const onValidate = useCallback(() => {
    const isValid = onValidateForm(form, setUserProfileFormError, upsertUserProfileSchema);
    if (!isValid) return;
    onUpdateManga();
  }, [form, onUpdateManga, onValidateForm]);

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (isLoading) return;
      onValidate();
    },
    [onValidate, isLoading],
  );

  return (
    <UserProfileForm isLoading={isLoading} onSubmit={onSubmit}>
      <MuiButton disabled={isLoading}>Update</MuiButton>
    </UserProfileForm>
  );
};

export default UpdateUserProfileForm;
