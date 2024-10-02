import MuiSkeleton from "@/components/skeleton/Skeleton";
import MuiStack from "@/components/stack/Stack";
import React from "react";

const DisplayUserProfileSkeleton = () => {
  return (
    <>
      <MuiSkeleton width={140} height={140} variant="circular" />
      <MuiStack gap={1}>
        <MuiSkeleton width={260} />
        <MuiSkeleton width={220} height={18} />
      </MuiStack>
    </>
  );
};

export default DisplayUserProfileSkeleton;
