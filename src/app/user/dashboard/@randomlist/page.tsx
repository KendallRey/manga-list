import { GetUserMangaList } from "@/app/api/manga-list/manga-list-api";
import { GetUserRandomMangaList } from "@/app/api/manga/manga-api";
import MangaTag from "@/app/ui/manga/MangaTag";
import MuiAvatar from "@/components/avatar/Avatar";
import MuiList, { MuiListItem, MuiListItemAvatar, MuiListItemText } from "@/components/list/List";
import MuiPaper from "@/components/paper/Paper";
import MuiStack from "@/components/stack/Stack";
import MuiTypography from "@/components/typography/Typograph";
import USER_ROUTE, { ROUTE_ID } from "@/constants/ROUTES";
import { MODEL } from "@/model/model";
import { toBucketPublicMangaUrl } from "@/utils/supabase/helper/image";
import Link from "next/link";
import React from "react";
import CreateMangaList from "../../../ui/manga/CreateMangaList";
import ListAction from "./ListAction";
import { toSearchParams } from "@/app/api/helper/apiHelper";
import API from "@/app/api/API";

const DashboardRandomList: React.FC<INextPage> = async (props) => {
  const { searchParams } = props;
  const userMangaListResponse = await GetUserMangaList({});

  if (!userMangaListResponse.status) {
    return <MuiPaper></MuiPaper>;
  }
  if (!userMangaListResponse.data.length) {
    return <CreateMangaList />;
  }

  const userMangaList = userMangaListResponse.data[0];

  const params = toSearchParams(searchParams);
  const actionParams = params.get(API.PARAMS.KEYS.ACTION) ?? null;

  const ids = actionParams?.split(",").map((item) => Number(item));

  const mangaListResponse = await GetUserRandomMangaList({
    params: { limit: 10 },
    listId: userMangaList.id,
    indexes: ids,
  });

  if (!mangaListResponse.status) {
    return <MuiPaper></MuiPaper>;
  }

  return (
    <MuiPaper className="flex-grow flex flex-col min-h-[240px] gap-6 p-4" elevation={2} color="primary">
      <MuiTypography fontSize={24}>Random List</MuiTypography>
      <ListAction />
      <MuiList>
        {mangaListResponse.data.results.map((manga) => (
          <MuiListItem key={manga[MODEL.MANGA.ID]} className="border-b">
            <MuiListItemAvatar>
              <Link href={USER_ROUTE.MANGA_PAGE.VIEW.href.replace(ROUTE_ID, manga[MODEL.MANGA.ID])}>
                <MuiAvatar
                  variant="rounded"
                  sx={{ width: 50, height: 50 }}
                  src={toBucketPublicMangaUrl(manga[MODEL.MANGA.THUMBNAIL])}
                />
              </Link>
            </MuiListItemAvatar>
            <MuiListItemText
              primary={manga[MODEL.MANGA.NAME]}
              disableTypography
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
