import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { MediaPlayer } from "../MediaPlayer/page";
import { BUG_REPORT_URL } from "@/constants";

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
        className={`absolute z-30 h-full min-h-screen bg-white  transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col gap-2 p-4">
          <li>
            {" "}
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
          <li>
            <Link
              target="_blank"
              href={BUG_REPORT_URL}
              className="flex items-center justify-center gap-2 rounded-full border-primary bg-primary/30 px-5 py-2 text-center text-xs font-medium hover:bg-primary/50"
            >
              <span>Bug Report</span>
              <Image
                src="/icons/bugReport.svg"
                width={20}
                height={20}
                alt="bug report"
              />
            </Link>
          </li>
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
        </ul>

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
