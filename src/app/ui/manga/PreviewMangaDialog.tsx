"use client";

import API from "@/app/api/API";
import { GetUserManga } from "@/app/api/manga/manga-api";
import MuiDialog from "@/components/dialog/Dialog";
import { IMangaTableSelect } from "@/utils/drizzle/schema";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import MangaPageHeaderSkeleton from "../MangaPageHeaderSkeleton";
import MangaPageHeader from "../MangaPageHeader";
import { useAppDispatch, useAppSelector } from "@/redux/services/hooks";
import { clearSearchParamsPreview, setSearchParamsPreview } from "@/redux/features/params/searchParamsSlice";
import { useCallOnce } from "@/components/hooks/useCallOnce";

const PreviewMangaDialog = () => {
  const searchParams = useSearchParams();
  const preview = useAppSelector((state) => state.searchParamsSlice.preview);
  const dispatch = useAppDispatch();

  const loadPreviewSlice = useCallback(() => {
    const previewId = searchParams.get(API.PARAMS.KEYS.PREVIEW);
    if (previewId) dispatch(setSearchParamsPreview(previewId));
    else dispatch(clearSearchParamsPreview());
  }, [dispatch, searchParams]);

  useCallOnce(loadPreviewSlice);

  const [manga, setManga] = useState<IMangaTableSelect>();

  const onClose = useCallback(() => {
    dispatch(clearSearchParamsPreview());
  }, [dispatch]);

  const getManga = useCallback(async () => {
    if (!preview) {
      setManga(undefined);
      return;
    }
    const manga = await GetUserManga({ id: preview });
    setManga(manga.data ?? undefined);
  }, [preview]);

  useEffect(() => {
    getManga();
  }, [getManga]);

  return (
    <MuiDialog title={""} open={Boolean(preview)} onClose={onClose}>
      {manga ? (
        <>
          <MangaPageHeader manga={manga} />
        </>
      ) : (
        <MangaPageHeaderSkeleton />
      )}
    </MuiDialog>
  );
};

export default PreviewMangaDialog;
