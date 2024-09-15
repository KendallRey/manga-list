import { createTheme } from "@mui/material";
import { COLOR } from "../constants/color";

export const MuiTheme = createTheme({
  palette: {
    primary: {
      main: "#FE7240",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#FFC529",
      contrastText: "#FFF",
    },
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
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            borderLeft: `4px solid ${COLOR.PRIMARY[500]}`,
          },
        },
      },
    },
  },
});
