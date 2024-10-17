"use client";

import MuiButton from "@/components/button/Button";
import { MuiListItem, MuiListItemAvatar, MuiListItemText } from "@/components/list/List";
import MuiStack from "@/components/stack/Stack";
import { ButtonGroup } from "@mui/material";
import React from "react";
import { useAppMediaQuery } from "@/components/hooks/useAppMediaQuery";
import MuiSkeleton from "@/components/skeleton/Skeleton";
import { MathRandom } from "@/components/helper/math";

const MangaListItemSkeleton = () => {
  const { sm } = useAppMediaQuery();

  return (
    <MuiListItem
      className="border-b flex flex-col gap-2"
      secondaryAction={sm && <MuiSkeleton width={24} height={24} />}
    >
      <MuiStack direction={!sm ? "column" : "row"} alignItems={"center"} width={"100%"}>
        <MuiListItemAvatar>
          <MuiSkeleton variant="rounded" width={sm ? 50 : 120} height={sm ? 50 : 160} />
        </MuiListItemAvatar>
        <MuiListItemText
          primary={<MuiSkeleton variant="rounded" width={MathRandom(150, 0.3)} height={17} />}
          disableTypography
        />
      </MuiStack>
      <ButtonGroup hidden={sm} variant="text">
        <MuiButton variant="text" color="primary">
          <MuiSkeleton variant="rounded" width={20} height={20} />
        </MuiButton>
        <MuiButton variant="text" color="primary">
          <MuiSkeleton variant="rounded" width={20} height={20} />
        </MuiButton>
        <MuiButton variant="text" color="primary">
          <MuiSkeleton variant="rounded" width={20} height={20} />
        </MuiButton>
        <MuiButton variant="text" color="primary">
          <MuiSkeleton variant="rounded" width={20} height={20} />
        </MuiButton>
        <MuiButton variant="text" color="primary">
          <MuiSkeleton variant="rounded" width={20} height={20} />
        </MuiButton>
      </ButtonGroup>
    </MuiListItem>
  );
};

export default MangaListItemSkeleton;
