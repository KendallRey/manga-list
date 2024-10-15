"use client";

import MuiAvatar from "@/components/avatar/Avatar";
import { MuiListItem, MuiListItemAvatar, MuiListItemText } from "@/components/list/List";
import MuiStack from "@/components/stack/Stack";
import USER_ROUTE, { ROUTE_ID } from "@/constants/ROUTES";
import { MODEL } from "@/model/model";
import { IMangaTableSelect } from "@/utils/drizzle/schema";
import { toBucketPublicMangaUrl } from "@/utils/supabase/helper/image";
import Link from "next/link";
import MangaTag from "./MangaTag";
import { useCallback } from "react";
import { useAppMediaQuery } from "@/components/hooks/useAppMediaQuery";
import MangaItemActions from "@/app/user/manga/ui/MangaItemActions";
import MuiIconButton from "@/components/icon-button/IconButton";
import { MANGA_ITEM_ACTION, useMangaActions } from "@/hooks/useMangaActions";
import { ButtonGroup } from "@mui/material";
import MuiButton from "@/components/button/Button";

type IMangaListItem = {
  manga: IMangaTableSelect;
};

export const MangaListItem: React.FC<IMangaListItem> = (props) => {
  const { manga } = props;

  const { sm } = useAppMediaQuery();
  const { onDelete, onHide, onSetDanger, onSetSpicy, onUpdate } = useMangaActions({ manga });

  const onClickThumbnail = useCallback(() => {}, [manga]);

  return (
    <MuiListItem className="border-b flex flex-col gap-2" secondaryAction={sm && <MangaItemActions manga={manga} />}>
      <MuiStack direction={!sm ? "column" : "row"} alignItems={"center"} width={"100%"}>
        <MuiListItemAvatar onClick={onClickThumbnail} className="cursor-pointer">
          <MuiAvatar
            variant="rounded"
            sx={{ width: sm ? 50 : 120, height: sm ? 50 : 160 }}
            src={toBucketPublicMangaUrl(manga[MODEL.MANGA.THUMBNAIL])}
          />
        </MuiListItemAvatar>
        <MuiListItemText
          primary={
            <Link href={USER_ROUTE.MANGA_PAGE.VIEW.href.replace(ROUTE_ID, manga[MODEL.MANGA.ID])}>
              {manga[MODEL.MANGA.NAME]}
            </Link>
          }
          disableTypography
          secondary={
            <MuiStack direction={"row"} gap={1}>
              <MangaTag manga={manga} />
            </MuiStack>
          }
        />
      </MuiStack>
      <ButtonGroup hidden={sm} variant="text">
        <MuiButton
          variant="text"
          className="border-1 rounded"
          color="primary"
          onClick={() => onHide(!manga[MODEL.MANGA.HIDE])}
        >
          {MANGA_ITEM_ACTION.HIDE.action1.icon}
        </MuiButton>
        <MuiButton
          variant="text"
          className="border-1 rounded"
          color="primary"
          onClick={() => onSetDanger(!manga[MODEL.MANGA.DANGER])}
        >
          {MANGA_ITEM_ACTION.DANGER.action1.icon}
        </MuiButton>
        <MuiButton variant="text" color="primary" onClick={() => onSetSpicy(!manga[MODEL.MANGA.SPICY])}>
          {MANGA_ITEM_ACTION.SPICY.action1.icon}
        </MuiButton>
        <MuiButton variant="text" color="primary" onClick={onUpdate}>
          {MANGA_ITEM_ACTION.UPDATE.action1.icon}
        </MuiButton>
        <MuiButton variant="text" color="error" onClick={onDelete}>
          {MANGA_ITEM_ACTION.DELETE.action1.icon}
        </MuiButton>
      </ButtonGroup>
    </MuiListItem>
  );
};
