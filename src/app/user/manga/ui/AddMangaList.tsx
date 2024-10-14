"use client";

import { addMangaAction } from "@/app/action/manga";
import MuiButton from "@/components/button/Button";
import { customEnqueueSnackbar, NotifMessage } from "@/components/helper/notistack";
import { CSwal, htmlAskAction } from "@/components/swal/CSwal";
import { closeSnackbar } from "notistack";
import React, { useCallback, useState } from "react";

type IAddMangaList = {
  id: ID;
  name?: string | null;
  count?: number;
};

const AddMangaList: React.FC<IAddMangaList> = (props) => {
  const { id, name, count } = props;

  const [isLoading, setIsLoading] = useState(false);

  const onAddManga = useCallback(async () => {
    if (count) {
      customEnqueueSnackbar({
        variant: "warning",
        message: "There are still some result/s.",
      });
      const { isConfirmed } = await CSwal({
        icon: "question",
        title: "Add Manga",
        html: htmlAskAction({ type: "Add", name: name?.toString().trim() }),
      });
      if (!isConfirmed) return;
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
      <MuiButton onClick={onAddManga} disabled={isLoading || !Boolean(name)}>
        Add
      </MuiButton>
    </>
  );
};

export default AddMangaList;
