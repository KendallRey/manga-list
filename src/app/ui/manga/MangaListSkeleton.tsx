import ComponentList from "@/components/helper-components/ComponentList";
import MuiList, { MuiListItem, MuiListItemAvatar, MuiListItemText } from "@/components/list/List";
import React from "react";
import { MathRandom } from "@/components/helper/math";
import MuiSkeleton from "@/components/skeleton/Skeleton";
import MuiStack from "@/components/stack/Stack";

const MangaListSkeleton = () => {
  return (
    <MuiList>
      <ComponentList
        count={10}
        render={(i) => (
          <MuiListItem key={i} className="border-b">
            <MuiListItemAvatar>
              <MuiSkeleton width={50} height={50} />
            </MuiListItemAvatar>
            <MuiListItemText
              disableTypography
              primary={<MuiSkeleton style={{ maxWidth: MathRandom(500, 0.3) }} />}
              secondary={<MuiStack direction={"row"} gap={1}></MuiStack>}
            />
          </MuiListItem>
        )}
      />
    </MuiList>
  );
};

export default MangaListSkeleton;
