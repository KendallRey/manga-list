import Breadcrumbs from "@/components/shared/BreadCrumbs";
import React from "react";

type DashboardLayoutProps = {
  manga: React.ReactNode;
  profile: React.ReactNode;
  randomList: React.ReactNode;
} & LayoutProps<"/user/dashboard">;

const DashboardLayout = ({ manga, profile, randomList }: DashboardLayoutProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs />
      {profile}
      {randomList}
      {manga}
    </div>
  );
};

export default DashboardLayout;
