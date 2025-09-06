type MangaImageSkeletonProps = {
  viewAction?: boolean;
};

const MangaImageSkeleton: React.FC<MangaImageSkeletonProps> = ({ viewAction = true }) => {
  return (
    <div className="relative overflow-hidden rounded-xl h-[320px] shadow-md bg-gray-200 dark:bg-gray-800 animate-pulse">
      {/* Thumbnail skeleton */}
      <div className="w-full bg-gray-300 dark:bg-gray-700" />

      {viewAction && (
        <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/60 to-transparent">
          {/* Title skeleton */}
          <div className="h-4 w-2/3 rounded bg-gray-400 dark:bg-gray-600 mb-2" />

          {/* Chips skeleton */}
          <div className="flex gap-2">
            <div className="h-5 w-12 rounded-full bg-gray-400 dark:bg-gray-600" />
            <div className="h-5 w-14 rounded-full bg-gray-400 dark:bg-gray-600" />
            <div className="h-5 w-10 rounded-full bg-gray-400 dark:bg-gray-600" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MangaImageSkeleton;
