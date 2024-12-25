import {
  ChevronLeftIcon,
  Cross1Icon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MediaPlayer } from "../MediaPlayer/page";
import {
  BACKGROUND_PATHS_HEADER,
  HIDE_BACK_BUTTON_PATHS,
  MOB_NAV_MENU_ITEMS,
} from "@/constants";
import { MobileNavButton, PrimaryButton } from "../PrimaryButton";
import clsx from "clsx";
import {
  BugReportBtn,
  JoinDiscordBtn,
  XFollowBtn,
} from "../NavButtons/NavButtons";
import { FooterContent } from "../Footer/FooterContent";
import Image from "next/image";

export const MobileNavBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isHideBackBtn = HIDE_BACK_BUTTON_PATHS.includes(pathname);
  const isHeaderWithBg = BACKGROUND_PATHS_HEADER.includes(pathname);
  const router = useRouter();

  return (
    <div className="">
      <div
        className={`fixed left-0 right-0 top-0 z-20 flex w-full items-center justify-between p-2 ${
          isHeaderWithBg && "bg-[#a4b881]"
        }`}
      >
        {!isHideBackBtn && (
          <PrimaryButton
            key={1}
            onFocus={() => console.log("on focus")}
            size="sm"
            icon={<ChevronLeftIcon width={20} height={20} />}
            className={clsx(
              `rounded-[20px] !border !border-primary px-3 md:!px-6`,
              {
                hidden: isHideBackBtn,
              }
            )}
            onClickHandler={() => {
              router.back();
            }}
          />
        )}

        <button
          onClick={() => {
            setSidebarOpen(!sidebarOpen);
          }}
          className="ms-auto p-2 text-black"
        >
          <HamburgerMenuIcon />
        </button>
      </div>

      <nav
        className={`fixed right-0 z-30 flex h-screen flex-col justify-between bg-[#BCD4A1] transition-transform ${
          sidebarOpen ? "translate-x-0" : "translate-x-[100vw]"
        }`}
      >
        <ul className="flex flex-col gap-2 overflow-auto p-4">
          <li>
            <div className="relative">
              <Image
                src="/icons/christmasHat.png"
                width={27}
                height={27}
                alt="timer"
                className="absolute -left-[13px] -top-[15px]"
              />
              <button
                onClick={() => {
                  router.push("/main-menu");
                  setSidebarOpen(false);
                }}
                className="text-primary-shadow sm font-mono"
              >
                <span>T</span>il<span>e</span>Vi<span>l</span>le
              </button>
            </div>
          </li>
          <li>
            <div className="min-w-[180px]">
              <MediaPlayer />
            </div>
          </li>
          <li className="my-5">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <BugReportBtn />
              <XFollowBtn />
              <JoinDiscordBtn />
            </div>
          </li>

          {MOB_NAV_MENU_ITEMS.map((button) => (
            <li className="w-full" key={button.key}>
              <MobileNavButton
                text={button.name}
                onClickHandler={() => {
                  setSidebarOpen(!sidebarOpen);
                  router.push(`${button.href}`);
                }}
              />
            </li>
          ))}
        </ul>

        <FooterContent />

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
