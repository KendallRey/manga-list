import MuiImageList, { MuiImageListItem, MuiImageListItemBar } from "@/components/image/Image";
import React from "react";
import { GetMangaImages } from "../api/manga-image/manga-image-api";
import ErrorPage from "../error/page";
import { toBucketPublicUrl } from "@/utils/supabase/helper/image";
import { HiPhoto } from "react-icons/hi2";
import MuiIconButton from "@/components/icon-button/IconButton";

type IMangaImageList = {
  mangaId: string;
  viewAction?: boolean;
};

const MangaImageList: React.FC<IMangaImageList> = async (props) => {
  const { mangaId, viewAction } = props;

  const images = await GetMangaImages({ mangaId: mangaId });

  if (!images.status) return <ErrorPage />;

  return (
    <MuiImageList sx={{ height: 600 }} cols={5} rowHeight={320}>
      {images.data.map((item) => (
        <MuiImageListItem key={item.id}>
          <img
            srcSet={`${toBucketPublicUrl(item.path)}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${toBucketPublicUrl(item.path)}?w=164&h=164&fit=crop&auto=format`}
            alt={item.path}
            loading="lazy"
          />
          {viewAction && (
            <MuiImageListItemBar
              title=""
              position="below"
              subtitle="set as cover"
              actionIcon={
                <MuiIconButton color="secondary">
                  <HiPhoto />
                </MuiIconButton>
              }
            />
          )}
        </MuiImageListItem>
      ))}
    </MuiImageList>
  );
};

export default MangaImageList;
