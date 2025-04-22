import Dashboard from "@/components/ui/Dashboard";
import React from "react";

const DashboardLayout = ({
  preview,
  manga,
  profile,
  randomList,
}: Readonly<{
  manga: React.ReactNode;
  profile: React.ReactNode;
  randomList: React.ReactNode;
  preview: React.ReactNode;
}>) => {
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
