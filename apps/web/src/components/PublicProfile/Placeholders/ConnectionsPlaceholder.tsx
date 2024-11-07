import { Skeleton } from "@radix-ui/themes";

export const ConnectionsPlaceholder = () => {
  return (
    <div className="w-full rounded-xl bg-primary/20 p-4 text-black backdrop-blur-sm">
      <div className="flex justify-around gap-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-32" />
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {Array(5)
          .fill(undefined)
          .map((_, index) => (
            <li className="flex items-center gap-4" key={index}>
              <div className="h-[50px] w-[50px] flex-shrink-0 flex-grow-0 basis-auto rounded-full border-4 border-[#D3F49E]">
                <Skeleton className="h-full w-full rounded-full" />
              </div>

              <div>
                <Skeleton className="mb-1 h-4 w-20" />
                <div className="flex gap-2">
                  <Skeleton className="mb-1 h-3 w-14" />
                  <Skeleton className="mb-1 h-3 w-14" />
                </div>
              </div>

              <div className="ms-auto">
                <Skeleton className="mb-1 h-[30px] w-32" />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};
