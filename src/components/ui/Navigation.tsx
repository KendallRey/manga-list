"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP } from "@/constants/APP";
import { Menu, X } from "lucide-react";

const navItems = Object.values(APP.ROUTES.USER);

const Navigation = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-1 left-1 items-center justify-between bg-white dark:bg-gray-900 shadow-md rounded-xl">
        <button
          aria-label="Toggle navigation menu"
          onClick={() => setOpen(!open)}
          className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar container */}
      <aside
        className={`
          lg:sticky lg:top-12 lg:translate-x-0 lg:flex
          ${open ? "translate-x-0" : "-translate-x-full"}
          fixed top-0 left-0 h-full w-64 z-40
          bg-white dark:bg-gray-900 shadow-lg flex-col rounded-r-xl
          transition-transform duration-300
        `}
      >
        <div className="hidden lg:block p-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
          MangaList
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map(({ href, name }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-label={name}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2 rounded-lg transition
                  ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
              >
                {name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 lg:hidden"
        />
      )}
    </>
  );
};

export default Navigation;
