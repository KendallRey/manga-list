import ErrorPage from "@/app/error/page";
import MuiTable, { MuiHeadTr, MuiTableBody, MuiTableHead, MuiTd, MuiTh, MuiTr } from "@/components/table/Table";
import { Avatar } from "@mui/material";
import React from "react";
import { GetUserMangas } from "@/app/api/manga/manga-api";
import { IMangaListTableSelect } from "@/utils/drizzle/schema";
import MuiIconButton from "@/components/icon-button/IconButton";
import { HiEye } from "react-icons/hi2";

type IMangaList = {
  list: IMangaListTableSelect;
} & INextPage;

const MangaList: React.FC<IMangaList> = async (props) => {
  const { searchParams, list } = props;

  const mangasResponse = await GetUserMangas({ listId: list.id });
  if (!mangasResponse.status) {
    return <ErrorPage />;
  }
  return (
    <MuiTable colsWidth={["10%", "80%", "10%"]} size="small" stickyHeader containerProps={{ sx: { maxHeight: 500 } }}>
      <MuiTableHead>
        <MuiHeadTr>
          <MuiTh>Icon</MuiTh>
          <MuiTh>Title</MuiTh>
          <MuiTh>Action</MuiTh>
        </MuiHeadTr>
      </MuiTableHead>
      <MuiTableBody>
        {mangasResponse.data.map((manga) => (
          <MuiTr key={manga.id}>
            <MuiTd>
              <Avatar />
            </MuiTd>
            <MuiTd>{manga.name}</MuiTd>
            <MuiTd>
              <MuiIconButton>
                <HiEye />
              </MuiIconButton>
            </MuiTd>
          </MuiTr>
        ))}
      </MuiTableBody>
    </MuiTable>
  );
};

export default MangaList;
