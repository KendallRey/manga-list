"use client";

import { OptionsObject, SnackbarMessage, enqueueSnackbar, closeSnackbar } from "notistack";
import { Typography } from "@mui/material";
import React from "react";
import { HiCheckCircle, HiXCircle, HiXMark } from "react-icons/hi2";
import { formatToLabel } from "./component";

type ICustomSnackbar = OptionsObject & { title?: string; message?: SnackbarMessage };

const DEFAULT_PROPS: ICustomSnackbar = {
  variant: "success",
  autoHideDuration: 5000,
  anchorOrigin: { vertical: "top", horizontal: "right" },
};

const OVERRIDE_PROPS: ICustomSnackbar = {};

export const customEnqueueSnackbar = (props: ICustomSnackbar) => {
  const { message, variant, title, ...otherProps } = props;
  return enqueueSnackbar({
    ...DEFAULT_PROPS,
    ...props,
    ...OVERRIDE_PROPS,
  });
};

type ICustomToast = {
  title?: string;
  message: SnackbarMessage;
  color: string;
  variant?: string;
  Icon?: React.ElementType;
};

type INotifMessageAction = "create" | "update" | "delete";

type INotifMessage = {
  item?: string;
  action: INotifMessageAction;
  status?: "success" | "failed";
};

export const NotifMessage: React.FC<INotifMessage> = (props) => {
  const { item = "Record", action, status = "success" } = props;
  if (status === "failed")
    return (
      <div>
        Failed to {action} <strong>{item}</strong>.
      </div>
    );
  return (
    <div>
      {formatToLabel(action)} <strong>{item}</strong> successful.
    </div>
  );
};
