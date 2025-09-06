import ComponentList from "@/components/helper-components/ComponentList";
import { Skeleton } from "@/components/common/Skeleton";
import MangaImageSkeleton from "./ui/MangaImageSkeleton";

const ImagesLoading = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 mb-2">
        <Skeleton className="h-4 w-[90px]" />
        <Skeleton className="h-[51px] flex-grow rounded-md" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
        <ComponentList count={20} render={(i) => <MangaImageSkeleton key={i} />} />
      </div>
    </div>
  );
};

export default ImagesLoading;
