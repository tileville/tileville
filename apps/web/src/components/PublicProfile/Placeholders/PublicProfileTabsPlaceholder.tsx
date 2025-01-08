import { Skeleton } from "@radix-ui/themes";

export const PublicProfileTabsPlaceholder = () => {
  return (
    <div className="mt-8">
      <div className="grid max-w-[574px] grid-cols-5 gap-4">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="border-primary-30 group/item listItem fade-slide-in relative min-h-[210px] cursor-pointer rounded-md transition-colors">
          <Skeleton className="h-max min-h-[180px] w-full" />
          <div className="p-3">
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
};
