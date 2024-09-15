import { MenuItem, MenuItemProps, Tooltip } from "@mui/material";
import React from "react";

type IMuiMenuItem = MenuItemProps;

const MuiMenuItem: React.FC<IMuiMenuItem> = (props) => {
  return (
    <Tooltip placement="left" title={props.onClick ? undefined : "Under Development"}>
      <MenuItem data-testname="menu-item" className="text-slate-200" {...props} />
    </Tooltip>
  );
};

export default MuiMenuItem;
