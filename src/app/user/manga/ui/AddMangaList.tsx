"use client";

import { addMangaAction } from "@/app/action/manga";
import MuiButton from "@/components/button/Button";
import { customEnqueueSnackbar, NotifMessage } from "@/components/helper/notistack";
import React, { useCallback, useState } from "react";

type IAddMangaList = {
  id: ID;
  name?: string | null;
};

const AddMangaList: React.FC<IAddMangaList> = (props) => {
  const { id, name } = props;

  const [isLoading, setIsLoading] = useState(false);

  const onAddManga = useCallback(async () => {
    setIsLoading(true);
    const response = await addMangaAction({
      list_id: id,
      name: name,
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
  }, [id, name]);

  return (
    <>
      <MuiButton onClick={onAddManga} disabled={isLoading}>
        Add
      </MuiButton>
    </>
  );
};

export default AddMangaList;
