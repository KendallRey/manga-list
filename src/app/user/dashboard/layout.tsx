import Dashboard from "@/components/ui/Dashboard";
import React from "react";

type IDashboardLayout = {
  manga: React.ReactNode;
  searchAdd: React.ReactNode;
  randomlist: React.ReactNode;
} & ILayout;

const DashboardLayout: React.FC<IDashboardLayout> = (props) => {
  const { children, manga, searchAdd, randomlist } = props;

  return (
    <Dashboard>
      {children}
      {searchAdd}
      {randomlist}
      {manga}
    </Dashboard>
  );
};

export default DashboardLayout;
