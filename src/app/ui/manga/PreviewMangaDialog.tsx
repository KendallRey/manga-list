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
import MangaUploadImage from "../MangaUploadImage";
import MuiBox from "@/components/box/Box";
import { useAppMediaQuery } from "@/components/hooks/useAppMediaQuery";

const PreviewMangaDialog = () => {
  const searchParams = useSearchParams();
  const preview = useAppSelector((state) => state.searchParamsSlice.preview);
  const { sm } = useAppMediaQuery();
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
    <MuiDialog title={""} open={Boolean(preview)} onClose={onClose} fullWidth fullScreen={!sm} maxWidth={"lg"}>
      {manga ? (
        <MuiBox className="flex flex-col gap-4">
          <MangaPageHeader manga={manga} />
          <div className="mx-auto w-full">
            <MangaUploadImage manga={manga} />
          </div>
        </MuiBox>
      ) : (
        <MangaPageHeaderSkeleton />
      )}
    </MuiDialog>
  );
};

export default PreviewMangaDialog;
