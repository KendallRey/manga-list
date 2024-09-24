"use client";

import MuiPaper from "@/components/paper/Paper";
import MuiSkeleton from "@/components/skeleton/Skeleton";
import Dashboard from "@/components/ui/Dashboard";
import React from "react";

const ImagesLoading = () => {
  return (
    <Dashboard>
      <MuiPaper className=" p-4" elevation={2} color="primary">
        <MuiSkeleton height={50} />
      </MuiPaper>
      <MuiPaper className="flex-grow p-4" elevation={2} color="primary"></MuiPaper>
    </Dashboard>
  );
};

export default ImagesLoading;
