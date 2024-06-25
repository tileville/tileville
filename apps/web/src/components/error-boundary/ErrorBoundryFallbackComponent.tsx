import { MonsterSad } from "@/assets";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { BUG_REPORT_URL } from "@/constants";
import Image from "next/image";

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
      <div>
        <Link
          target="_blank"
          href={BUG_REPORT_URL}
          className="flex items-center gap-2 rounded-full border-primary bg-primary/30 px-5 py-2 text-xs font-medium hover:bg-primary/50"
        >
          <span>Bug Report</span>
          {/* <Image
            src="icons/bugReport.svg"
            width={20}
            height={20}
            alt="bug report"
          /> */}
        </Link>
      </div>
    </div>
  );
};
