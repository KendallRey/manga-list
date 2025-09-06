import { getSearchParams } from "@/app/api/helper/apiHelper";
import { GetMangaList } from "@/app/api/manga/manga-api";
import ErrorPage from "@/app/error/page";
import MangaImageList from "./ui/MangaImageList";
import Search from "@/components/custom/Search";

const MangaImagesPage: React.FC<NextPage> = async (props) => {
  const { searchParams } = props;
  const _searchParams = await searchParams;

  const { q, limit, ...params } = getSearchParams({ limit: 20, ..._searchParams });
  const mangasResponse = await GetMangaList({
    defaultParams: {},
    params: { limit: limit, q, ...params },
  });

  if (!mangasResponse.status) {
    return <ErrorPage />;
  }

  const { results, count } = mangasResponse.data;

  return (
    <div className="flex flex-col gap-4">
      <Search label="Search" />
      <MangaImageList mangas={results} canLoadMore={results.length < count} />
    </div>
  );
};

export default MangaImagesPage;
