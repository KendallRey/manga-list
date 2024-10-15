import { useMediaQuery, useTheme } from "@mui/material";

export const useAppMediaQuery = () => {
  const theme = useTheme();

  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const sm = useMediaQuery(theme.breakpoints.up("sm"));

  return {
    theme,
    lg,
    md,
    sm,
  };
};
