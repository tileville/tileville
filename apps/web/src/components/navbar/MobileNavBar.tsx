import {
  ChevronLeftIcon,
  Cross1Icon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
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
  JoinTelegramBtn,
  XFollowBtn,
} from "../NavButtons/NavButtons";
import { FooterContent } from "../Footer/FooterContent";
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
import { NavbarCommonContent } from "./NavbarCommonContent";

type MobileNavBarProps = {
  autoConnect: boolean;
};

export const MobileNavBar = ({ autoConnect }: MobileNavBarProps) => {
  // Hooks and State
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const networkStore = useNetworkStore();
  const { phClient } = usePosthogEvents();
  const { validateOrSetSignature } = useAuthSignature();

  // Queries and Config
  useGlobalConfig("config_v1");
  const { data, isFetched } = useProfileLazyQuery(networkStore?.address || "");
  const { data: pendingTransactions = [] } = useFetchTransactions(
    networkStore?.address || "",
    "PENDING"
  );

  // Derived state
  const isHideBackBtn = HIDE_BACK_BUTTON_PATHS.includes(pathname);
  const isHeaderWithBg = BACKGROUND_PATHS_HEADER.includes(pathname);

  // Monitor mainnet transactions
  useMainnetTransactionsStatus(
    pendingTransactions
      .filter(({ network }) => network === "mina:mainnet")
      .map(({ txn_hash, txn_status }) => ({
        txn_hash,
        txn_status,
      }))
  );

  // Side effects
  useEffect(() => {
    if (!walletInstalled()) return;
    if (autoConnect) {
      networkStore.connectWallet(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (networkStore.walletConnected && isFetched) {
      validateOrSetSignature();
      phClient.identify(networkStore.address, { username: data?.username });
      handleAnonymousSignIn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [networkStore.walletConnected, data, isFetched]);

  // Handlers
  const handleAnonymousSignIn = async () => {
    try {
      await anonymousSignIn();
      console.log("anonymous login done");
    } catch (error) {
      console.log("failed to do anonymous login");
    }
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navigateBack = () => router.back();

  const navigateTo = (path: string) => {
    router.push(path);
    setSidebarOpen(false);
  };

  // UI Components
  const HeaderBar = () => (
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
            { hidden: isHideBackBtn }
          )}
          onClickHandler={navigateBack}
        />
      )}
      <NavbarCommonContent />

      <button onClick={toggleSidebar} className="p-2 text-black">
        <HamburgerMenuIcon />
      </button>
    </div>
  );

  const SidebarMenu = () => (
    <nav
      className={`fixed right-0 z-30 flex h-screen flex-col justify-between bg-[#BCD4A1] transition-transform ${
        sidebarOpen ? "translate-x-0" : "translate-x-[100vw]"
      }`}
    >
      <ul className="flex flex-col gap-2 overflow-auto p-4">
        <li>
          <div className="relative">
            <button
              onClick={() => navigateTo("/main-menu")}
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
              onClickHandler={() => navigateTo(button.href)}
            />
          </li>
        ))}
      </ul>

      <FooterContent />

      <button onClick={toggleSidebar} className="absolute right-0 top-0 p-2">
        <Cross1Icon />
      </button>
    </nav>
  );

  // Main render
  return (
    <div className="">
      <HeaderBar />
      <SidebarMenu />
    </div>
  );
};
