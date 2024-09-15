import { ThemeProvider } from "@mui/material";
import { MuiTheme } from "@/components/theme/theme";

type IProviders = {
  children: React.ReactNode;
};

export const Providers: React.FC<IProviders> = (props) => {
  const { children } = props;

  return <>{children}</>;
};

export default Providers;
