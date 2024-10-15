"use client";

import { archivedMangaAction, setMangaDangerAction, setMangaHideAction, setMangaSpicyAction } from "@/app/action/manga";
import { displaySnackbar } from "@/components/helper/notistack";
import { CSwal, swalActionProps } from "@/components/swal/CSwal";
import USER_ROUTE, { ROUTE_ID } from "@/constants/ROUTES";
import { MODEL } from "@/model/model";
import { IMangaTableSelect } from "@/utils/drizzle/schema";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { BiEdit, BiHide } from "react-icons/bi";
import { FaChampagneGlasses } from "react-icons/fa6";
import { GiSunglasses } from "react-icons/gi";
import { HiEyeSlash, HiTrash } from "react-icons/hi2";
import { MdHealthAndSafety } from "react-icons/md";

type IUseMangaActions = {
  manga: IMangaTableSelect;
  setIsLoading?: (bool: boolean) => void;
};

export const useMangaActions = (props: IUseMangaActions) => {
  const router = useRouter();
  const { manga, setIsLoading } = props;

  const [_isLoading, _setIsLoading] = useState(false);

  const setLoading = useCallback(
    (status: boolean) => {
      if (setIsLoading) setIsLoading(status);
    },
    [setIsLoading],
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

  return {
    onUpdate,
    onDelete,
    onHide,
    onSetDanger,
    onSetSpicy,
    isLoading: _isLoading,
  };
};

export const MANGA_ITEM_ACTION = {
  HIDE: {
    id: "hide",
    action1: { name: "Hide", icon: <HiEyeSlash fontSize={20} /> },
    action2: { name: "Unhide" },
    icon: <BiHide fontSize={20} />,
  },
  DANGER: {
    id: "danger",
    action1: { name: "Set Danger", icon: <AiFillSafetyCertificate fontSize={20} /> },
    action2: { name: "Unset Danger" },
    icon: <MdHealthAndSafety fontSize={20} />,
  },
  SPICY: {
    id: "spicy",
    action1: { name: "Set Spicy", icon: <GiSunglasses fontSize={20} /> },
    action2: { name: "Unset Spicy" },
    icon: <FaChampagneGlasses fontSize={20} />,
  },
  UPDATE: { id: "update", action1: { name: "Update", icon: <BiEdit fontSize={20} /> } },
  DELETE: { id: "delete", action1: { name: "Delete", icon: <HiTrash fontSize={20} /> } },
} as const;

export const MANGA_ITEM_ACTIONS = Object.values(MANGA_ITEM_ACTION);
