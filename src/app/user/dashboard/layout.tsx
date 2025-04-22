import Dashboard from "@/components/ui/Dashboard";
import React from "react";

type IDashboardLayoutProps = {
  children: React.ReactNode | undefined;
  manga: React.ReactNode | undefined;
  profile: React.ReactNode | undefined;
  randomList: React.ReactNode | undefined;
  preview: React.ReactNode | undefined;
};

const DashboardLayout: React.FC<IDashboardLayoutProps> = (props) => {
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
