import { DisplayUserProfileSkeleton } from "@/app/ui/user-profile/DisplayUserProfileSkeleton";
import CardContainer from "@/components/shared/Card";
import React from "react";

const DashboardProfileLoading = () => {
  return (
    <CardContainer>
      <DisplayUserProfileSkeleton />
    </CardContainer>
  );
};

export default DashboardProfileLoading;
