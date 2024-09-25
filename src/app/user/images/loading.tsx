"use client";

import MuiImageList, { MuiImageListItem } from "@/components/image/Image";
import MuiPaper from "@/components/paper/Paper";
import MuiSkeleton from "@/components/skeleton/Skeleton";
import Dashboard from "@/components/ui/Dashboard";
import { useMediaQuery, useTheme } from "@mui/material";
import React, { useMemo } from "react";

const ImagesLoading = () => {
  const theme = useTheme();

  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  const colSpan = useMemo(() => (isLg ? 5 : isMd ? 3 : isSm ? 2 : 1), [isLg, isMd, isSm]);

  return (
    <Dashboard>
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
          <MuiImageListItem>
            <MuiSkeleton height={"100%"} />
          </MuiImageListItem>
          <MuiImageListItem>
            <MuiSkeleton height={"100%"} />
          </MuiImageListItem>
          <MuiImageListItem>
            <MuiSkeleton height={"100%"} />
          </MuiImageListItem>
          <MuiImageListItem>
            <MuiSkeleton height={"100%"} />
          </MuiImageListItem>
          <MuiImageListItem>
            <MuiSkeleton height={"100%"} />
          </MuiImageListItem>
          <MuiImageListItem>
            <MuiSkeleton height={"100%"} />
          </MuiImageListItem>
        </MuiImageList>
      </MuiPaper>
    </Dashboard>
  );
};

export default ImagesLoading;
