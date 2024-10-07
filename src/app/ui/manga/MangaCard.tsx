import MuiCard, { IMuiCardProps } from "@/components/card/Card";
import MuiCardActions from "@/components/card/CardActions";
import MuiCardHeader from "@/components/card/CardHeader";
import MuiChip from "@/components/chip/Chip";
import MuiIconButton from "@/components/icon-button/IconButton";
import MuiStack from "@/components/stack/Stack";
import USER_ROUTE, { ROUTE_ID } from "@/constants/ROUTES";
import { MODEL } from "@/model/model";
import { IMangaTableSelect } from "@/utils/drizzle/schema";
import { toBucketPublicUrl } from "@/utils/supabase/helper/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaEye } from "react-icons/fa6";
import { HiPencilSquare } from "react-icons/hi2";

type IMangaCard = {
  manga: IMangaTableSelect;
} & IMuiCardProps;

const MangaCard: React.FC<IMangaCard> = (props) => {
  const { manga, className, ...otherProps } = props;

  const thumbnailImage = (
    manga[MODEL.MANGA.THUMBNAIL] ? toBucketPublicUrl(manga[MODEL.MANGA.THUMBNAIL]) : "/images/404.jpg"
  ) as string;

  return (
    <MuiCard className={`flex-grow ${className ?? ""}`} variant="outlined" {...otherProps}>
      <MuiCardHeader
        titleTypographyProps={{
          fontSize: 16,
          fontWeight: 550,
        }}
        title={manga[MODEL.MANGA.NAME]}
        subheader={manga.created_at?.toDateString()}
      />
      <Image src={thumbnailImage} width={320} height={420} alt={manga[MODEL.MANGA.NAME]} className="mx-auto" />
      <MuiStack gap={2} direction="row" margin={1}>
        {manga[MODEL.MANGA.HIDE] && <MuiChip label="Hidden" color="secondary" variant="outlined" />}
        {manga[MODEL.MANGA.DANGER] && <MuiChip label="Danger" color="error" />}
        {manga[MODEL.MANGA.SPICY] && <MuiChip label="Spicy" color="secondary" />}
      </MuiStack>
      <MuiCardActions disableSpacing>
        <MuiIconButton
          color="secondary"
          LinkComponent={Link}
          {...{ href: USER_ROUTE.MANGA_PAGE.VIEW.href.replace(ROUTE_ID, manga[MODEL.MANGA.ID]) }}
          aria-label="update"
        >
          <FaEye />
        </MuiIconButton>
        <MuiIconButton
          color="secondary"
          LinkComponent={Link}
          {...{ href: USER_ROUTE.MANGA_PAGE.UPDATE.href.replace(ROUTE_ID, manga[MODEL.MANGA.ID]) }}
          aria-label="view"
        >
          <HiPencilSquare />
        </MuiIconButton>
      </MuiCardActions>
    </MuiCard>
  );
};

export default MangaCard;
