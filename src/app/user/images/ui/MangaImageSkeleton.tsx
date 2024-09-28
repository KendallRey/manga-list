"use client";

import ComponentList from "@/components/helper-components/ComponentList";
import MuiImageList, { MuiImageListItem } from "@/components/image/Image";
import MuiPaper from "@/components/paper/Paper";
import MuiSkeleton from "@/components/skeleton/Skeleton";
import { useMediaQuery, useTheme } from "@mui/material";
import React, { useMemo } from "react";

const MangaImageSkeleton = () => {
  const theme = useTheme();

  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  const colSpan = useMemo(() => (isLg ? 5 : isMd ? 3 : isSm ? 2 : 1), [isLg, isMd, isSm]);

  return (
    <>
      <MuiPaper className=" p-4" elevation={2} color="primary">
        <MuiSkeleton height={50} />
      </MuiPaper>
      <MuiPaper className="flex-grow p-4" elevation={2} color="primary">
        <MuiImageList
          cols={colSpan}
          rowHeight={350}
          sx={{
            width: "100%",
            overflow: "hidden",
          }}
        >
          <ComponentList
            count={10}
            render={(i) => (
              <MuiImageListItem key={i}>
                <MuiSkeleton height={"100%"} animation={i % 2 === 0 ? "wave" : "pulse"} />
              </MuiImageListItem>
            )}
          />
        </MuiImageList>
      </MuiPaper>
    </>
  );
};

export default MangaImageSkeleton;
