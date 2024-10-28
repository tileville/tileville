import { Skeleton } from "@radix-ui/themes";

const INITIAL_ARRAY = [34534123344, 34534123345, 34564123325];

export default function CompetitionLoading() {
  return (
    <>
      {INITIAL_ARRAY?.map((competition) => {
        return (
          <div
            className="border-primary-30 group relative grid grid-cols-12 gap-3 overflow-hidden rounded-lg"
            key={competition}
          >
            <div className="col-span-4 overflow-hidden">
              <Skeleton className="h-[400px] w-[400px]"></Skeleton>
            </div>

            <div className="col-span-6 flex flex-col p-4">
              <Skeleton className="mb-3 w-1/2">
                <h2 className="h-4 text-xl font-semibold">{competition}</h2>
              </Skeleton>
              <div className="flex flex-col">
                <Skeleton className="">
                  <p className="mb-2 text-sm">{competition}</p>
                </Skeleton>

                <Skeleton className="">
                  <p className="mb-2 text-sm">{competition}</p>
                </Skeleton>

                <Skeleton className="">
                  <p className="mb-2 text-sm">{competition}</p>
                </Skeleton>

                <Skeleton className="">
                  <p className="mb-2 text-sm">{competition}</p>
                </Skeleton>


                <Skeleton className="">
                  <p className="mb-2 text-sm">{competition}</p>
                </Skeleton>

                <Skeleton className="w-3/4">
                  <p className="mb-2 text-sm">{competition}</p>
                </Skeleton>
              </div>
              <div className="my-3 mt-auto h-[1px] w-full bg-primary/30"></div>
              <div className="flex gap-3 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4">hi </Skeleton>
                  <Skeleton>
                    <p>Event Starting in 12 days 12 hours 23 mins 23 sec</p>
                  </Skeleton>
                </div>
                <div className="h-full w-[1px] bg-primary/30"></div>
                <div className="flex items-center gap-2">
                  <Skeleton>
                    <p>Entry Fees:</p>
                  </Skeleton>
                  <Skeleton>
                    <p className="text-base font-semibold">
                      {competition} MINA
                    </p>
                  </Skeleton>
                </div>
                <div className="h-full w-[1px] bg-primary/30"></div>
                <div className="flex items-center gap-2">
                  <Skeleton>
                    <p>Prize</p>
                  </Skeleton>
                  <Skeleton>
                    <p className="text-base font-semibold">
                      {competition} MINA
                    </p>
                  </Skeleton>
                </div>
              </div>
            </div>

            <div className="col-span-2 p-4">
              <div className="flex h-full items-start">
                <Skeleton className="mx-auto h-8 w-full cursor-pointer whitespace-nowrap rounded-md border-2 border-primary bg-primary bg-opacity-30 py-2 text-center font-mono leading-none text-white hover:shadow-[0_0_8px_hsl(var(--primary))]">
                  Join Now
                </Skeleton>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
