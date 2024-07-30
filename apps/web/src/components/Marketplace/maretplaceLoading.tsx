import { Skeleton } from "@radix-ui/themes";

export const MarketplaceLoading = () => {
  const initialArray = Array(10).fill(0);

  return (
    <>
      {initialArray.map((arr, index) => {
        return (
          <div className="border-primary-30 rounded-md" key={index}>
            <Skeleton className="h-[200px] w-full"></Skeleton>
            <div className="px-2 pt-3">
              <Skeleton className="font-semibold">124</Skeleton>
              <br />

              <Skeleton className="text-primary-50 mt-1">200 MINA</Skeleton>
            </div>
            <button className="w-full p-2 opacity-0">Connect Wallet</button>
          </div>
        );
      })}
    </>
  );
};
