import {
  BUG_REPORT_URL,
  FOLLOW_TILEVILLE_URL,
  TILEVILLE_TELEGRAM_URL,
} from "@/constants";
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

export const JoinTelegramBtn = () => {
  return (
    <Link
      id="follow-button"
      className="ms-auto flex cursor-pointer items-center justify-center rounded-full bg-primary px-3 py-2 font-medium text-white"
      title="Follow @tileVille on X"
      href={TILEVILLE_TELEGRAM_URL}
      target="_blank"
    >
      <Image
        src="/icons/telegramWhite.png"
        width={16}
        height={16}
        alt="bug report"
      />
      <span className="label ms-1 whitespace-nowrap text-xs" id="l">
        Join Telegram
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
