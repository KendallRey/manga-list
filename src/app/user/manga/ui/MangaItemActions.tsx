"use client";

import MuiMenuItem from "@/components/menu-item/MenuItem";
import ActionMenu from "@/components/menu/ActionMenu";
import { useMangaActions } from "@/hooks/useMangaActions";
import { MODEL } from "@/model/model";
import { IMangaTableSelect } from "@/utils/drizzle/schema";
import React from "react";
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

  const { onHide, onDelete, onSetDanger, onSetSpicy, onUpdate } = useMangaActions({ manga });

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
          <HiTrash fontSize={20} /> Delete
        </MuiMenuItem>
      </ActionMenu>
    </>
  );
};

export default MangaItemActions;
