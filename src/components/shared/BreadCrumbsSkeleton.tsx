"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { Skeleton } from "../common/Skeleton";

const BreadcrumbSkeleton = () => {
  return (
    <nav className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center gap-1 max-w-[90%]">
        <li>
          <Skeleton className="h-4 w-12 rounded" />
        </li>

        {[1, 2, 3].map((i) => (
          <li key={i} className="flex items-center gap-1">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Skeleton className="h-4 w-20 rounded" />
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbSkeleton;
