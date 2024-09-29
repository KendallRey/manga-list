import Dashboard from "@/components/ui/Dashboard";
import React from "react";

type IDashboardLayout = {
  manga: React.ReactNode;
  searchAdd: React.ReactNode;
  randomList: React.ReactNode;
} & ILayout;

const DashboardLayout: React.FC<IDashboardLayout> = (props) => {
  const { children, manga, searchAdd, randomList } = props;

  return (
    <Dashboard>
      {children}
      {searchAdd}
      {randomList}
      {manga}
    </Dashboard>
  );
};

export default DashboardLayout;
