import Dashboard from "@/components/ui/Dashboard";
import React from "react";

type IDashboardLayout = {
  manga: React.ReactNode;
} & ILayout;

const DashboardLayout: React.FC<IDashboardLayout> = (props) => {
  const { children, manga } = props;

  return (
    <Dashboard>
      {children}
      {manga}
    </Dashboard>
  );
};

export default DashboardLayout;
