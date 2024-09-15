import { Checkbox, CheckboxProps } from "@mui/material";

type IMuiCheckbox = CheckboxProps;

const MuiCheckbox: React.FC<IMuiCheckbox> = (props) => {
  return <Checkbox {...props} data-testname="checkbox" />;
};

export default MuiCheckbox;
