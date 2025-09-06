import { MangaListItemSkeleton } from "@/app/ui/manga/MangaListItemSkeleton";
import MangaSearchAddSkeleton from "@/app/ui/manga/MangaSearchAddSkeleton";
import ComponentList from "@/components/helper-components/ComponentList";
import BreadcrumbSkeleton from "@/components/shared/BreadCrumbsSkeleton";
import CardContainer from "@/components/shared/Card";

const MangaPageLoading = () => {
  return (
    <>
      <BreadcrumbSkeleton />
      <CardContainer className="my-2">
        <MangaSearchAddSkeleton />
      </CardContainer>
      <CardContainer className="my-2">
        <div className="grid lg:grid-cols-2 gap-5">
          <ComponentList count={10} render={(i) => <MangaListItemSkeleton key={i} />} />
        </div>
      </CardContainer>
    </>
  );
};

export default MangaPageLoading;
