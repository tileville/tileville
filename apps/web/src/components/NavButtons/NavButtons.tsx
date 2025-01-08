import { BUG_REPORT_URL, FOLLOW_TILEVILLE_URL } from "@/constants";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Image from "next/image";

export const XFollowBtn = () => {
  return (
    <Link
      id="follow-button"
      className="ms-auto flex cursor-pointer items-center justify-center rounded-full bg-primary px-3 py-2 font-medium text-white"
      title="Follow @tileVille on X"
      href={FOLLOW_TILEVILLE_URL}
      target="_blank"
    >
      <i className="twitterIcon"></i>
      <span className="label ms-1 whitespace-nowrap text-xs" id="l">
        Follow
      </span>
    </Link>
  );
};

export const JoinDiscordBtn = () => {
  return (
    <Link
      id="follow-button"
      className="ms-auto flex cursor-pointer items-center justify-center rounded-full bg-primary px-3 py-2 font-medium text-white"
      title="Follow @tileVille on X"
      href="https://discord.com/invite/NvNBQZX7rU"
      target="_blank"
    >
      <DiscordLogoIcon />
      <span className="label ms-1 whitespace-nowrap text-xs" id="l">
        Join Discord
      </span>
    </Link>
  );
};

export const BugReportBtn = () => {
  return (
    <Link
      target="_blank"
      href={BUG_REPORT_URL}
      className="flex items-center justify-center gap-2 rounded-full border-primary bg-primary/30 px-5 py-2 text-xs font-medium hover:bg-primary/50"
    >
      <span>Bug Report</span>
      <Image
        src="/icons/bugReport.svg"
        width={20}
        height={20}
        alt="bug report"
      />
    </Link>
  );
};
