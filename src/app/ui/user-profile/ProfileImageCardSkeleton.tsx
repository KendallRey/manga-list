import MuiCard from "@/components/card/Card";
import MuiCardActions from "@/components/card/CardActions";
import MuiCardHeader from "@/components/card/CardHeader";
import MuiSkeleton from "@/components/skeleton/Skeleton";
import React from "react";

const ProfileImageCardSkeleton = () => {
  return (
    <MuiCard className={`flex-grow relative`} variant="outlined">
      <MuiCardHeader disableTypography subheader={<MuiSkeleton variant="text" />} />
      <MuiSkeleton width={320} height={420} className="mx-auto" />
      <MuiCardActions disableSpacing>
        <MuiSkeleton width={24} height={24} />
      </MuiCardActions>
    </MuiCard>
  );
};

export default ProfileImageCardSkeleton;
