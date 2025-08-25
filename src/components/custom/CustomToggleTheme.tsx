"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

export const CustomToggleTheme = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  const isDark = useMemo(() => resolvedTheme === "dark", [resolvedTheme]);

  useEffect(() => setMounted(true), []);

  const handleChangeTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  if (!mounted)
    return (
      <div className="relative cursor-pointer h-8 w-16 bg-amber-200 dark:bg-gray-800 rounded-full p-1" />
    );

  return (
    <div
      className="relative cursor-pointer h-8 w-16 bg-amber-200 dark:bg-gray-800 rounded-full p-1"
      onClick={handleChangeTheme}
    >
      <button
        className={`absolute top-1 h-6 w-6 flex items-center justify-center rounded-full bg-yellow-500 dark:bg-blue-950 text-white shadow-md transition-all duration-300 ease-in-out ${isDark ? "translate-x-8" : "translate-x-0"}`}
      >
        {isDark ? <Moon size={16} /> : <Sun size={16} />}
      </button>
    </div>
  );
};
