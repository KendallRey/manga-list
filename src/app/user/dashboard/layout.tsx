import Breadcrumbs from "@/components/shared/BreadCrumbs";
import React from "react";

type DashboardLayoutProps = Readonly<{
  manga?: React.ReactNode;
  profile?: React.ReactNode;
  random?: React.ReactNode;
}>;

const DashboardLayout = ({ manga, profile, random }: DashboardLayoutProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs />
      {profile}
      {random}
      {manga}
    </div>
  );
};

export default DashboardLayout;
