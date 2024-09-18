"use client";

import { archivedMangaAction, hideMangaAction, unhideMangaAction } from "@/app/action/manga";
import { displaySnackbar } from "@/components/helper/notistack";
import MuiIconButton from "@/components/icon-button/IconButton";
import MuiLink from "@/components/link/Link";
import MuiMenuItem from "@/components/menu-item/MenuItem";
import ActionMenu from "@/components/menu/ActionMenu";
import { CSwal, swalActionProps } from "@/components/swal/CSwal";
import { MuiTd, MuiTr } from "@/components/table/Table";
import USER_ROUTE from "@/constants/ROUTES";
import { IMangaTableSelect } from "@/utils/drizzle/schema";
import { Avatar } from "@mui/material";
import React, { useCallback, useState } from "react";
import { HiEye, HiTrash } from "react-icons/hi2";
import { BiHide } from "react-icons/bi";
import { useCallOnce } from "@/components/hooks/useCallOnce";
import { getSignedUrlClient } from "@/utils/supabase/helper/client-storage";
import { MODEL } from "@/model/model";

type IMangaListItem = {
  item: IMangaTableSelect;
};

const MangaListItem: React.FC<IMangaListItem> = (props) => {
  const { item } = props;

  const [loading, setLoading] = useState(false);

  // #region Delete Action

  const onDelete = useCallback(async () => {
    const { isConfirmed } = await CSwal(swalActionProps({ model: "Manga", name: item.name, type: "Delete" }));
    if (!isConfirmed) return;

    setLoading(true);
    const response = await archivedMangaAction(item.id);
    displaySnackbar({ status: response.status, name: response?.data?.name, action: "delete" });
    setLoading(false);
  }, [item]);

  // #endregion

  // #region Hide Action

  const onHide = useCallback(async () => {
    const { isConfirmed } = await CSwal(swalActionProps({ model: "Manga", name: item.name, type: "Hide" }));
    if (!isConfirmed) return;

    setLoading(true);
    const response = await hideMangaAction(item.id);
    displaySnackbar({ status: response.status, name: response?.data?.name, action: "hide", variant: "info" });
    setLoading(false);
  }, [item]);

  // #endregion

  // #region Unhide Action

  const onUnhide = useCallback(async () => {
    const { isConfirmed } = await CSwal(swalActionProps({ model: "Manga", name: item.name, type: "Unhide" }));
    if (!isConfirmed) return;

    setLoading(true);
    const response = await unhideMangaAction(item.id);
    displaySnackbar({ status: response.status, name: response?.data?.name, action: "unhide", variant: "info" });
    setLoading(false);
  }, [item]);

  // #endregion

  const [src, setSrc] = useState<string>();

  const getSignedUrl = useCallback(async () => {
    const response = await getSignedUrlClient(item[MODEL.MANGA.THUMBNAIL]);
    setSrc(response?.data?.signedUrl);
  }, [item]);

  useCallOnce(getSignedUrl);

  return (
    <>
      <MuiTr>
        <MuiTd>
          <Avatar src={src || ""} sizes="100px" alt={item.name} />
        </MuiTd>
        <MuiTd>{item.name}</MuiTd>
        <MuiTd>
          <div className="flex items-center">
            <MuiLink href={`${USER_ROUTE.MANGA_PAGE.href}/${item.id}`}>
              <MuiIconButton>
                <HiEye />
              </MuiIconButton>
            </MuiLink>
            <ActionMenu>
              {item.hide ? (
                <MuiMenuItem className="flex items-center gap-2 justify-between" onClick={onUnhide} disabled={loading}>
                  <BiHide fontSize={20} /> Unhide
                </MuiMenuItem>
              ) : (
                <MuiMenuItem className="flex items-center gap-2 justify-between" onClick={onHide} disabled={loading}>
                  <BiHide fontSize={20} /> Hide
                </MuiMenuItem>
              )}
              <MuiMenuItem
                className="flex items-center gap-2 justify-between text-red-500"
                onClick={onDelete}
                disabled={loading}
              >
                <HiTrash /> Delete
              </MuiMenuItem>
            </ActionMenu>
          </div>
        </MuiTd>
      </MuiTr>
    </>
  );
};

export default MangaListItem;
