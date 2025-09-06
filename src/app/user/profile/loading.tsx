import MangaCardSkeleton from "@/app/ui/manga/MangaCardSkeleton";
import { DisplayUserProfileSkeleton } from "@/app/ui/user-profile/DisplayUserProfileSkeleton";
import { Skeleton } from "@/components/common/Skeleton";
import DisplayList from "@/components/helper-components/DisplayList";
import CardContainer from "@/components/shared/Card";
import React from "react";

const ProfilePageLoading = () => {
  return (
    <div className="flex flex-col gap-5">
      <CardContainer className="flex flex-col items-center p-4 gap-1">
        <DisplayUserProfileSkeleton />
      </CardContainer>
      <CardContainer className="flex flex-col gap-1 flex-grow p-4">
        <div className="flex flex-col gap-5">
          <Skeleton className="h-9 w-24 rounded-md" />
          <DisplayList
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data={[1, 2, 3]}
            render={(item) => <MangaCardSkeleton key={item} />}
          />
        </div>
      </CardContainer>
    </div>
  );
};

export default ProfilePageLoading;
