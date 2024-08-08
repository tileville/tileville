import {
  Cross1Icon,
  DiscordLogoIcon,
  FaceIcon,
  HamburgerMenuIcon,
  StarFilledIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { MediaPlayer } from "../MediaPlayer/page";
import {
  BUG_REPORT_URL,
  FEEDBACK_FORM_URL,
  GAME_ROADMAP_URL,
  GITHUB_URL,
} from "@/constants";

export const MobileNavBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="">
      <button
        onClick={() => {
          setSidebarOpen(!sidebarOpen);
        }}
        className="fixed left-0 top-0 z-20 p-4 text-black"
      >
        <HamburgerMenuIcon />
      </button>

      <nav
        className={`absolute z-30 flex h-full min-h-screen  flex-col justify-between bg-white transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col gap-2 p-4">
          <li>
            <div>
              <Link
                href="/main-menu"
                className="text-primary-shadow sm font-mono"
              >
                <span>T</span>il<span>e</span>Vi<span>l</span>le
              </Link>
            </div>
          </li>
          <li>
            <div className="min-w-[180px]">
              <MediaPlayer />
            </div>
          </li>
          <li className="mt-5">
            <Link
              target="_blank"
              href={BUG_REPORT_URL}
              className="flex items-center justify-center gap-2 rounded-full border-primary bg-primary/30 px-5 py-2 text-center text-xs font-medium hover:bg-primary/50"
            >
              <span>Bug Report</span>
              <Image
                src="/icons/bugReport.svg"
                width={16}
                height={16}
                alt="bug report"
              />
            </Link>
          </li>
          <li>
            <Link
              id="follow-button"
              className="ms-auto flex cursor-pointer items-center justify-center rounded-full bg-primary px-3 py-2 font-medium text-white"
              title="Follow @tileVille on X"
              href="https://twitter.com/intent/follow?original_referer=https%3A%2F%2Fpublish.twitter.com%2F&amp;ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Efollow%7Ctwgr%5EtileVille&amp;region=follow_link&amp;screen_name=tileVilleSocial"
              target="_blank"
            >
              <i className="twitterIcon"></i>
              <span className="label ms-1 whitespace-nowrap text-xs" id="l">
                Follow
              </span>
            </Link>
          </li>
          <li>
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
          </li>
        </ul>

        <div className="flex flex-col gap-1 p-2">
          <div className="flex items-center gap-4">
            <a
              href={GAME_ROADMAP_URL}
              target="_blank"
              className="flex items-center gap-2 text-xs underline"
            >
              <span>Game roadmap</span>
            </a>

            <a
              href={GITHUB_URL}
              target="_blank"
              className="flex items-center gap-1 text-xs underline"
            >
              <span>Star us on github</span>
              <StarFilledIcon />
            </a>

            <a
              href={FEEDBACK_FORM_URL}
              target="_blank"
              className="flex items-center gap-1 text-xs underline"
            >
              <span>Share Feedback</span>
              <FaceIcon />
            </a>
          </div>

          <div className="text-sm">
            <span>
              TileVille was inspired by Six Sided Streets made by{" "}
              <a
                target="_blank"
                href="https://csklimowski.itch.io/"
                className="underline"
              >
                Chris Klimowski
              </a>
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            setSidebarOpen(!sidebarOpen);
          }}
          className="absolute right-0 top-0 p-2"
        >
          <Cross1Icon />
        </button>
      </nav>
    </div>
  );
};
