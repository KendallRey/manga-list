import { Menu, MenuProps } from "@mui/material";
import React from "react";

type IMuiMenu = MenuProps;

const MuiMenu: React.FC<IMuiMenu> = (props) => {
  return <Menu {...props} />;
};

export default MuiMenu;
