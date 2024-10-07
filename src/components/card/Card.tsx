import { Card, CardProps } from "@mui/material";

export type IMuiCardProps = CardProps;

const MuiCard: React.FC<IMuiCardProps> = (props) => {
  return <Card {...props} />;
};

export default MuiCard;
