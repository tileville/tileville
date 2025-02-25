import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronLeftIcon,
  Cross1Icon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import clsx from "clsx";

import { MediaPlayer } from "../MediaPlayer/page";
import { MobileNavButton, PrimaryButton } from "../PrimaryButton";
import {
  BugReportBtn,
  JoinTelegramBtn,
  XFollowBtn,
} from "../NavButtons/NavButtons";
import { FooterContent } from "../Footer/FooterContent";
import { NavbarCommonContent } from "./NavbarCommonContent";

import {
  BACKGROUND_PATHS_HEADER,
  HIDE_BACK_BUTTON_PATHS,
  MOB_NAV_MENU_ITEMS,
} from "@/constants";
import { useNetworkStore } from "@/lib/stores/network";
import {
  useFetchTransactions,
  useGlobalConfig,
  useMainnetTransactionsStatus,
  useProfileLazyQuery,
} from "@/db/react-query-hooks";
import { useAuthSignature } from "@/hooks/useAuthSignature";
import { usePosthogEvents } from "@/hooks/usePosthogEvents";
import { walletInstalled } from "@/lib/helpers";
import { anonymousSignIn } from "@/db/supabase-queries";

export const MobileNavBar = ({ autoConnect }: { autoConnect: boolean }) => {
  useGlobalConfig("config_v1");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const networkStore = useNetworkStore();
  const { validateOrSetSignature } = useAuthSignature();
  const { phClient } = usePosthogEvents();

  const isHideBackBtn = HIDE_BACK_BUTTON_PATHS.includes(pathname);
  const isHeaderWithBg = BACKGROUND_PATHS_HEADER.includes(pathname);

  const { data, isFetched } = useProfileLazyQuery(networkStore?.address || "");
  const { data: pendingTransactions = [] } = useFetchTransactions(
    networkStore?.address || "",
    "PENDING"
  );

  useMainnetTransactionsStatus(
    pendingTransactions
      .filter(({ network }) => network === "mina:mainnet")
      .map(({ txn_hash, txn_status }) => ({ txn_hash, txn_status }))
  );

  useEffect(() => {
    if (walletInstalled() && autoConnect) {
      networkStore.connectWallet(false);
    }
  }, [autoConnect, networkStore]);

  useEffect(() => {
    if (networkStore.walletConnected && isFetched) {
      validateOrSetSignature();
      phClient.identify(networkStore.address, { username: data?.username });

      anonymousSignIn()
        .then(() => console.log("Anonymous login successful"))
        .catch(() => console.log("Anonymous login failed"));
    }
  }, [
    networkStore.walletConnected,
    data,
    isFetched,
    validateOrSetSignature,
    phClient,
  ]);

  return (
    <div>
      <header
        className={clsx(
          "fixed left-0 right-0 top-0 z-20 flex w-full items-center justify-between p-2",
          isHeaderWithBg && "bg-[#a4b881]"
        )}
      >
        {!isHideBackBtn && (
          <PrimaryButton
            size="sm"
            icon={<ChevronLeftIcon width={20} height={20} />}
            className="rounded-[20px] !border !border-primary px-3 md:!px-6"
            onClickHandler={() => router.back()}
          />
        )}

        <NavbarCommonContent />

        <button
          className="p-2 text-black"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <HamburgerMenuIcon />
        </button>
      </header>

      <nav
        className={clsx(
          "fixed right-0 z-30 flex h-screen flex-col justify-between bg-[#BCD4A1] transition-transform",
          sidebarOpen ? "translate-x-0" : "translate-x-[100vw]"
        )}
      >
        <ul className="flex flex-col gap-2 overflow-auto p-4">
          <li>
            <button
              className="text-primary-shadow sm font-mono"
              onClick={() => {
                router.push("/main-menu");
                setSidebarOpen(false);
              }}
            >
              <span>T</span>il<span>e</span>Vi<span>l</span>le
            </button>
          </li>
          <li className="min-w-[180px]">
            <MediaPlayer />
          </li>
          <li className="my-5 flex items-center gap-2 whitespace-nowrap">
            <BugReportBtn />
            <XFollowBtn />
            <JoinTelegramBtn />
          </li>

          {MOB_NAV_MENU_ITEMS.map((button) => (
            <li className="w-full" key={button.key}>
              <MobileNavButton
                text={button.name}
                onClickHandler={() => {
                  router.push(button.href);
                  setSidebarOpen(false);
                }}
              />
            </li>
          ))}
        </ul>

        <FooterContent />

        <button
          className="absolute right-0 top-0 p-2"
          onClick={() => setSidebarOpen(false)}
        >
          <Cross1Icon />
        </button>
      </nav>
    </div>
  );
};
