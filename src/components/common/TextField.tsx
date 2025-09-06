import React, { ComponentProps, useId, useState } from "react";
import clsx from "clsx";

const sizeMap = {
  sm: {
    root: "gap-1",
    label: "text-xs",
    input: "h-9 text-sm px-3",
    helper: "text-xs",
    radius: "rounded-xl",
  },
  md: {
    root: "gap-1.5",
    label: "text-sm",
    input: "h-11 text-base px-4",
    helper: "text-sm",
    radius: "rounded-2xl",
  },
  lg: {
    root: "gap-2",
    label: "text-base",
    input: "h-12 text-lg px-5",
    helper: "text-sm",
    radius: "rounded-2xl",
  },
} as const;

// -------- TextField Component --------
export type TextFieldProps = {
  label?: string;
  name?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  value?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  helperText?: string;
  error?: boolean | string | unknown; // when string, it will be shown as helper/error text
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "filled" | "soft"; // visual variants
  className?: string; // wrapper class
  inputClassName?: string; // input element class
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
  showPasswordToggle?: boolean; // only for type="password"
} & Omit<ComponentProps<"input">, "size">;

export function TextField({
  label,
  name,
  type = "text",
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
  leftAdornment,
  rightAdornment,
  showPasswordToggle = true,
  ...otherProps
}: TextFieldProps) {
  const reactId = useId();
  const id = name ? `${name}` : `tf-${reactId}`;
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const effectiveType = isPassword && show ? "text" : type;
  const hasError = Boolean(error);

  const v = sizeMap[size];

  // Base colors with dark mode
  const baseInput = clsx(
    "w-full appearance-none outline-none transition", // reset
    v.input,
    v.radius,
    {
      outline:
        "bg-white dark:bg-gray-900/40 border border-gray-300/70 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400",
      filled:
        "bg-gray-100/80 dark:bg-gray-800/60 border border-transparent placeholder-gray-500 dark:placeholder-gray-500 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20",
      soft: "bg-gray-50/80 dark:bg-gray-900/30 border border-gray-200/70 dark:border-gray-800 placeholder-gray-500 dark:placeholder-gray-500 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20",
    }[variant],
    hasError &&
      "border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500 dark:focus:border-red-400",
    disabled && "opacity-60 cursor-not-allowed",
  );

  return (
    <div className={clsx("flex flex-col", v.root, fullWidth && "w-full", className)}>
      {label && (
        <label htmlFor={id} className={clsx(v.label, "font-medium text-gray-800 dark:text-gray-200 select-none")}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div
        className={clsx(
          "relative flex items-center",
          v.radius,
          // group wrapper handles bg/border for adornment container in some variants
          variant === "filled" && "",
        )}
      >
        {leftAdornment && (
          <span
            className={clsx(
              "absolute left-3 inline-flex items-center justify-center text-gray-500 dark:text-gray-400",
              size === "sm" ? "h-9" : size === "lg" ? "h-12" : "h-11",
            )}
          >
            {leftAdornment}
          </span>
        )}

        <input
          id={id}
          name={name}
          type={effectiveType}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={hasError}
          aria-describedby={helperText || typeof error === "string" ? `${id}-help` : undefined}
          disabled={disabled}
          className={clsx(
            baseInput,
            leftAdornment && "pl-10",
            (rightAdornment || (isPassword && showPasswordToggle)) && "pr-10",
            "text-gray-900 dark:text-gray-100",
            inputClassName,
          )}
          {...otherProps}
        />

        {/* Right adornments: custom or password toggle */}
        <div className="absolute inset-y-0 right-3 flex items-center">
          {rightAdornment}
          {isPassword && showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className={clsx(
                "ml-1 inline-flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200",
                size === "sm" ? "h-9" : size === "lg" ? "h-12" : "h-11",
              )}
              aria-label={show ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {/* eye icon (tailwind + svg, no external deps) */}
              {show ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-3.195-3.195A12.34 12.34 0 0 0 21.75 12S18 4.5 12 4.5a9.86 9.86 0 0 0-4.38 1.016L3.53 2.47Z" />
                  <path d="M6.38 7.32 8.1 9.04A7.3 7.3 0 0 1 12 7.5C16.42 7.5 19.36 10.77 20.46 12c-.44.5-1.18 1.23-2.16 1.9l-2.02-2.02a4.5 4.5 0 0 0-5.34-5.34L8.9 5.84A11.08 11.08 0 0 1 12 4.5C18 4.5 21.75 12 21.75 12s-3.75 7.5-9.75 7.5c-1.71 0-3.23-.39-4.56-1.02l-1.07-1.07A12.04 12.04 0 0 1 2.25 12s1.19-2.21 4.13-4.68Z" />
                  <path d="M9.53 10.06 7.41 7.94A4.5 4.5 0 0 0 12 16.5c.88 0 1.7-.25 2.39-.69l-1.12-1.12a3 3 0 0 1-3.74-3.74Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 4.5C18 4.5 21.75 12 21.75 12S18 19.5 12 19.5 2.25 12 2.25 12 6 4.5 12 4.5Zm0 3a4.5 4.5 0 1 0 .001 9.001A4.5 4.5 0 0 0 12 7.5Z" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      {(helperText || typeof error === "string") && (
        <p
          id={`${id}-help`}
          className={clsx(v.helper, hasError ? "text-red-600 dark:text-red-400" : "text-gray-500 dark:text-gray-400")}
        >
          {typeof error === "string" ? error : helperText}
        </p>
      )}
    </div>
  );
}
