"use client";

import { getOrderingParams, getSearchParams } from "@/app/api/helper/apiHelper";
import { MuiTableHead, MuiHeadTr, MuiTh, MuiSortTh } from "@/components/table/Table";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useMemo } from "react";

const MangaListHead = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { ordering, key, order } = useMemo(() => getOrderingParams(searchParams), [searchParams]);

  const onClick = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (name !== key && key) params.delete(key);
      params.set(name, order === "desc" ? "asc" : "desc");
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams, router, order, key],
  );

  const onCancel = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams, router],
  );

  return (
    <MuiTableHead>
      <MuiHeadTr>
        <MuiTh>Icon</MuiTh>
        <MuiSortTh name={"name"} onClick={() => onClick("name")} onCancel={() => onCancel("name")} ordering={ordering}>
          Title
        </MuiSortTh>
        <MuiTh>Action</MuiTh>
      </MuiHeadTr>
    </MuiTableHead>
  );
};

export default MangaListHead;
