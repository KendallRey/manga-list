"use client";

import API from "@/app/api/API";
import MuiDialog from "@/components/dialog/Dialog";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useMemo } from "react";

const PreviewMangaDialog = () => {
  const searchParams = useSearchParams();

  const previewId = useMemo(() => searchParams.get(API.PARAMS.KEYS.PREVIEW), [searchParams]);

  const onClose = useCallback(() => {}, [previewId, searchParams]);

  return (
    <MuiDialog title="Sage" open={Boolean(previewId)} onClose={onClose}>
      PreviewMangaDialog
    </MuiDialog>
  );
};

export default PreviewMangaDialog;
