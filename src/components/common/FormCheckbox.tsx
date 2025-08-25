import React, { ComponentProps, useId } from "react";
import clsx from "clsx";

export type FormCheckboxProps = {
  label?: string;
  helperText?: string;
  error?: boolean | string;
  className?: string; // wrapper
  inputClassName?: string; // checkbox element
} & Omit<ComponentProps<"input">, "type">;

export function FormCheckbox({
  label,
  name,
  checked,
  onChange,
  disabled,
  helperText,
  error,
  className,
  inputClassName,
  ...otherProps
}: FormCheckboxProps) {
  const id = useId();
  const hasError = Boolean(error);

  return (
    <div className={clsx("flex flex-col gap-1", className)}>
      <label
        htmlFor={id}
        className={clsx(
          "inline-flex items-center gap-2 cursor-pointer select-none",
          disabled && "opacity-60 cursor-not-allowed"
        )}
      >
        {/* Checkbox */}
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={clsx(
            "h-5 w-5 rounded-md border border-gray-300 dark:border-gray-600",
            "bg-white dark:bg-gray-900",
            "checked:bg-indigo-600 checked:border-indigo-600",
            "focus:ring-2 focus:ring-indigo-500/30 focus:outline-none",
            "transition",
            inputClassName
          )}
          {...otherProps}
        />

        {/* Label text */}
        {label && (
          <span
            className={clsx(
              "text-sm",
              disabled
                ? "text-gray-400 dark:text-gray-500"
                : "text-gray-800 dark:text-gray-200"
            )}
          >
            {label}
          </span>
        )}
      </label>

      {(helperText || typeof error === "string") && (
        <p
          className={clsx(
            "text-xs",
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
