"use client";

import { addMangaAction } from "@/app/action/manga";
import { Button } from "@/components/common/Button";
import { customEnqueueSnackbar, NotifMessage } from "@/components/helper/notistack";
import { usePrompt } from "@/context/prompt-context";
import { closeSnackbar } from "notistack";
import React, { useCallback, useState } from "react";

type AddMangaListProps = {
  id: ID;
  name?: string | null;
  count?: number;
};

const AddMangaList: React.FC<AddMangaListProps> = (props) => {
  const { id, name, count } = props;

  const { ask } = usePrompt()

  const [isLoading, setIsLoading] = useState(false);

  const onAddManga = useCallback(async () => {
    if (count) {
      customEnqueueSnackbar({
        variant: "warning",
        message: "There are still some result/s.",
      });
      const confirmed = await ask({
        title: "Add Manga",
        message: "Are you sure you want to add this manga?",
        confirmText: "Yes, add it",
        cancelText: "Cancel",
      });
      if (!confirmed) return;
    }
    closeSnackbar();
    setIsLoading(true);
    const response = await addMangaAction({
      list_id: id,
      name: name?.toString().trim(),
    });
    if (!response.status)
      customEnqueueSnackbar({
        variant: "error",
        message: <NotifMessage action="create" status="failed" />,
      });
    else
      customEnqueueSnackbar({
        variant: "success",
        message: <NotifMessage item={response.data.name} action="create" />,
      });
    setIsLoading(false);
  }, [id, name, count]);

  return (
    <>
      <Button onClick={onAddManga} disabled={isLoading || !Boolean(name)}>
        Add
      </Button>
    </>
  );
};

export default AddMangaList;
