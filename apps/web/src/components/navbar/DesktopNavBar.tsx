"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { useMountedState } from "react-use";
import { ChevronLeftIcon, DiscordLogoIcon } from "@radix-ui/react-icons";
import { PrimaryButton } from "../PrimaryButton";
import { MediaPlayer } from "../MediaPlayer/page";
import { useNetworkStore } from "@/lib/stores/network";
import { formatAddress, walletInstalled } from "@/lib/helpers";
import { HeaderCard } from "@/components/common/HeaderCard";
import NetworkPicker from "@/components/common/NetworkPicker";
import AccountCard from "@/components/common/AccountCard";
import {
  useFetchTransactions,
  useMainnetTransactionsStatus,
  useProfileLazyQuery,
} from "@/db/react-query-hooks";
import { toast } from "react-hot-toast";
import { usePathname } from "next/navigation";
import { usePosthogEvents } from "@/hooks/usePosthogEvents";
import { useRouter } from "next/navigation";
import { HIDE_BACK_BUTTON_PATHS } from "@/constants";
import { anonymousSignIn } from "@/db/supabase-queries";
import { useGlobalConfig } from "@/db/react-query-hooks";
import { useAuthSignature } from "@/hooks/useAuthSignature";
import {
  BugReportBtn,
  JoinDiscordBtn,
  XFollowBtn,
} from "../NavButtons/NavButtons";

export const DesktopNavBar = ({ autoConnect }: { autoConnect: boolean }) => {
  useGlobalConfig("config_v1");
  const [canGoBack, setCanGoBack] = useState(false);
  const [focusedButtonIndex, setFocusedButtonIndex] = useState<number>(0);
  const networkStore = useNetworkStore();
  const router = useRouter();
  const { data, isFetched } = useProfileLazyQuery(networkStore?.address || "");
  const { data: pendingTransactions = [] } = useFetchTransactions(
    networkStore?.address || "",
    "PENDING"
  );
  const { validateOrSetSignature } = useAuthSignature();
  const isMounted = useMountedState();

  useMainnetTransactionsStatus(
    pendingTransactions
      .filter(({ network }) => network === "mina:mainnet")
      .map(({ txn_hash, txn_status }) => ({
        txn_hash,
        txn_status,
      }))
  );
  const pathname = usePathname();
  const isHideBackBtn = HIDE_BACK_BUTTON_PATHS.includes(pathname);
  const { phClient } = usePosthogEvents();
  useEffect(() => {
    if (!walletInstalled()) return;
    if (autoConnect) {
      networkStore.connectWallet(false);
    }
    setCanGoBack(window.history.length > 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (networkStore.walletConnected && isFetched) {
      validateOrSetSignature();
      phClient.identify(networkStore.address, { username: data?.username });
      // This is not working. debug this.
      // addNovuSubscriber(networkStore.address!, {
      //   username: data?.username,
      //   email: data?.email || "",
      //   fullname: data?.fullname || "",
      // });
      anonymousSignIn()
        .then(() => {
          console.log("anonymous login done");
        })
        .catch(() => {
          console.log("failed to do anonymous login");
        });
    }
    if (
      networkStore.walletConnected &&
      isFetched &&
      (!data?.fullname || !data?.username)
    ) {
      //Log entry
      // Show modal
      toast(
        <div>
          Hey there! It looks like you haven&apos;t completed your profile yet.
          Please{" "}
          <a href="/profile" className="text-blue-950 underline">
            complete it now
          </a>{" "}
          to get the most out of our platform
        </div>,
        {
          duration: 6000,
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [networkStore.walletConnected, data, isFetched]);

  const handleFocus = (index: number) => {
    setFocusedButtonIndex(index);
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-20 mb-6 px-4 pb-1 pt-2 text-black backdrop-blur-md">
      <div className="flex w-full items-start justify-between">
        <div className="flex items-center gap-3">
          {!isHideBackBtn && (
            <PrimaryButton
              key={1}
              onFocus={() => handleFocus(1)}
              size="sm"
              icon={<ChevronLeftIcon width={30} height={30} />}
              autoFocus={1 === focusedButtonIndex}
              // href={"/main-menu"}
              className={clsx(`rounded-3xl !border !border-primary !px-6`, {
                hidden: isHideBackBtn,
              })}
              onClickHandler={() => {
                canGoBack ? router.back() : router.push("/main-menu");
              }}
            />
          )}

          <div>
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

        <div className="flex items-center gap-3">
          <XFollowBtn />
          <JoinDiscordBtn />

          <div className="flex gap-5">
            {isMounted() &&
              (networkStore.walletConnected && networkStore.address ? (
                <>
                  <Link href="/profile">
                    <AccountCard text={formatAddress(networkStore.address)} />
                  </Link>

                  <NetworkPicker />
                </>
              ) : walletInstalled() ? (
                <HeaderCard
                  svg={"account"}
                  text="Connect wallet"
                  isMiddle={true}
                  onClick={() => {
                    networkStore.connectWallet(false);
                  }}
                  className="border border-primary"
                />
              ) : (
                <Link
                  href="https://www.aurowallet.com/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <HeaderCard
                    svg={"account"}
                    text="Install wallet"
                    isMiddle={true}
                  />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
