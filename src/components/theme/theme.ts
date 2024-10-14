import { createTheme } from "@mui/material";
import { pink, red } from "@mui/material/colors";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export const MuiTheme = createTheme({
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  palette: {
    secondary: pink,
    error: red,
  },
  transitions: {
    duration: {
      shortest: 200,
      shorter: 200,
      short: 200,
      standard: 200,
      complex: 200,
      enteringScreen: 200,
      leavingScreen: 200,
    },
  },
  breakpoints: {
    values: {
      xs: 320,
      sm: 480,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  components: {
    MuiPopover: {
      styleOverrides: {
        root: {
          zIndex: 999,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            // borderLeft: `4px solid ${COLOR.PRIMARY[500]}`,
          },
        },
      },
    },
  },
});
