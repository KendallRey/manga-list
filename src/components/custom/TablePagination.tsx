"use client";

import React, { FormEvent, useCallback, useEffect, useState } from "react";
import MuiPagination from "../pagination/Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import API from "@/app/api/API";
import MuiTypography from "../typography/Typograph";
import MuiIconButton from "../icon-button/IconButton";
import { parseToPage } from "../helper/component";
import { useCallOnce } from "../hooks/useCallOnce";

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
    (query: string | number, overrideName?: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (query) {
        params.set(overrideName || name || DEFAULT_KEY, String(query)); // Set the query parameter
      } else {
        params.delete(overrideName || name || DEFAULT_KEY); // Remove the parameter if the query is empty
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

  const syncPage = useCallback(() => {
    const page = parseToPage(searchParams.get("page"), 1000);
    setPage(page);
  }, [searchParams]);

  useCallOnce(syncPage);

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setSearchValue(String(page));
    updateSearchParams(String(page));
  };

  const pageCount = React.useMemo(() => {
    const _limit = limit || API.PARAMS.DEFAULT.LIMIT;
    if (!count) return;
    return Math.ceil(count / _limit);
  }, [limit, count]);

  const [page, setPage] = useState(1);

  const onChangePage = useCallback(
    (e: RCE<HTMLInputElement>) => {
      const { value } = e.target;
      const page = parseToPage(value, pageCount ?? 1000);
      setPage(page);
    },
    [setPage, pageCount],
  );

  const onSubmitGotoPage = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      updateSearchParams(page, "page");
    },
    [page, updateSearchParams],
  );

  return (
    <div className="flex items-center gap-2">
      <MuiPagination onChange={handleChange} page={Number(searchValue)} count={pageCount} />
      <MuiTypography>Go to page:</MuiTypography>
      <form onSubmit={onSubmitGotoPage}>
        <input
          className="border border-1 px-2 border-gray-400 w-[100px] text-center rounded"
          onChange={onChangePage}
          value={page}
          min={1}
          max={1000}
          maxLength={3}
          type="number"
        />
        <MuiIconButton size="small" color="primary" type="submit">
          Go
        </MuiIconButton>
      </form>
    </div>
  );
};

export default TablePagination;
