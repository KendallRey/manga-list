import * as React from "react";
import { cn } from "../helper/component";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  rounded?: "sm" | "md" | "lg" | "xl" | "full";
};

const roundedMap = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export function Skeleton({ className, rounded = "md", ...props }: SkeletonProps) {
  return (
    <div className={cn("animate-pulse bg-gray-200 dark:bg-gray-700", roundedMap[rounded], className)} {...props} />
  );
}
