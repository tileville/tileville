import { Skeleton } from "@radix-ui/themes";

export const ProfileBasicInfoPLaceholder = () => (
  <div className="flex h-full w-full flex-col rounded-xl bg-primary/20 px-2 py-4 backdrop-blur-sm">
    <div className="mb-4 flex items-start gap-3">
      <div className="h-[100px] w-[100px] flex-shrink-0 flex-grow-0 basis-auto rounded-full border-4 border-[#D3F49E]">
        <Skeleton className="h-full w-full rounded-full" />
      </div>
      <div>
        <Skeleton className="mb-1 block h-4 w-20"></Skeleton>
        <Skeleton className="h-3 w-20"></Skeleton>

        <div className="mt-3 flex gap-2">
          <Skeleton className="mb-1 block h-3 w-20"></Skeleton>
          <Skeleton className="h-3 w-20"></Skeleton>
        </div>

        <div className="mt-3 flex gap-2">
          <Skeleton className="mb-1 block h-3 w-20"></Skeleton>
          <Skeleton className="h-3 w-20"></Skeleton>
        </div>
      </div>
    </div>

    <div className="flex justify-end gap-4">
      <Skeleton className="h-[25px] w-[25px]"></Skeleton>
      <Skeleton className="h-[25px] w-[25px]"></Skeleton>
      <Skeleton className="h-[25px] w-[25px]"></Skeleton>
    </div>

    <div>
      <Skeleton className="h-4 w-28"></Skeleton>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <Skeleton className="h-20 w-full"></Skeleton>
        <Skeleton className="h-20 w-full"></Skeleton>
        <Skeleton className="h-20 w-full"></Skeleton>
      </div>
    </div>

    <Skeleton className="mt-auto h-11 w-full">follow</Skeleton>
  </div>
);
