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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-100">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image src="https://nextjs.org/icons/next.svg" alt="Next.js logo" width={180} height={38} priority />
        <form onSubmit={onLoginSubmit} className="flex flex-col gap-5 min-w-[320px]">
          <MuiTextField
            value={form.email ?? ""}
            disabled={isLoading}
            onChange={onChange}
            errorText={error?.email}
            autoComplete="email"
            label={"Email"}
          />
          <MuiTextField
            value={form.password ?? ""}
            disabled={isLoading}
            onChange={onChange}
            errorText={error?.password}
            autoComplete="current-password"
            label={"Password"}
            type="password"
          />
          <div className="flex items-center flex-wrap gap-2">
            <MuiButton className="flex-grow" type="submit" disabled={isLoading}>
              Log in
            </MuiButton>
            <MuiButton className="flex-grow" onClick={() => onSignUpSubmit()} disabled={isLoading} color="secondary">
              Sign Up
            </MuiButton>
          </div>
        </form>
      </main>
    </div>
  );
};

export default LoginForm;
