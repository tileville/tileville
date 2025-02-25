"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useNetworkStore } from "@/lib/stores/network";
import { walletInstalled, formatAddress } from "@/lib/helpers";
import { useGlobalConfig } from "@/db/react-query-hooks";
import {
  useFetchTransactions,
  useMainnetTransactionsStatus,
  useProfileLazyQuery,
  useUsername,
} from "@/db/react-query-hooks";
import { anonymousSignIn } from "@/db/supabase-queries";
import { useAuthSignature } from "@/hooks/useAuthSignature";
import { usePosthogEvents } from "@/hooks/usePosthogEvents";
import { HIDE_BACK_BUTTON_PATHS } from "@/constants";
import { PrimaryButton } from "../PrimaryButton";
import { MediaPlayer } from "../MediaPlayer/page";
import {
  BugReportBtn,
  JoinTelegramBtn,
  XFollowBtn,
} from "../NavButtons/NavButtons";
import { NavbarCommonContent } from "./NavbarCommonContent";

export const DesktopNavBar = ({ autoConnect }: { autoConnect: boolean }) => {
  useGlobalConfig("config_v1");
  const [canGoBack, setCanGoBack] = useState(false);
  const networkStore = useNetworkStore();
  const router = useRouter();
  const pathname = usePathname();
  const isHideBackBtn = HIDE_BACK_BUTTON_PATHS.includes(pathname);
  const { data, isFetched } = useProfileLazyQuery(networkStore?.address || "");
  const { data: pendingTransactions = [] } = useFetchTransactions(
    networkStore?.address || "",
    "PENDING"
  );
  const { validateOrSetSignature } = useAuthSignature();
  const { data: username } = useUsername(networkStore?.address);
  const { phClient } = usePosthogEvents();

  useMainnetTransactionsStatus(
    pendingTransactions
      .filter(({ network }) => network === "mina:mainnet")
      .map(({ txn_hash, txn_status }) => ({ txn_hash, txn_status }))
  );

  useEffect(() => {
    if (!walletInstalled()) return;
    if (autoConnect) {
      networkStore.connectWallet(false);
    }
    setCanGoBack(window.history.length > 1);
  }, [autoConnect, networkStore]);

  useEffect(() => {
    if (networkStore.walletConnected && isFetched) {
      validateOrSetSignature();
      phClient.identify(networkStore.address, { username: data?.username });
      anonymousSignIn()
        .then(() => console.log("anonymous login done"))
        .catch(() => console.log("failed to do anonymous login"));
    }
    if (
      networkStore.walletConnected &&
      isFetched &&
      (!data?.fullname || !data?.username)
    ) {
      toast(
        <div>
          Hey there! It looks like you haven&apos;t completed your profile yet.
          Please{" "}
          <Link href="/profile" className="text-blue-950 underline">
            complete it now
          </Link>{" "}
          to get the most out of our platform.
        </div>,
        { duration: 6000 }
      );
    }
  }, [
    networkStore.walletConnected,
    isFetched,
    data,
    phClient,
    validateOrSetSignature,
  ]);

  return (
    <nav className="fixed left-0 right-0 top-0 z-20 mb-6 px-4 pb-1 pt-2 text-black backdrop-blur-md">
      <div className="flex w-full items-start justify-between">
        <div className="flex items-center gap-3">
          {!isHideBackBtn && (
            <PrimaryButton
              size="sm"
              icon={<ChevronLeftIcon width={30} height={30} />}
              className={clsx("rounded-3xl !border !border-primary !px-6", {
                hidden: isHideBackBtn,
              })}
              onClickHandler={() => {
                canGoBack ? router.back() : router.push("/main-menu");
              }}
            />
          )}
          <Link href="/main-menu" className="text-primary-shadow sm font-mono">
            <span>T</span>il<span>e</span>Vi<span>l</span>le
          </Link>
          <div className="min-w-[180px]">
            <MediaPlayer />
          </div>
          <BugReportBtn />
        </div>

        <div className="flex items-center gap-3">
          <XFollowBtn />
          <JoinTelegramBtn />
          <NavbarCommonContent />
        </div>
      </div>
    </nav>
  );
};
