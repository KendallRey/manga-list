"use client";

import { archivedMangaAction, setMangaDangerAction, setMangaHideAction, setMangaSpicyAction } from "@/app/action/manga";
import { displaySnackbar } from "@/components/helper/notistack";
import MuiMenuItem from "@/components/menu-item/MenuItem";
import ActionMenu from "@/components/menu/ActionMenu";
import { CSwal, swalActionProps } from "@/components/swal/CSwal";
import USER_ROUTE, { ROUTE_ID } from "@/constants/ROUTES";
import { MODEL } from "@/model/model";
import { IMangaTableSelect } from "@/utils/drizzle/schema";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { BiEdit, BiHide } from "react-icons/bi";
import { FaChampagneGlasses } from "react-icons/fa6";
import { GiSunglasses } from "react-icons/gi";
import { HiEyeSlash, HiTrash } from "react-icons/hi2";
import { MdHealthAndSafety } from "react-icons/md";

type IMangaItemActions = {
  manga: IMangaTableSelect;
  loading?: boolean;
  setLoading?: (state: boolean) => void;
  hideHidden?: boolean;
  hideDanger?: boolean;
  hideUpdate?: boolean;
  hideDelete?: boolean;
  hideSpicy?: boolean;
};

const MangaItemActions: React.FC<IMangaItemActions> = (props) => {
  const { manga, setLoading: _setLoading, loading, hideDanger, hideHidden, hideSpicy, hideUpdate, hideDelete } = props;

  const router = useRouter();

  const setLoading = useCallback(
    (status: boolean) => {
      if (_setLoading) _setLoading(status);
    },
    [_setLoading],
  );

  // #region Delete Action

  const onDelete = useCallback(async () => {
    const { isConfirmed } = await CSwal(
      swalActionProps({ model: "Manga", name: manga[MODEL.MANGA.NAME], type: "Delete" }),
    );
    if (!isConfirmed) return;

    setLoading(true);
    const response = await archivedMangaAction(manga[MODEL.MANGA.ID]);
    displaySnackbar({ status: response.status, name: response?.data?.name, action: "delete" });
    setLoading(false);
  }, [manga, setLoading]);

  // #endregion

  // #region Set Hide Action

  const onHide = useCallback(
    async (hide: boolean) => {
      const { isConfirmed } = await CSwal(
        swalActionProps({ model: "Manga", name: manga[MODEL.MANGA.NAME], type: hide ? "Hide" : "Unhide" }),
      );
      if (!isConfirmed) return;

      setLoading(true);
      const response = await setMangaHideAction(manga[MODEL.MANGA.ID], hide);
      displaySnackbar({
        status: response.status,
        name: response?.data?.name,
        action: hide ? "hide" : "unhide",
        variant: "info",
      });
      setLoading(false);
    },
    [manga, setLoading],
  );

  // #endregion

  // #region Set Spicy Action

  const onSetSpicy = useCallback(
    async (isSpicy: boolean) => {
      const { isConfirmed } = await CSwal(
        swalActionProps({
          model: "Manga",
          name: manga[MODEL.MANGA.NAME],
          action: isSpicy ? "Set spicy" : "Unset spicy",
        }),
      );
      if (!isConfirmed) return;

      setLoading(true);
      const response = await setMangaSpicyAction(manga.id, isSpicy);
      displaySnackbar({ status: response.status, name: response?.data?.name, action: "update" });
      setLoading(false);
    },
    [manga, setLoading],
  );

  // #endregion

  // #region Set Spicy Action

  const onSetDanger = useCallback(
    async (isSpicy: boolean) => {
      const { isConfirmed } = await CSwal(
        swalActionProps({
          model: "Manga",
          name: manga[MODEL.MANGA.NAME],
          action: isSpicy ? "Set danger" : "Unset danger",
        }),
      );
      if (!isConfirmed) return;

      setLoading(true);
      const response = await setMangaDangerAction(manga.id, isSpicy);
      displaySnackbar({ status: response.status, name: response?.data?.name, action: "update" });
      setLoading(false);
    },
    [manga, setLoading],
  );

  // #endregion

  // #region Go to Update

  const onUpdate = useCallback(() => {
    router.push(USER_ROUTE.MANGA_PAGE.UPDATE.href.replace(ROUTE_ID, manga[MODEL.MANGA.ID]));
  }, [router, manga]);

  // #endregion

  return (
    <>
      <ActionMenu>
        <MuiMenuItem hidden={hideHidden} onClick={() => onHide(!manga[MODEL.MANGA.HIDE])} disabled={loading}>
          {!manga[MODEL.MANGA.HIDE] ? (
            <>
              <HiEyeSlash fontSize={20} /> Hide
            </>
          ) : (
            <>
              <BiHide fontSize={20} /> Unhide
            </>
          )}
        </MuiMenuItem>
        <MuiMenuItem hidden={hideDanger} onClick={() => onSetDanger(!manga[MODEL.MANGA.DANGER])} disabled={loading}>
          {!manga[MODEL.MANGA.DANGER] ? (
            <>
              <AiFillSafetyCertificate fontSize={20} /> Set Danger
            </>
          ) : (
            <>
              <MdHealthAndSafety fontSize={20} /> Unset Danger
            </>
          )}
        </MuiMenuItem>
        <MuiMenuItem hidden={hideSpicy} onClick={() => onSetSpicy(!manga[MODEL.MANGA.SPICY])} disabled={loading}>
          {!manga[MODEL.MANGA.SPICY] ? (
            <>
              <GiSunglasses fontSize={20} /> Set Spicy
            </>
          ) : (
            <>
              <FaChampagneGlasses fontSize={20} /> Unset Spicy
            </>
          )}
        </MuiMenuItem>
        <MuiMenuItem hidden={hideUpdate} onClick={onUpdate} disabled={loading}>
          <BiEdit fontSize={20} /> Update
        </MuiMenuItem>
        <MuiMenuItem hidden={hideDelete} className="text-red-500" onClick={onDelete} disabled={loading}>
          <HiTrash /> Delete
        </MuiMenuItem>
      </ActionMenu>
    </>
  );
};

export default MangaItemActions;
