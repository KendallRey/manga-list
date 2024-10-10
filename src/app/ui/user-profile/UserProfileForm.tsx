"use client";

import { useCallOnce } from "@/components/hooks/useCallOnce";
import MuiTextField from "@/components/text-field/TextField";
import { editUserProfileForm } from "@/redux/features/user-profile/userProfileFormSlice";
import { getInputRecord, InputRecord } from "@/redux/helper/input";
import { useAppDispatch, useAppSelector } from "@/redux/services/hooks";
import { createClient } from "@/utils/supabase/client";
import React, { useCallback, useState } from "react";

type IUserProfileForm = {
  children?: React.ReactNode;
  isLoading?: boolean;
} & React.ComponentProps<"form">;

const UserProfileForm: React.FC<IUserProfileForm> = (props) => {
  const { children, isLoading, ...otherProps } = props;
  const dispatch = useAppDispatch();
  const { error, ...userProfile } = useAppSelector((state) => state.userProfileFormSlice);

  const client = createClient();

  const [email, setEmail] = useState("");

  const loadUserEmail = useCallback(async () => {
    const userData = await client.auth.getUser();
    setEmail(userData.data.user?.email ?? "");
  }, [client]);

  useCallOnce(loadUserEmail);

  const onChangeForm = useCallback((e: InputRecord) => {
    const record = getInputRecord(e);
    dispatch(editUserProfileForm(record));
  }, []);

  return (
    <form className="flex flex-col gap-6" {...otherProps}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MuiTextField
          label={"Username"}
          name="name"
          onChange={onChangeForm}
          errorText={error?.name}
          value={userProfile.name ?? ""}
          disabled={isLoading}
        />
        <MuiTextField label={"Email"} value={email} disabled={true} />
      </div>
      {children}
    </form>
  );
};

export default UserProfileForm;
