import Dashboard from "@/components/ui/Dashboard";
import React from "react";

type IDashboardLayout = {
  manga: React.ReactNode;
  profile: React.ReactNode;
  randomList: React.ReactNode;
} & ILayout;

const DashboardLayout: React.FC<IDashboardLayout> = (props) => {
  const { children, manga, profile, randomList } = props;

  return (
    <Dashboard>
      {children}
      {profile}
      {randomList}
      {manga}
    </Dashboard>
  );
};

export default DashboardLayout;
