"use client";

import { toSearchParams } from "@/app/api/helper/apiHelper";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useState, useTransition } from "react";
import { getRandomIndexes } from "@/components/helper/array";
import API from "@/app/api/API";
import { GetUserMangaCount } from "@/app/api/manga/manga-api";
import { GetUserMangaList } from "@/app/api/manga-list/manga-list-api";
import { useCallOnce } from "@/components/hooks/useCallOnce";
import { Button } from "@/components/common/Button";

const ListAction = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const [count, setCount] = useState<number>();

  const onRandomize = () => {
    startTransition(async () => {
      if (!count) return;
      const ids = getRandomIndexes(count, 10);
      const params = toSearchParams(searchParams);
      params.set(API.PARAMS.KEYS.ACTION, ids.join(","));
      router.replace(`?${params.toString()}`, { scroll: false });
    });
  };

  const getMangaCount = useCallback(async () => {
    const userMangaListResponse = await GetUserMangaList({});
    if (!userMangaListResponse.status) return;
    if (!userMangaListResponse.data.length) return;
    const _userMangaList = userMangaListResponse.data[0];
    const countResponse = await GetUserMangaCount({ listId: _userMangaList.id });
    setCount(countResponse.data ?? undefined);
  }, []);

  useCallOnce(getMangaCount);

  return (
    <>
      <Button onClick={onRandomize} disabled={!count} loading={isPending}>
        Randomize ({count})
      </Button>
    </>
  );
};

export default ListAction;
