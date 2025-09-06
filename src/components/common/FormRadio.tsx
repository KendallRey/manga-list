import React, { ComponentProps, useId } from "react";
import clsx from "clsx";

// ---------- FormRadio ----------
export type FormRadioProps = {
  label?: string;
  value: string;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
} & Omit<ComponentProps<"input">, "type">;

export function FormRadio({
  label,
  value,
  name,
  checked,
  onChange,
  disabled,
  className,
  inputClassName,
  ...otherProps
}: FormRadioProps) {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className={clsx(
        "inline-flex items-center gap-2 cursor-pointer select-none",
        disabled && "opacity-60 cursor-not-allowed",
        className,
      )}
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={clsx(
          "h-5 w-5 rounded-full border border-gray-300 dark:border-gray-600",
          "bg-white dark:bg-gray-900",
          "checked:bg-indigo-600 checked:border-indigo-600",
          "focus:ring-2 focus:ring-indigo-500/30 focus:outline-none",
          "transition",
          inputClassName,
        )}
        {...otherProps}
      />
      {label && (
        <span
          className={clsx(
            "text-sm",
            disabled ? "text-gray-400 dark:text-gray-500" : "text-gray-800 dark:text-gray-200",
          )}
        >
          {label}
        </span>
      )}
    </label>
  );
}

// ---------- FormRadioGroup ----------
export type FormRadioGroupProps = {
  label?: string;
  name: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  children: React.ReactNode;
  row?: boolean;
  helperText?: string;
  error?: boolean | string;
  className?: string;
};

export function FormRadioGroup({
  label,
  name,
  value,
  onChange,
  children,
  row = false,
  helperText,
  error,
  className,
}: FormRadioGroupProps) {
  const hasError = Boolean(error);

  // Clone children to inject name, checked, and onChange
  const clonedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement<FormRadioProps>(child)) {
      return React.cloneElement(child, {
        name,
        checked: value === child.props.value,
        onChange,
      });
    }
    return child;
  });

  return (
    <div className={clsx("flex flex-col gap-1", className)}>
      {label && <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</span>}
      <div className={clsx("flex", row ? "flex-row gap-6" : "flex-col gap-2")}>{clonedChildren}</div>
      {(helperText || typeof error === "string") && (
        <p
          className={clsx(
            "text-xs mt-1",
            hasError ? "text-red-600 dark:text-red-400" : "text-gray-500 dark:text-gray-400",
          )}
        >
          {typeof error === "string" ? error : helperText}
        </p>
      )}
    </div>
  );
}
