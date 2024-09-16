"use client";

// import { ThemeProvider } from "@mui/material";
// import { MuiTheme } from "@/components/theme/theme";

import { closeSnackbar, SnackbarProvider } from "notistack";
import { HiXMark } from "react-icons/hi2";

type IProviders = {
  children: React.ReactNode;
};

export const Providers: React.FC<IProviders> = (props) => {
  const { children } = props;

  return (
    <>
      <SnackbarProvider
        action={(key) => (
          <button onClick={() => closeSnackbar(key)}>
            <HiXMark width={20} />
          </button>
        )}
      >
        {children}
      </SnackbarProvider>
    </>
  );
};

export default Providers;
