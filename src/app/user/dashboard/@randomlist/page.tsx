import { getSearchParams } from "@/app/api/helper/apiHelper";
import { GetUserMangaList } from "@/app/api/manga-list/manga-list-api";
import { GetUserRandomMangas } from "@/app/api/manga/manga-api";
import MangaTag from "@/app/ui/manga/MangaTag";
import MangaTagSkeleton from "@/app/ui/manga/MangaTagSkeleton";
import MuiAvatar from "@/components/avatar/Avatar";
import MuiButton from "@/components/button/Button";
import MuiList, { MuiListItem, MuiListItemAvatar, MuiListItemButton, MuiListItemText } from "@/components/list/List";
import MuiPaper from "@/components/paper/Paper";
import MuiStack from "@/components/stack/Stack";
import MuiTypography from "@/components/typography/Typograph";
import USER_ROUTE, { ROUTE_ID } from "@/constants/ROUTES";
import { MODEL } from "@/model/model";
import { toBucketPublicUrl } from "@/utils/supabase/helper/image";
import Link from "next/link";
import React from "react";

const DashboardRandomList: React.FC<INextPage> = async (props) => {
  const { searchParams } = props;

  const mangaListResponse = await GetUserMangaList({});

  if (!mangaListResponse.status) {
    return <MuiPaper></MuiPaper>;
  }
  if (!mangaListResponse.data.length) {
    return <MuiPaper></MuiPaper>;
  }

  const mangaList = mangaListResponse.data[0];

  const { q } = getSearchParams(searchParams);

  const mangasResponse = await GetUserRandomMangas({
    params: { limit: 10, q },
    listId: mangaList.id,
  });

  if (!mangasResponse.status) {
    return <MuiPaper></MuiPaper>;
  }

  return (
    <MuiPaper className="flex-grow flex flex-col min-h-[240px] gap-6 p-4" elevation={2} color="primary">
      <MuiTypography fontSize={24}>Random List</MuiTypography>
      <MuiButton>Randomize</MuiButton>
      <MuiList>
        {mangasResponse.data.map((manga) => (
          <MuiListItem key={manga[MODEL.MANGA.ID]} className="border-b">
            <MuiListItemAvatar>
              <Link href={USER_ROUTE.MANGA_PAGE.VIEW.href.replace(ROUTE_ID, manga[MODEL.MANGA.ID])}>
                <MuiAvatar sx={{ width: 50, height: 50 }} src={toBucketPublicUrl(manga[MODEL.MANGA.THUMBNAIL])} />
              </Link>
            </MuiListItemAvatar>
            <MuiListItemText
              primary={manga[MODEL.MANGA.NAME]}
              secondary={
                <MuiStack direction={"row"} gap={1}>
                  <MangaTag manga={manga} />
                </MuiStack>
              }
            />
          </MuiListItem>
        ))}
      </MuiList>
    </MuiPaper>
  );
};

export default DashboardRandomList;
