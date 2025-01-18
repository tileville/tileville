import { Skeleton } from "@radix-ui/themes";

const INITIAL_ARRAY = Array(10).fill(0);

export const ChallengesListSkeleton = () => {
  return (
    <>
      {INITIAL_ARRAY.map((arr, index) => {
        return (
          <div
            className="grid w-full cursor-pointer grid-cols-12 gap-4 rounded-[10px] border border-[#76993E] p-4"
            key={`challenge skeletobn ${index}`}
          >
            <div className="col-span-1">
              <Skeleton>Hello</Skeleton>
            </div>
            <div className="col-span-3">
              <Skeleton>HelloHelloHello</Skeleton>
            </div>
            <div className="col-span-3 text-center">
              <Skeleton>Hello</Skeleton>
            </div>
            <div className="col-span-2 text-center">
              <Skeleton>Hello</Skeleton>
            </div>
            <div className="col-span-3 text-center">
              <Skeleton>HelloHello</Skeleton>
            </div>
          </div>
        );
      })}
    </>
  );
};
