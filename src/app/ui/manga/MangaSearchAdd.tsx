import Search from "@/components/custom/Search";
import AddMangaList from "../../user/manga/ui/AddMangaList";
import { GetUserMangas } from "@/app/api/manga/manga-api";
import { getSearchParams } from "@/app/api/helper/apiHelper";
import ErrorPage from "@/app/error/page";
import { MODEL } from "@/model/model";
import { toBucketPublicMangaUrl } from "@/utils/supabase/helper/image";
import USER_ROUTE, { ROUTE_ID } from "@/constants/ROUTES";
import HighlightText from "@/components/custom/HighlightText";
import Link from "next/link";
import Image from "next/image";

// Lucide icons
import { Eye, Pencil, ShieldAlert, Flame, EyeOff } from "lucide-react";
import { formatToCount } from "@/components/helper/component";
import Chip from "@/components/common/Chip";

type MangaSearchAddProps = {
  listId: ID;
  searchParams?: Record<string, any>;
};

const MangaSearchAdd: React.FC<MangaSearchAddProps> = async (props) => {
  const { listId, searchParams } = props;

  const { q } = getSearchParams(searchParams);

  const mangasResponse = await GetUserMangas({
    params: { q, name: "desc", limit: 50 },
    overrideParams: { hide: "all" },
    listId: String(listId),
    skip: !q,
  });

  if (!mangasResponse.status) {
    return <ErrorPage />;
  }

  return (
    <div className="flex flex-col">
      {/* Search + Add */}
      <div className="flex gap-2">
        <Search />
        <AddMangaList id={listId} name={q} count={mangasResponse.data.length} />
      </div>

      {/* Results Count */}
      <div className="flex gap-1 items-center text-sm text-gray-500 dark:text-gray-400">
        <span>{formatToCount(mangasResponse.data.length)}</span>
        <span className="font-semibold truncate max-w-[320px] md:max-w-[480px] lg:max-w-[720px]">
          {q}
        </span>
        <span>results <small>(first 50 results)</small></span>
      </div>

      {/* Manga List */}
      <ul className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
        {mangasResponse.data.map((manga) => (
          <li
            key={manga[MODEL.MANGA.ID]}
            className="flex items-center justify-between py-2"
          >
            {/* Thumbnail + Name */}
            <div className="flex items-center gap-3">
              <Link
                href={`${USER_ROUTE.MANGA_PAGE.href}/${manga[MODEL.MANGA.ID]}`}
              >
                <Image
                  src={ manga[MODEL.MANGA.THUMBNAIL] ? toBucketPublicMangaUrl(manga[MODEL.MANGA.THUMBNAIL], 40, 20)! : "/images/404.jpg"}
                  alt={manga[MODEL.MANGA.NAME] || "Manga"}
                  width={40}
                  height={56}
                  className="rounded-md min-w-15 min-h-21"
                />
              </Link>
              <div>
                <HighlightText
                  text={manga[MODEL.MANGA.NAME]}
                  subString={q ? String(q) : null}
                />
                <div className="flex gap-2 mt-1">
                  {manga[MODEL.MANGA.HIDE] && (
                    <Chip variant="outline" color="secondary" icon={<EyeOff size={14} />}>
                       Hidden
                    </Chip>
                  )}
                  {manga[MODEL.MANGA.DANGER] && (
                    <Chip variant="outline" color="danger" icon={<ShieldAlert size={14} />}>
                       Danger
                    </Chip>
                  )}
                  {manga[MODEL.MANGA.SPICY] && (
                    <Chip variant="outline" color="pink" icon={<Flame size={14} />}>
                       Spicy
                    </Chip>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 items-center">
              <Link
                href={USER_ROUTE.MANGA_PAGE.VIEW.href.replace(
                  ROUTE_ID,
                  manga[MODEL.MANGA.ID]
                )}
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                <Eye size={20} />
              </Link>
              <Link
                href={USER_ROUTE.MANGA_PAGE.UPDATE.href.replace(
                  ROUTE_ID,
                  manga[MODEL.MANGA.ID]
                )}
                className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400"
              >
                <Pencil size={20} />
              </Link>
              {/* <MangaItemActions manga={manga} hideUpdate /> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MangaSearchAdd;
