"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Helpers
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const LIMIT_OPTIONS = [5, 10, 20, 50];

function parseToPage(value: string | null, max: number) {
  const num = Number(value);
  if (isNaN(num) || num < 1) return 1;
  if (num > max) return max;
  return num;
}

function toSearchParams(searchParams: URLSearchParams, additional?: Record<string, any>) {
  const params = new URLSearchParams(searchParams.toString());
  if (additional) {
    Object.entries(additional).forEach(([key, val]) => {
      params.set(key, String(val));
    });
  }
  return params;
}

type TablePaginationProps = {
  count: number;
};

const TablePagination: React.FC<TablePaginationProps> = ({ count }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // --- Page State
  const [page, setPage] = useState<number>(DEFAULT_PAGE);
  const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);

  const pageCount = useMemo(() => {
    if (!count) return 1;
    return Math.ceil(count / limit);
  }, [count, limit]);

  // --- Sync state from URL
  useEffect(() => {
    const urlPage = parseToPage(searchParams.get("page"), pageCount);
    const urlLimit = Number(searchParams.get("limit")) || DEFAULT_LIMIT;
    setPage(urlPage);
    setLimit(urlLimit);
  }, [searchParams, pageCount]);

  // --- Update URL
  const updateSearchParams = useCallback(
    (value: string | number, key: string, additionalParams?: Record<string, any>) => {
      const params = toSearchParams(searchParams, additionalParams);
      params.set(key, String(value));
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
      updateSearchParams(page - 1, "page");
    }
  };

  const handleNext = () => {
    if (page < pageCount) {
      setPage(page + 1);
      updateSearchParams(page + 1, "page");
    }
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(e.target.value);
    setLimit(newLimit);
    updateSearchParams(newLimit, "limit", { page: 1 }); // reset to page 1
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-700 rounded-b-lg">
      {/* Rows per page */}
      <div className="flex items-center gap-2">
        <span className="text-sm">Rows per page:</span>
        <select
          value={limit}
          onChange={handleLimitChange}
          className="dark:bg-gray-900 border border-gray-600 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {LIMIT_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Page info */}
      <div className="text-sm">
        Page <span className="font-medium">{page}</span> of <span className="font-medium">{pageCount}</span>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrev}
          disabled={page <= 1}
          className="p-1 rounded-md border border-gray-600 hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={handleNext}
          disabled={page >= pageCount}
          className="p-1 rounded-md border border-gray-600 hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
