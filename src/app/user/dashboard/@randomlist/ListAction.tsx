"use client";

import { toSearchParams } from "@/app/api/helper/apiHelper";
import MuiButton from "@/components/button/Button";
import { nanoid } from "@reduxjs/toolkit";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

const ListAction = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onRandomize = useCallback(() => {
    const params = toSearchParams(searchParams);
    params.set("action", nanoid());
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [searchParams, router]);

  return (
    <>
      <MuiButton onClick={onRandomize}>Randomize</MuiButton>
    </>
  );
};

export default ListAction;
