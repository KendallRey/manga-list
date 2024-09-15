import { OptionsObject, SnackbarMessage, enqueueSnackbar } from "notistack";

type ICustomSnackbar = OptionsObject & { message?: SnackbarMessage };

const DEFAULT_PROPS: ICustomSnackbar = {
  autoHideDuration: 3000,
};

const OVERRIDE_PROPS: ICustomSnackbar = {};

export const appEnqueueSnackbar = (props: ICustomSnackbar) =>
  enqueueSnackbar({
    ...DEFAULT_PROPS,
    ...props,
    ...OVERRIDE_PROPS,
  });
