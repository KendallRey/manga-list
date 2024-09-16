import MuiIconButton from "@/components/icon-button/IconButton";
import MuiLink from "@/components/link/Link";
import { MuiTd, MuiTr } from "@/components/table/Table";
import USER_ROUTE from "@/constants/ROUTES";
import { IMangaTableSelect } from "@/utils/drizzle/schema";
import { Avatar } from "@mui/material";
import React from "react";
import { HiEye } from "react-icons/hi2";

type IMangaListItem = {
  item: IMangaTableSelect;
};

const MangaListItem: React.FC<IMangaListItem> = (props) => {
  const { item } = props;

  return (
    <MuiTr>
      <MuiTd>
        <Avatar />
      </MuiTd>
      <MuiTd>{item.name}</MuiTd>
      <MuiTd>
        <MuiLink href={`${USER_ROUTE.MANGA_PAGE.href}/${item.id}`}>
          <MuiIconButton>
            <HiEye />
          </MuiIconButton>
        </MuiLink>
      </MuiTd>
    </MuiTr>
  );
};

export default MangaListItem;
