import { Skeleton } from "@radix-ui/themes";

const INITIAL_ARRAY = Array(10).fill(0);
export const MarketplaceLoading = () => {
  return (
    <>
      {INITIAL_ARRAY.map((arr, index) => {
        return (
          <div className="border-primary-30 rounded-md" key={index}>
            <Skeleton className="aspect-[852/845] h-auto w-full"></Skeleton>

            <div className="px-2 py-3">
              <Skeleton className="font-semibold">124</Skeleton>
              <br />

              <Skeleton className="text-primary-50 mt-1">200 MINA</Skeleton>
            </div>
          </div>
        );
      })}
    </>
  );
};
