import {
  ChevronLeftIcon,
  Cross1Icon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// Components
import { MediaPlayer } from "../MediaPlayer/page";
import { MobileNavButton, PrimaryButton } from "../PrimaryButton";
import {
  BugReportBtn,
  JoinTelegramBtn,
  XFollowBtn,
} from "../NavButtons/NavButtons";
import { FooterContent } from "../Footer/FooterContent";
import { NavbarCommonContent } from "./NavbarCommonContent";

// Hooks and utilities
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

// Constants
import {
  BACKGROUND_PATHS_HEADER,
  HIDE_BACK_BUTTON_PATHS,
  MOB_NAV_MENU_ITEMS,
} from "@/constants";
import clsx from "clsx";

export const MobileNavBar = ({ autoConnect }: { autoConnect: boolean }) => {
  // Global config and state
  useGlobalConfig("config_v1");
  const networkStore = useNetworkStore();
  const { validateOrSetSignature } = useAuthSignature();
  const { phClient } = usePosthogEvents();

  // Navigation
  const router = useRouter();
  const pathname = usePathname();
  const isHideBackBtn = HIDE_BACK_BUTTON_PATHS.includes(pathname);
  const isHeaderWithBg = BACKGROUND_PATHS_HEADER.includes(pathname);

  // Local state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Data fetching
  const address = networkStore?.address || "";
  const { data: profileData, isFetched } = useProfileLazyQuery(address);
  const { data: pendingTransactions = [] } = useFetchTransactions(
    address,
    "PENDING"
  );

  // Process transactions
  const mainnetPendingTransactions = pendingTransactions
    .filter(({ network }) => network === "mina:mainnet")
    .map(({ txn_hash, txn_status }) => ({
      txn_hash,
      txn_status,
    }));
  useMainnetTransactionsStatus(mainnetPendingTransactions);

  // Handle initial wallet connection
  useEffect(() => {
    if (!walletInstalled()) return;

    if (autoConnect) {
      networkStore.connectWallet(false);
    }
  }, [autoConnect, networkStore]);

  // Handle profile data after wallet connection
  useEffect(() => {
    if (!networkStore.walletConnected || !isFetched) return;

    validateOrSetSignature();
    phClient.identify(networkStore.address, {
      username: profileData?.username,
    });

    anonymousSignIn()
      .then(() => console.log("anonymous login done"))
      .catch(() => console.log("failed to do anonymous login"));
  }, [
    networkStore.walletConnected,
    profileData,
    isFetched,
    networkStore.address,
    phClient,
    validateOrSetSignature,
  ]);

  // Handlers
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navigateToMainMenu = () => {
    router.push("/main-menu");
    setSidebarOpen(false);
  };

  const handleBackButton = () => {
    router.back();
  };

  const handleNavItemClick = (href: string) => {
    setSidebarOpen(false);
    router.push(href);
  };

  return (
    <div className="">
      {/* Header bar */}
      <div
        className={`fixed left-0 right-0 top-0 z-20 flex w-full items-center justify-between p-2 ${
          isHeaderWithBg ? "bg-[#a4b881]" : ""
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
            onClickHandler={handleBackButton}
          />
        )}

        <NavbarCommonContent />

        <button
          onClick={toggleSidebar}
          className="p-2 text-black"
          aria-label="Toggle menu"
        >
          <HamburgerMenuIcon />
        </button>
      </div>

      {/* Sidebar navigation */}
      <nav
        className={`fixed right-0 z-30 flex h-screen flex-col justify-between bg-[#BCD4A1] transition-transform ${
          sidebarOpen ? "translate-x-0" : "translate-x-[100vw]"
        }`}
      >
        <ul className="flex flex-col gap-2 overflow-auto p-4">
          <li>
            <div className="relative">
              <button
                onClick={navigateToMainMenu}
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
              <JoinTelegramBtn />
            </div>
          </li>

          {MOB_NAV_MENU_ITEMS.map((button) => (
            <li className="w-full" key={button.key}>
              <MobileNavButton
                text={button.name}
                onClickHandler={() => handleNavItemClick(button.href)}
              />
            </li>
          ))}
        </ul>

        <FooterContent />

        <button
          onClick={toggleSidebar}
          className="absolute right-0 top-0 p-2"
          aria-label="Close menu"
        >
          <Cross1Icon />
        </button>
      </nav>
    </div>
  );
};
