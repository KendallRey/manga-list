"use client";

import React, { useTransition } from "react";
import { userLoginFormAction, userSignupFormAction } from "./action";
import { closeSnackbar } from "notistack";
import { TextField } from "@/components/common/TextField";
import { Button } from "@/components/common/Button";

const LoginForm = () => {

  const [isPending, startTransition] = useTransition()

  // #region onLoginSubmit
  const onLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget)
      startTransition(async () => await userLoginFormAction(formData))
      closeSnackbar();
    }
  // #endregion

  // #region onSignUpSubmit
  const onSignUpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    closeSnackbar();
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    startTransition(async () => await userSignupFormAction(formData))
    closeSnackbar();
  };
  // #endregion

  return (
    <div role="form" aria-labelledby="login-title" className="w-full sm:w-[360px] bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center">Login / Sign Up</h2>
        <form onSubmit={onLoginSubmit} className="flex flex-col gap-4">
          <TextField
            name="email"
            disabled={isPending}
            aria-label="Email Address"
            aria-required="true"
          />
          <TextField
            type="password"
            name="password"
            disabled={isPending}
            aria-label="Password"
            aria-required="true"
          />
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Button type="submit" 
              aria-label="Log in to your account" loading={isPending} disabled={isPending} className="flex-1">
              Log In
            </Button>
            {/* <Button type="button" 
        aria-label="Create a new account" onClick={()=>onSignUpSubmit()} disabled={isPending} color="secondary" className="flex-1">
              Sign Up
            </Button> */}
          </div>
        </form>
      </div>
  );
};

export default LoginForm;
