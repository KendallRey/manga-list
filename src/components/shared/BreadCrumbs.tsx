"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { capitalize } from "lodash";

type BreadcrumbsProps = {
  indexes?: number[];
  ellipsisIndexes?: number[];
  names?: string[];
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ indexes = [], names = [], ellipsisIndexes = [] }) => {
  const pathname = usePathname();

  // Split pathname into parts (ignoring empty)
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center gap-1 max-w-[90%]">
        {/* Home link */}
        <li>
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            Home
          </Link>
        </li>

        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          const isLast = index === segments.length - 1;
          const textClass = ellipsisIndexes.includes(index + 1) ? "overflow-hidden text-ellipsis text-nowrap" : "";
          const name = names[indexes.indexOf(index + 1)] || capitalize(decodeURIComponent(segment));
          return (
            <li key={href} className={`flex items-center gap-1 ${textClass}`}>
              <ChevronRight className="!w-4 min-w-4 !h-4 min-h-4 text-gray-400" />

              {isLast ? (
                <span className={`font-medium text-gray-900 dark:text-gray-100 ${textClass}`}>{name}</span>
              ) : (
                <Link
                  href={href}
                  className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition ${textClass}`}
                >
                  {name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
