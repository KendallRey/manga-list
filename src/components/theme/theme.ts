import { createTheme } from "@mui/material";
import { COLOR } from "../constants/color";

export const MuiTheme = createTheme({
  palette: {},
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
