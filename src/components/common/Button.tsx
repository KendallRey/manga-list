import React from "react";
import clsx from "clsx";

// -------- Button Component --------
export type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "solid" | "outline" | "ghost";
  color?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

export function Button({
  children,
  type = "button",
  variant = "solid",
  color = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  className,
}: ButtonProps) {
  const sizeMap = {
    sm: "h-9 px-3 text-sm rounded-lg",
    md: "h-11 px-4 text-base rounded-xl",
    lg: "h-12 px-6 text-lg rounded-2xl",
  };

  const colorMap = {
    primary: {
      solid: "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400",
      outline:
        "border border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-950/40",
      ghost:
        "text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950/40",
    },
    secondary: {
      solid: "bg-gray-600 text-white hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-400",
      outline:
        "border border-gray-600 text-gray-600 hover:bg-gray-50 dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-950/40",
      ghost:
        "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-950/40",
    },
    danger: {
      solid: "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400",
      outline:
        "border border-red-600 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-950/40",
      ghost:
        "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40",
    },
  } as const;

  const base = clsx(
    "inline-flex items-center justify-center font-medium transition focus:outline-none focus:ring-4",
    sizeMap[size],
    colorMap[color][variant],
    fullWidth && "w-full",
    disabled && "opacity-60 cursor-not-allowed",
    !disabled && "focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20",
    className
  );

  return (
    <button
      type={type}
      className={base}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
}