"use client";

import { archivedMangaAction } from "@/app/action/manga";
import { customEnqueueSnackbar, NotifMessage } from "@/components/helper/notistack";
import MuiIconButton from "@/components/icon-button/IconButton";
import MuiLink from "@/components/link/Link";
import { CSwal } from "@/components/swal/CSwal";
import { MuiTd, MuiTr } from "@/components/table/Table";
import USER_ROUTE from "@/constants/ROUTES";
import { IMangaTableSelect } from "@/utils/drizzle/schema";
import { Avatar } from "@mui/material";
import React, { useCallback } from "react";
import { HiEye, HiTrash } from "react-icons/hi2";

type IMangaListItem = {
  item: IMangaTableSelect;
};

const MangaListItem: React.FC<IMangaListItem> = (props) => {
  const { item } = props;

  const onDelete = useCallback(async () => {
    const { isConfirmed } = await CSwal({
      icon: "warning",
      title: "Delete Manga?",
      html: `Delete <strong>${item.name}</strong> from the list..`,
      confirmButtonText: "Delete",
    });
    if (!isConfirmed) return;
    const response = await archivedMangaAction(item.id);
    if (!response.status)
      customEnqueueSnackbar({
        variant: "error",
        message: <NotifMessage action="delete" status="failed" />,
      });
    else
      customEnqueueSnackbar({
        variant: "success",
        message: <NotifMessage item={response.data.name} action="delete" />,
      });
  }, [item]);

  return (
    <>
      <MuiTr>
        <MuiTd>
          <Avatar />
        </MuiTd>
        <MuiTd>{item.name}</MuiTd>
        <MuiTd>
          <div className="flex items-center">
            <MuiLink href={`${USER_ROUTE.MANGA_PAGE.href}/${item.id}`}>
              <MuiIconButton>
                <HiEye />
              </MuiIconButton>
            </MuiLink>
            <MuiIconButton className="text-red-500" onClick={onDelete}>
              <HiTrash />
            </MuiIconButton>
          </div>
        </MuiTd>
      </MuiTr>
    </>
  );
};

export default MangaListItem;
