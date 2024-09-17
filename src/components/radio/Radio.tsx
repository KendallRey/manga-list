import { FormControlLabelProps, FormControlProps, Radio, RadioGroup, RadioGroupProps, RadioProps } from "@mui/material";
import React from "react";
import MuiFormControl, { MuiFormControlLabel } from "../form-control/FormControl";

type IMuiRadio = RadioProps;

const MuiRadio: React.FC<IMuiRadio> = (props) => {
  return <Radio {...props} />;
};

export default MuiRadio;

type IFormRadio = {
  label: string;
  labelProps?: FormControlLabelProps;
} & RadioProps;

export const FormRadio: React.FC<IFormRadio> = (props) => {
  const { label, labelProps, ...otherProps } = props;
  return <MuiFormControlLabel label={label} {...labelProps} control={<Radio {...otherProps} />} />;
};

type IMuiRadioGroup = RadioGroupProps;

export const MuiRadioGroup: React.FC<IMuiRadioGroup> = (props) => {
  return <RadioGroup {...props} />;
};

type IFormRadioGroup = {
  label: string;
  fcProps?: FormControlProps;
} & IMuiRadioGroup;

export const FormRadioGroup: React.FC<IFormRadioGroup> = (props) => {
  const { label, fcProps, ...otherProps } = props;
  return (
    <MuiFormControl label={label} {...fcProps}>
      <MuiRadioGroup {...otherProps} />
    </MuiFormControl>
  );
};
