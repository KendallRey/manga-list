"use client";

import MuiIconButton from "@/components/icon-button/IconButton";
import MuiLink from "@/components/link/Link";
import { MuiTd, MuiTr } from "@/components/table/Table";
import USER_ROUTE from "@/constants/ROUTES";
import { IMangaTableSelect } from "@/utils/drizzle/schema";
import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { HiEye } from "react-icons/hi2";
import { toBucketPublicUrl } from "@/utils/supabase/helper/image";
import { MODEL } from "@/model/model";
import MuiTypography from "@/components/typography/Typograph";
import MuiChip from "@/components/chip/Chip";
import MangaItemActions from "./MangaItemActions";

type IMangaListItem = {
  item: IMangaTableSelect;
};

const MangaListItem: React.FC<IMangaListItem> = (props) => {
  const { item } = props;

  const [loading, setLoading] = useState(false);

  return (
    <>
      <MuiTr>
        <MuiTd className="pt-3">
          <MuiLink href={`${USER_ROUTE.MANGA_PAGE.href}/${item.id}`}>
            <Avatar src={toBucketPublicUrl(item[MODEL.MANGA.THUMBNAIL], 40, 20)} alt={item.name} variant="rounded" />
          </MuiLink>
        </MuiTd>
        <MuiTd>
          <div className="flex items-center gap-2">
            {item[MODEL.MANGA.HIDE] && <MuiChip label="Hidden" color="secondary" variant="outlined" />}
            {item[MODEL.MANGA.DANGER] && <MuiChip label="Danger" color="error" />}
            {item[MODEL.MANGA.SPICY] && <MuiChip label="Spicy" color="secondary" />}
            <MuiTypography variant="body2">{item.name}</MuiTypography>
          </div>
        </MuiTd>
        <MuiTd>
          <div className="flex items-center">
            <MuiLink href={`${USER_ROUTE.MANGA_PAGE.href}/${item.id}`}>
              <MuiIconButton>
                <HiEye />
              </MuiIconButton>
            </MuiLink>
            <MangaItemActions manga={item} loading={loading} setLoading={setLoading} />
          </div>
        </MuiTd>
      </MuiTr>
    </>
  );
};

export default MangaListItem;
