import Dashboard from "@/components/ui/Dashboard";
import React from "react";

type IDashboardLayout = {
  manga: React.ReactNode;
  randomlist: React.ReactNode;
} & ILayout;

const DashboardLayout: React.FC<IDashboardLayout> = (props) => {
  const { children, manga, randomlist } = props;

  return (
    <Dashboard>
      {children}
      {randomlist}
      {manga}
    </Dashboard>
  );
};

export default DashboardLayout;
