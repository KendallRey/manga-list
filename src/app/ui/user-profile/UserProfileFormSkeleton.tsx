import MuiSkeleton from "@/components/skeleton/Skeleton";
import React from "react";

type IUserProfileFormSkeleton = {
  children?: React.ReactNode;
};

const UserProfileFormSkeleton: React.FC<IUserProfileFormSkeleton> = ({ children }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MuiSkeleton height={50} className="min-w-[310px]" />
        <MuiSkeleton height={50} className="min-w-[310px]" />
      </div>
      {children}
    </div>
  );
};

export default UserProfileFormSkeleton;
