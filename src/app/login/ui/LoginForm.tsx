"use client";

import MuiButton from "@/components/button/Button";
import MuiTextField from "@/components/text-field/TextField";
import { getValidationErrors } from "@/model/helper/validation";
import { LoginFormSchema } from "@/model/login/login";
import { clearLoginForm, editLoginForm, setLoginFormError } from "@/redux/features/login/loginFormSlice";
import { useAppDispatch, useAppSelector } from "@/redux/services/hooks";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { userLoginAction, userSignUpAction } from "./action";
import { useRouter } from "next/navigation";
import USER_ROUTE from "@/constants/ROUTES";
import { customEnqueueSnackbar } from "@/components/helper/notistack";
import { getInputRecord } from "@/redux/helper/input";
import { closeSnackbar } from "notistack";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { error, ...form } = useAppSelector((state) => state.loginFormSlice);

  // #region Validate

  const onValidateForm = useCallback(() => {
    const validation = LoginFormSchema.safeParse(form);
    if (!validation.success) {
      const error = getValidationErrors(validation);
      dispatch(setLoginFormError(error));
      customEnqueueSnackbar({
        variant: "error",
        message: "Login failed...",
      });
      return null;
    }
    return validation.data;
  }, [dispatch, form]);

  // #endregion

  // #region Login

  const [isLoading, setIsLoading] = useState(false);

  const onLoginSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      closeSnackbar();
      const data = onValidateForm();
      if (!data) return;
      setIsLoading(true);
      const response = await userLoginAction(data);
      if ("error" in response) {
        setIsLoading(false);
        customEnqueueSnackbar({
          variant: "error",
          message: response.error,
        });
        return;
      }
      customEnqueueSnackbar({
        variant: "success",
        message: `Login ${response.user.email ?? "user"} successful.`,
      });
      dispatch(clearLoginForm());
      router.replace(USER_ROUTE.MANGA_PAGE.href);
    },
    [onValidateForm, dispatch, router],
  );

  // #endregion

  // #region Sign Up

  const onSignUpSubmit = useCallback(async () => {
    closeSnackbar();
    const data = onValidateForm();
    if (!data) return;
    setIsLoading(true);
    const response = await userSignUpAction(data);
    setIsLoading(false);
    if ("error" in response) {
      customEnqueueSnackbar({
        variant: "error",
        message: response.error,
      });
      return;
    }
    customEnqueueSnackbar({
      variant: "success",
      message: `Sign up ${response.user?.email ?? "user"} successful.`,
    });
    customEnqueueSnackbar({
      variant: "info",
      message: `Please check your emails to validate for account`,
    });
  }, [onValidateForm, router]);

  // #endregion

  const onChange = useCallback(
    (e: RCE<HTMLInputElement>) => {
      const record = getInputRecord(e);
      dispatch(editLoginForm(record));
    },
    [dispatch],
  );

  return (
    <div className="w-full sm:w-[360px] bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center">Login / Sign Up</h2>
        <form onSubmit={onLoginSubmit} className="flex flex-col gap-4">
          <MuiTextField
            value={form.email ?? ''}
            onChange={onChange}
            label="Email"
            type="email"
            disabled={isLoading}
            errorText={error?.email}
            autoComplete="email"
          />
          <MuiTextField
            value={form.password ?? ''}
            onChange={onChange}
            label="Password"
            type="password"
            disabled={isLoading}
            errorText={error?.password}
            autoComplete="current-password"
          />
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <MuiButton type="submit" disabled={isLoading} className="flex-1">
              Log In
            </MuiButton>
            <MuiButton type="button" onClick={()=>onSignUpSubmit()} disabled={isLoading} color="secondary" className="flex-1">
              Sign Up
            </MuiButton>
          </div>
        </form>
      </div>
  );
};

export default LoginForm;
