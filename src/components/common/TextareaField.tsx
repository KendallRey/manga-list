import React, { ComponentProps, useId } from "react";
import clsx from "clsx";

const sizeMap = {
  sm: {
    root: "gap-1",
    label: "text-xs",
    input: "min-h-[80px] text-sm px-3 py-2",
    helper: "text-xs",
    radius: "rounded-xl",
  },
  md: {
    root: "gap-1.5",
    label: "text-sm",
    input: "min-h-[100px] text-base px-4 py-3",
    helper: "text-sm",
    radius: "rounded-2xl",
  },
  lg: {
    root: "gap-2",
    label: "text-base",
    input: "min-h-[120px] text-lg px-5 py-4",
    helper: "text-sm",
    radius: "rounded-2xl",
  },
} as const;

// -------- TextareaField Component --------
export type TextareaFieldProps = {
  label?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  helperText?: string;
  error?: boolean | string; // string = helper/error text
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "filled" | "soft"; // visual variants
  className?: string; // wrapper class
  inputClassName?: string; // textarea element class
} & Omit<ComponentProps<"textarea">, "size">;

export function TextareaField({
  label,
  name,
  value,
  defaultValue,
  onChange,
  placeholder,
  helperText,
  error,
  required,
  disabled,
  fullWidth = true,
  size = "md",
  variant = "outline",
  className,
  inputClassName,
  ...otherProps
}: TextareaFieldProps) {
  const reactId = useId();
  const id = name ? `${name}` : `ta-${reactId}`;
  const hasError = Boolean(error);

  const v = sizeMap[size];

  // Base colors with dark mode
  const baseInput = clsx(
    "w-full resize-y appearance-none outline-none transition", // reset
    v.input,
    v.radius,
    {
      outline:
        "bg-white dark:bg-gray-900/40 border border-gray-300/70 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400",
      filled:
        "bg-gray-100/80 dark:bg-gray-800/60 border border-transparent placeholder-gray-500 dark:placeholder-gray-500 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20",
      soft:
        "bg-gray-50/80 dark:bg-gray-900/30 border border-gray-200/70 dark:border-gray-800 placeholder-gray-500 dark:placeholder-gray-500 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20",
    }[variant],
    hasError &&
      "border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500 dark:focus:border-red-400",
    disabled && "opacity-60 cursor-not-allowed"
  );

  return (
    <div className={clsx("flex flex-col", v.root, fullWidth && "w-full", className)}>
      {label && (
        <label
          htmlFor={id}
          className={clsx(
            v.label,
            "font-medium text-gray-800 dark:text-gray-200 select-none"
          )}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <textarea
        id={id}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={hasError}
        aria-describedby={
          helperText || typeof error === "string" ? `${id}-help` : undefined
        }
        disabled={disabled}
        className={clsx(
          baseInput,
          "text-gray-900 dark:text-gray-100 leading-relaxed",
          inputClassName
        )}
        {...otherProps}
      />

      {(helperText || typeof error === "string") && (
        <p
          id={`${id}-help`}
          className={clsx(
            v.helper,
            hasError
              ? "text-red-600 dark:text-red-400"
              : "text-gray-500 dark:text-gray-400"
          )}
        >
          {typeof error === "string" ? error : helperText}
        </p>
      )}
    </div>
  );
}
