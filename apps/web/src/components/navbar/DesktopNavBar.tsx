"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useRouter, usePathname } from "next/navigation";

// Components
import { PrimaryButton } from "../PrimaryButton";
import { MediaPlayer } from "../MediaPlayer/page";
import { HeaderCard } from "@/components/common/HeaderCard";
import NetworkPicker from "@/components/common/NetworkPicker";
import AccountCard from "@/components/common/AccountCard";
import { NavbarCommonContent } from "./NavbarCommonContent";
import {
  BugReportBtn,
  JoinTelegramBtn,
  XFollowBtn,
} from "../NavButtons/NavButtons";

// Hooks and utils
import { useNetworkStore } from "@/lib/stores/network";
import { formatAddress, walletInstalled } from "@/lib/helpers";
import {
  useFetchTransactions,
  useMainnetTransactionsStatus,
  useProfileLazyQuery,
  useUsername,
  useGlobalConfig,
} from "@/db/react-query-hooks";
import { usePosthogEvents } from "@/hooks/usePosthogEvents";
import { useAuthSignature } from "@/hooks/useAuthSignature";

// Constants and services
import { HIDE_BACK_BUTTON_PATHS } from "@/constants";
import { anonymousSignIn } from "@/db/supabase-queries";
import { toast } from "react-hot-toast";

export const DesktopNavBar = ({ autoConnect }: { autoConnect: boolean }) => {
  // Configs and global state
  useGlobalConfig("config_v1");
  const networkStore = useNetworkStore();
  const { validateOrSetSignature } = useAuthSignature();
  const { phClient } = usePosthogEvents();

  // Router and navigation
  const router = useRouter();
  const pathname = usePathname();
  const isHideBackBtn = HIDE_BACK_BUTTON_PATHS.includes(pathname);

  // Local state
  const [canGoBack, setCanGoBack] = useState(false);
  const [focusedButtonIndex, setFocusedButtonIndex] = useState<number>(0);

  // Data fetching
  const address = networkStore?.address || "";
  const { data: profileData, isFetched } = useProfileLazyQuery(address);
  const { data: username } = useUsername(address);
  const { data: pendingTransactions = [] } = useFetchTransactions(
    address,
    "PENDING"
  );

  // Process mainnet transactions
  const mainnetPendingTransactions = pendingTransactions
    .filter(({ network }) => network === "mina:mainnet")
    .map(({ txn_hash, txn_status }) => ({
      txn_hash,
      txn_status,
    }));
  useMainnetTransactionsStatus(mainnetPendingTransactions);

  // Handle wallet connection on mount
  useEffect(() => {
    if (!walletInstalled()) return;

    if (autoConnect) {
      networkStore.connectWallet(false);
    }

    setCanGoBack(window.history.length > 1);
  }, [autoConnect, networkStore]);

  // Handle profile data after wallet connection
  useEffect(() => {
    if (!networkStore.walletConnected || !isFetched) return;

    // Validate signature and identify user
    validateOrSetSignature();
    phClient.identify(networkStore.address, {
      username: profileData?.username,
    });

    // Perform anonymous sign-in
    anonymousSignIn()
      .then(() => console.log("anonymous login done"))
      .catch(() => console.log("failed to do anonymous login"));

    // Show incomplete profile notification
    if (!profileData?.fullname || !profileData?.username) {
      showIncompleteProfileToast();
    }
  }, [
    networkStore.walletConnected,
    profileData,
    isFetched,
    networkStore.address,
    phClient,
    validateOrSetSignature,
  ]);

  // Helper functions
  const handleFocus = (index: number) => {
    setFocusedButtonIndex(index);
  };

  const handleBackButtonClick = () => {
    canGoBack ? router.back() : router.push("/main-menu");
  };

  const showIncompleteProfileToast = () => {
    toast(
      <div>
        Hey there! It looks like you haven&apos;t completed your profile yet.
        Please{" "}
        <a href="/profile" className="text-blue-950 underline">
          complete it now
        </a>{" "}
        to get the most out of our platform
      </div>,
      { duration: 6000 }
    );
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-20 mb-6 px-4 pb-1 pt-2 text-black backdrop-blur-md">
      <div className="flex w-full items-start justify-between">
        {/* Left section */}
        <div className="flex items-center gap-3">
          {!isHideBackBtn && (
            <PrimaryButton
              key={1}
              onFocus={() => handleFocus(1)}
              size="sm"
              icon={<ChevronLeftIcon width={30} height={30} />}
              autoFocus={1 === focusedButtonIndex}
              className={clsx(`rounded-3xl !border !border-primary !px-6`, {
                hidden: isHideBackBtn,
              })}
              onClickHandler={handleBackButtonClick}
            />
          )}

          <div className="relative">
            <Link
              href="/main-menu"
              className="text-primary-shadow sm font-mono"
            >
              <span>T</span>il<span>e</span>Vi<span>l</span>le
            </Link>
          </div>

          <div className="min-w-[180px]">
            <MediaPlayer />
          </div>

          <BugReportBtn />
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          <XFollowBtn />
          <JoinTelegramBtn />
          <NavbarCommonContent />
        </div>
      </div>
    </nav>
  );
};
