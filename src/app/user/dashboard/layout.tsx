import Dashboard from "@/components/ui/Dashboard";
import React from "react";

type IDashboardLayout = {
  children: React.ReactNode;
  manga: React.ReactNode;
  profile: React.ReactNode;
  randomList: React.ReactNode;
  preview: React.ReactNode;
};

const DashboardLayout: React.FC<IDashboardLayout> = (props) => {
  const { preview, manga, profile, randomList } = props;

  return (
    <Dashboard>
      {preview}
      {profile}
      {randomList}
      {manga}
    </Dashboard>
  );
};

export default DashboardLayout;
