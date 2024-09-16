"use client";

import React, { useCallback, useEffect, useState } from "react";
import MuiPagination from "../pagination/Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { revalidatePath } from "next/cache";

type ITablePagination = {
  count: number;
  limit?: number;
  name?: string;
};

const DEFAULT_KEY = "page";

const TablePagination: React.FC<ITablePagination> = (props) => {
  const { name, limit, count } = props;

  const router = useRouter();
  const searchParams = useSearchParams(); // Get current search params
  const [searchValue, setSearchValue] = useState<string>(searchParams.get(name ?? DEFAULT_KEY) || "1");

  const updateSearchParams = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (query) {
        params.set(name ?? DEFAULT_KEY, query); // Set the query parameter
      } else {
        params.delete(name ?? DEFAULT_KEY); // Remove the parameter if the query is empty
      }

      // Replace the URL without reloading the page
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams, name],
  );

  useEffect(() => {
    // Sync the input with the URL params when query param changes
    if (searchParams.get(name ?? DEFAULT_KEY) !== searchValue) {
      setSearchValue(searchParams.get(name ?? DEFAULT_KEY) || "1");
    }
  }, [searchParams, name]);

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setSearchValue(String(page));
    updateSearchParams(String(page));
  };

  const pageCount = React.useMemo(() => {
    const _limit = limit || 10;
    if (!count) return;
    return Math.ceil(count / _limit);
  }, [limit, count]);

  return <MuiPagination onChange={handleChange} page={Number(searchValue)} count={pageCount} />;
};

export default TablePagination;
