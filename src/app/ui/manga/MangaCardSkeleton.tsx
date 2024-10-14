import MuiCard from "@/components/card/Card";
import MuiCardActions from "@/components/card/CardActions";
import { MathRandom } from "@/components/helper/math";
import MuiSkeleton from "@/components/skeleton/Skeleton";
import MuiStack from "@/components/stack/Stack";
import React from "react";

const MangaCardSkeleton = () => {
  return (
    <MuiCard className="flex-grow relative" variant="outlined">
      <MuiStack className="p-2 py-4" gap={0.5}>
        <MuiSkeleton variant="text" width={MathRandom(300, 0.3)} />
        <MuiSkeleton variant="text" width={MathRandom(250, 0.4)} height={16} />
      </MuiStack>
      <MuiSkeleton width={320} height={455} className="mx-auto" animation="wave" />
      <MuiCardActions disableSpacing>
        <MuiSkeleton width={35} height={35} className="m-1" variant="circular" />
        <MuiSkeleton width={35} height={35} className="m-1" variant="circular" />
      </MuiCardActions>
    </MuiCard>
  );
};

export default MangaCardSkeleton;
