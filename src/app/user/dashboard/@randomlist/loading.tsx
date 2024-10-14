import ComponentList from "@/components/helper-components/ComponentList";
import { MathRandom } from "@/components/helper/math";
import MuiList, { MuiListItem, MuiListItemAvatar, MuiListItemText } from "@/components/list/List";
import MuiPaper from "@/components/paper/Paper";
import MuiSkeleton from "@/components/skeleton/Skeleton";
import MuiStack from "@/components/stack/Stack";
import React from "react";

const MangaLoading = () => {
  return (
    <MuiPaper className="flex-grow flex flex-col min-h-[240px] gap-6 p-4" elevation={2} color="primary">
      <MuiSkeleton height={24} className="mt-1" width={150} />
      <MuiSkeleton width={"100%"} height={36.5} />
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
                primary={<MuiSkeleton width={MathRandom(500, 0.3)} />}
                secondary={<MuiStack direction={"row"} gap={1}></MuiStack>}
              />
            </MuiListItem>
          )}
        />
      </MuiList>
    </MuiPaper>
  );
};

export default MangaLoading;
