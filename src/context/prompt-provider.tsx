
"use client";

import { ReactNode, useEffect, useState } from "react";
import { PromptContext, PromptOptions } from "./prompt-context";

export const PromptProvider = ({ children }: { children: ReactNode }) => {
  const [options, setOptions] = useState<PromptOptions | null>(null);
  const [resolver, setResolver] = useState<(value: boolean) => void>();

  const [open, setOpen] = useState(Boolean(options));

   useEffect(() => {
    const timeout = setTimeout(() => setOpen(Boolean(options)), Boolean(options) ? 5 : 300);
    return () => clearTimeout(timeout);
  }, [options]);

  const ask = (opts: PromptOptions) => {
    setOptions(opts);
    return new Promise<boolean>((resolve) => setResolver(() => resolve));
  };

  const handleClose = (value: boolean) => {
    setOptions(null);
    resolver?.(value);
  };

  return (
    <PromptContext.Provider value={{ ask }}>
      {children}

      {(options && open) && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${(Boolean(options) && open) ? "opacity-100 backdrop-blur-xs" : "opacity-0 backdrop-blur-none"}`}>
          <div className={`bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg max-w-sm w-full transform transition-all duration-300 ease-out ${(Boolean(options) && open) ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {options.title ?? "Confirm"}
            </h2>
            <div className="mt-2 text-gray-700 dark:text-gray-300">
              {options.message ?? "Are you sure?"}
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => handleClose(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                {options.cancelText ?? "Cancel"}
              </button>
              <button
                onClick={() => handleClose(true)}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                {options.confirmText ?? "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </PromptContext.Provider>
  );
};
