import Search from "@/components/custom/Search";
import MuiLink from "@/components/link/Link";
import MuiList, { MuiListItem, MuiListItemIcon, MuiListItemText } from "@/components/list/List";
import MuiTypography from "@/components/typography/Typograph";
import USER_ROUTE, { ROUTE_ID } from "@/constants/ROUTES";
import { MODEL } from "@/model/model";
import { toBucketPublicUrl } from "@/utils/supabase/helper/image";
import { Avatar } from "@mui/material";
import React from "react";
import { BiEdit } from "react-icons/bi";
import AddMangaList from "./AddMangaList";
import { GetUserMangas } from "@/app/api/manga/manga-api";
import { getSearchParams } from "@/app/api/helper/apiHelper";
import ErrorPage from "@/app/error/page";
import { HiEye } from "react-icons/hi2";
import MuiChip from "@/components/chip/Chip";
import HighlightText from "@/components/custom/HighlightText";

type IMangaPageHeader = {
  listId: ID;
  searchParams?: Record<string, any>;
};

const MangaPageHeader: React.FC<IMangaPageHeader> = async (props) => {
  const { listId, searchParams } = props;

  const { q } = getSearchParams(searchParams);

  const mangasResponse = await GetUserMangas({
    params: { q, name: "desc" },
    overrideParams: { hide: "all" },
    listId: String(listId),
    skip: !q,
  });

  if (!mangasResponse.status) {
    return <ErrorPage />;
  }

  return (
    <>
      <div className="flex gap-2">
        <Search />
        <AddMangaList id={listId} name={q} count={mangasResponse.data.length} />
      </div>
      <MuiTypography variant="caption">{mangasResponse.data.length} results</MuiTypography>
      <MuiList className="flex flex-col gap-1">
        {mangasResponse.data.map((manga) => (
          <MuiListItem
            key={manga[MODEL.MANGA.ID]}
            className="border-b"
            secondaryAction={
              <div className="flex gap-2 items-center">
                <MuiLink href={USER_ROUTE.MANGA_PAGE.VIEW.href.replace(ROUTE_ID, manga[MODEL.MANGA.ID])}>
                  <HiEye fontSize={24} />
                </MuiLink>
                <MuiLink href={USER_ROUTE.MANGA_PAGE.UPDATE.href.replace(ROUTE_ID, manga[MODEL.MANGA.ID])}>
                  <BiEdit fontSize={24} />
                </MuiLink>
              </div>
            }
          >
            <MuiListItemIcon>
              <MuiLink href={`${USER_ROUTE.MANGA_PAGE.href}/${manga[MODEL.MANGA.ID]}`}>
                <Avatar
                  src={toBucketPublicUrl(manga[MODEL.MANGA.THUMBNAIL], 40, 20)}
                  alt={manga.name}
                  variant="rounded"
                />
              </MuiLink>
            </MuiListItemIcon>
            <MuiListItemText
              className="pr-12"
              secondary={
                <div className="flex gap-2">
                  {manga[MODEL.MANGA.HIDE] && <MuiChip label="Hidden" color="secondary" variant="outlined" />}
                  {manga[MODEL.MANGA.DANGER] && <MuiChip label="Danger" color="error" />}
                  {manga[MODEL.MANGA.SPICY] && <MuiChip label="Spicy" color="secondary" />}
                </div>
              }
              disableTypography
            >
              <HighlightText text={manga[MODEL.MANGA.NAME]} subString={q ? String(q) : null} />
            </MuiListItemText>
          </MuiListItem>
        ))}
      </MuiList>
    </>
  );
};

export default MangaPageHeader;
