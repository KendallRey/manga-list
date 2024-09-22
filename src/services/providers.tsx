"use client";

import { ThemeProvider } from "@mui/material";
import { MuiTheme } from "@/components/theme/theme";

import { closeSnackbar, SnackbarProvider } from "notistack";
import { HiXMark } from "react-icons/hi2";
import { Provider } from "react-redux";
import { store } from "@/redux/services/store";

type IProviders = {
  children: React.ReactNode;
};

export const Providers: React.FC<IProviders> = (props) => {
  const { children } = props;

  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={MuiTheme}>
          <SnackbarProvider
            action={(key) => (
              <button onClick={() => closeSnackbar(key)}>
                <HiXMark width={20} />
              </button>
            )}
          >
            {children}
          </SnackbarProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default Providers;
