import Dashboard from "@/components/ui/Dashboard";
import React from "react";

type LayoutProps = {
  children?: React.ReactNode;
};

type LayoutPropsExtended = {
  children?: React.ReactNode;
  manga: React.ReactNode;
  profile: React.ReactNode;
  randomList: React.ReactNode;
  preview: React.ReactNode;
};

const DashboardLayout = (props: LayoutProps & LayoutPropsExtended) => {
  const { manga, profile, randomList, preview } = {
    ...props,
    manga: undefined,
    profile: undefined,
    randomList: undefined,
    preview: undefined,
  };
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
