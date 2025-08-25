import React, { ReactNode } from 'react'
import clsx from "clsx";

  const sizeMap = {
    sm: "px-2 py-0.5 text-xs rounded-lg",
    md: "px-4 py-1 text-sm rounded-xl",
    lg: "px-5 py-1.5 text-base rounded-2xl",
  };

    const colorMap = {
      primary: {
        solid: "bg-indigo-100  dark:bg-indigo-800 text-gray-800 dark:text-gray-100",
        outline:
          "border border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400",
      },
      secondary: {
        solid: "bg-gray-600 text-white dark:bg-gray-500",
        outline:
          "border border-gray-600 text-gray-600 dark:border-gray-200 dark:text-gray-200",
      },
      danger: {
        solid: "bg-red-600 text-white  dark:bg-red-500",
        outline:
          "border border-red-600 text-red-600 dark:border-red-400 dark:text-red-400",
      },
      pink: {
        solid: "bg-pink-100 text-pink-700 dark:bg-pink-500 dark:text-pink-50",
        outline:
          "border border-pink-600 text-pink-600 dark:border-pink-400 dark:text-pink-400",
      },
    } as const;
  
export type ChipProps = {
  children: React.ReactNode;
  variant?: "solid" | "outline";
  color?: "primary" | "secondary" | "danger" | "pink";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: ReactNode;
};

const Chip = ({
  variant = "solid",
  color = "primary",
  size = "sm",
  className,
  icon,
  children,
}: ChipProps) => {

  const base = clsx(
    "flex items-center gap-2",
    sizeMap[size],
    colorMap[color][variant],
    className
  );

  return (
    <span className={base}>
      {icon}{children}
    </span>
  )
}

export default Chip

// {manga[MODEL.MANGA.HIDE] && (
//   <span className="flex items-center gap-1 px-2 py-0.5 rounded-md border text-gray-600 dark:text-gray-300 text-xs">
//     <EyeOff size={14} /> Hidden
//   </span>
// )}
// {manga[MODEL.MANGA.DANGER] && (
//   <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 text-xs">
//     <ShieldAlert size={14} /> Danger
//   </span>
// )}
// {manga[MODEL.MANGA.SPICY] && (
//   <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300 text-xs">
//     <Flame size={14} /> Spicy
//   </span>
// )}