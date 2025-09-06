import Breadcrumbs from "@/components/shared/BreadCrumbs";
import React from "react";

const DashboardLayout = ({ manga, profile, randomList }: LayoutProps<"/user/dashboard">) => {
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
