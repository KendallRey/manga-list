import { MenuItem, MenuItemProps, Tooltip } from "@mui/material";
import React from "react";

type IMuiMenuItem = MenuItemProps;

const MuiMenuItem: React.FC<IMuiMenuItem> = (props) => {
  return (
    <Tooltip placement="left" title={props.onClick ? undefined : "Under Development"}>
      <span>
        <MenuItem data-testname="menu-item" {...props} />
      </span>
    </Tooltip>
  );
};

export default MuiMenuItem;
