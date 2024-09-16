import MuiIconButton from "@/components/icon-button/IconButton";
import { MuiTd, MuiTr } from "@/components/table/Table";
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
        <MuiIconButton>
          <HiEye />
        </MuiIconButton>
      </MuiTd>
    </MuiTr>
  );
};

export default MangaListItem;
