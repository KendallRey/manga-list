import MuiBox from "@/components/box/Box";
import React from "react";

const Dashboard: React.FC<ILayout> = ({ children }) => {
  return <MuiBox className="flex flex-col flex-grow gap-4">{children}</MuiBox>;
};

export default Dashboard;
