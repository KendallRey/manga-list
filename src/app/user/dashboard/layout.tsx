import Dashboard from "@/components/ui/Dashboard";
import React from "react";

const DashboardLayout = ({
  preview,
  manga,
  profile,
}: Readonly<{
  manga: React.ReactNode;
  profile: React.ReactNode;
  preview: React.ReactNode;
}>) => {
  return (
    <Dashboard>
      {preview}
      {profile}
      {manga}
    </Dashboard>
  );
};

export default DashboardLayout;
