import { alpha, CardActions, CardActionsProps, styled } from "@mui/material";
import React from "react";
import { COLOR } from "../constants/color";

const StyledMuiCardActions = styled(CardActions)(({ theme }) => ({
  position: "absolute",
  inset: "auto 0 0 0",
  background: alpha(COLOR.SLATE[100], 0.25),
}));

const MuiCardActions: React.FC<CardActionsProps> = (props) => {
  return <StyledMuiCardActions {...props} />;
};

export default MuiCardActions;
