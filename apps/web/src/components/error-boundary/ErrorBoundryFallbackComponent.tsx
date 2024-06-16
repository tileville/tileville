import { MonsterSad } from "@/assets";
import { twMerge } from "tailwind-merge";

export const ErrorBoundaryFallbackComponent = ({
  className,
}: {
  className: string;
}) => {
  return (
    <div
      className={twMerge(
        "flex h-full w-full flex-col items-center justify-center",
        className
      )}
    >
      <MonsterSad className="text-primary-600 mx-auto mb-8 h-56 w-56 fill-current drop-shadow-xl" />
      <h1 className="text-2xl font-semibold text-neutral-900">
        Oops... something went wrong.
      </h1>
      <p className="text-base text-neutral-700">
        Don&apos;t worry, we&apos;ll look into it! Please refresh the page and
        try again.
      </p>
    </div>
  );
};
