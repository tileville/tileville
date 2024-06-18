"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { PrimaryButton } from "./PrimaryButton";
import { MediaPlayer } from "./MediaPlayer/page";
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
import { useMountedState } from "react-use";

const HIDE_BACK_BUTTON_PATHS = ["/main-menu"];

export const DesktopNavBar = ({ autoConnect }: { autoConnect: boolean }) => {
  const [focusedButtonIndex, setFocusedButtonIndex] = useState<number>(0);
  const networkStore = useNetworkStore();
  const { data, isFetched } = useProfileLazyQuery(networkStore?.address || "");
  const { data: pendingTransactions = [] } = useFetchTransactions(
    networkStore?.address || "",
    "PENDING"
  );
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
  console.log("PENDING Transactions", pendingTransactions);

  useEffect(() => {
    if (!walletInstalled()) return;

    if (autoConnect) {
      networkStore.connectWallet(true);
    }
  }, []);

  useEffect(() => {
    if (networkStore.walletConnected && isFetched) {
      phClient.identify(networkStore.address, { username: data?.username });
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
    <nav className="fixed left-0 right-0 top-0 z-20 mb-6 px-4 pt-2 text-black">
      <div className="flex w-full items-start justify-between">
        <div className="flex items-center gap-3">
          <PrimaryButton
            key={1}
            onFocus={() => handleFocus(1)}
            size="sm"
            icon={<ChevronLeftIcon width={30} height={30} />}
            autoFocus={1 === focusedButtonIndex}
            href={"/main-menu"}
            className={clsx(`rounded-3xl !border !border-primary !px-6`, {
              hidden: isHideBackBtn,
            })}
          />
          <div className="min-w-[180px]">
            <MediaPlayer />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            id="follow-button"
            className="ms-auto flex cursor-pointer items-center rounded-full bg-primary px-3 py-2 font-medium text-white"
            title="Follow @tileVille on X"
            href="https://twitter.com/intent/follow?original_referer=https%3A%2F%2Fpublish.twitter.com%2F&amp;ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Efollow%7Ctwgr%5EtileVille&amp;region=follow_link&amp;screen_name=tileVilleSocial"
            target="_blank"
          >
            <i className="twitterIcon"></i>
            <span className="label ms-1 whitespace-nowrap text-xs" id="l">
              Follow
            </span>
          </Link>

          <div className="flex gap-5">
            {isMounted() &&
              (networkStore.walletConnected && networkStore.address ? (
                <>
                  <AccountCard text={formatAddress(networkStore.address)} />
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
