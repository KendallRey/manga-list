"use client";

import { archivedMangaAction, setMangaDangerAction, setMangaHideAction, setMangaSpicyAction } from "@/app/action/manga";
import { displaySnackbar } from "@/components/helper/notistack";
import MuiIconButton from "@/components/icon-button/IconButton";
import MuiLink from "@/components/link/Link";
import MuiMenuItem from "@/components/menu-item/MenuItem";
import ActionMenu from "@/components/menu/ActionMenu";
import { CSwal, swalActionProps } from "@/components/swal/CSwal";
import { MuiTd, MuiTr } from "@/components/table/Table";
import USER_ROUTE, { ROUTE_ID } from "@/constants/ROUTES";
import { IMangaTableSelect } from "@/utils/drizzle/schema";
import { Avatar } from "@mui/material";
import React, { useCallback, useState } from "react";
import { HiEye, HiEyeSlash, HiTrash } from "react-icons/hi2";
import { BiEdit, BiHide } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { toBucketPublicUrl } from "@/utils/supabase/helper/image";
import { MODEL } from "@/model/model";
import { GiSunglasses } from "react-icons/gi";
import { FaChampagneGlasses } from "react-icons/fa6";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { MdHealthAndSafety } from "react-icons/md";
import MuiTypography from "@/components/typography/Typograph";
import MuiChip from "@/components/chip/Chip";

type IMangaListItem = {
  item: IMangaTableSelect;
};

const MangaListItem: React.FC<IMangaListItem> = (props) => {
  const { item } = props;

  const router = useRouter();
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

  // #region Set Hide Action

  const onHide = useCallback(
    async (hide: boolean) => {
      const { isConfirmed } = await CSwal(
        swalActionProps({ model: "Manga", name: item.name, type: hide ? "Hide" : "Unhide" }),
      );
      if (!isConfirmed) return;

      setLoading(true);
      const response = await setMangaHideAction(item.id, hide);
      displaySnackbar({
        status: response.status,
        name: response?.data?.name,
        action: hide ? "hide" : "unhide",
        variant: "info",
      });
      setLoading(false);
    },
    [item],
  );

  // #endregion

  // #region Set Spicy Action

  const onSetSpicy = useCallback(
    async (isSpicy: boolean) => {
      const { isConfirmed } = await CSwal(
        swalActionProps({ model: "Manga", name: item.name, action: isSpicy ? "Set spicy" : "Unset spicy" }),
      );
      if (!isConfirmed) return;

      setLoading(true);
      const response = await setMangaSpicyAction(item.id, isSpicy);
      displaySnackbar({ status: response.status, name: response?.data?.name, action: "update" });
      setLoading(false);
    },
    [item],
  );

  // #endregion

  // #region Set Spicy Action

  const onSetDanger = useCallback(
    async (isSpicy: boolean) => {
      const { isConfirmed } = await CSwal(
        swalActionProps({ model: "Manga", name: item.name, action: isSpicy ? "Set danger" : "Unset danger" }),
      );
      if (!isConfirmed) return;

      setLoading(true);
      const response = await setMangaDangerAction(item.id, isSpicy);
      displaySnackbar({ status: response.status, name: response?.data?.name, action: "update" });
      setLoading(false);
    },
    [item],
  );

  // #endregion

  // #region Go to Update

  const onUpdate = useCallback(() => {
    router.push(USER_ROUTE.MANGA_PAGE.UPDATE.href.replace(ROUTE_ID, item.id));
  }, [router, item]);

  // #endregion

  return (
    <>
      <MuiTr>
        <MuiTd className="pt-3">
          <MuiLink href={`${USER_ROUTE.MANGA_PAGE.href}/${item.id}`}>
            <Avatar src={toBucketPublicUrl(item[MODEL.MANGA.THUMBNAIL], 40, 20)} alt={item.name} variant="rounded" />
          </MuiLink>
        </MuiTd>
        <MuiTd>
          <div className="flex items-center gap-2">
            {item[MODEL.MANGA.DANGER] && <MuiChip label="Danger" color="error" />}
            {item[MODEL.MANGA.SPICY] && <MuiChip label="Spicy" color="secondary" />}
            <MuiTypography variant="body2">{item.name}</MuiTypography>
          </div>
        </MuiTd>
        <MuiTd>
          <div className="flex items-center">
            <MuiLink href={`${USER_ROUTE.MANGA_PAGE.href}/${item.id}`}>
              <MuiIconButton>
                <HiEye />
              </MuiIconButton>
            </MuiLink>
            <ActionMenu>
              <MuiMenuItem
                className="flex items-center gap-4 justify-between"
                onClick={() => onHide(!item[MODEL.MANGA.HIDE])}
                disabled={loading}
              >
                {!item[MODEL.MANGA.HIDE] ? (
                  <>
                    <HiEyeSlash fontSize={20} /> Hide
                  </>
                ) : (
                  <>
                    <BiHide fontSize={20} /> Unhide
                  </>
                )}
              </MuiMenuItem>
              <MuiMenuItem
                className="flex items-center gap-4 justify-between"
                onClick={() => onSetDanger(!item[MODEL.MANGA.DANGER])}
                disabled={loading}
              >
                {!item[MODEL.MANGA.DANGER] ? (
                  <>
                    <AiFillSafetyCertificate fontSize={20} /> Set Danger
                  </>
                ) : (
                  <>
                    <MdHealthAndSafety fontSize={20} /> Unset Danger
                  </>
                )}
              </MuiMenuItem>
              <MuiMenuItem
                className="flex items-center gap-4 justify-between"
                onClick={() => onSetSpicy(!item[MODEL.MANGA.SPICY])}
                disabled={loading}
              >
                {!item[MODEL.MANGA.SPICY] ? (
                  <>
                    <GiSunglasses fontSize={20} /> Set Spicy
                  </>
                ) : (
                  <>
                    <FaChampagneGlasses fontSize={20} /> Unset Spicy
                  </>
                )}
              </MuiMenuItem>
              <MuiMenuItem className="flex items-center gap-4 justify-between" onClick={onUpdate} disabled={loading}>
                <BiEdit fontSize={20} /> Update
              </MuiMenuItem>
              <MuiMenuItem
                className="flex items-center gap-4 justify-between text-red-500"
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
