import { MonsterSad } from "@/assets";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { BUG_REPORT_URL } from "@/constants";

export const ErrorBoundaryFallbackComponent = ({
  className,
}: {
  className: string;
}) => {
  return (
    <div
      className={twMerge(
        "flex h-screen w-full flex-col items-center justify-center space-y-4",
        className
      )}
    >
      <MonsterSad className="text-primary-600 mb-8 block h-56 w-56 fill-current drop-shadow-xl" />
      <h1 className="text-2xl font-semibold text-neutral-900">
        Oops... something went wrong.
      </h1>
      <p className="text-base text-neutral-700">
        Don&apos;t worry, we&apos;ll look into it! Please refresh the page and
        try again.
      </p>
      <div>
        <Link
          target="_blank"
          href={BUG_REPORT_URL}
          className="flex items-center gap-2 rounded-full border-primary bg-primary/30 px-5 py-2 text-xs font-medium hover:bg-primary/50"
        >
          <span>Bug Report</span>
        </Link>
      </div>
    </div>
  );
};
