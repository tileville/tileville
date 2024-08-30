"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { useLocalStorage, useMountedState } from "react-use";
import Image from "next/image";
import { ChevronLeftIcon, DiscordLogoIcon } from "@radix-ui/react-icons";
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
import { useRouter } from "next/navigation";
import {
  ACCOUNT_AUTH_LOCALSTORAGE_KEY,
  ACCOUNT_AUTH_MESSAGE,
  BUG_REPORT_URL,
} from "@/constants";
import { anonymousSignIn } from "@/db/supabase-queries";
import { useGlobalConfig } from "@/db/react-query-hooks";
// import { addNovuSubscriber } from "@/lib/novu";

const HIDE_BACK_BUTTON_PATHS = ["/main-menu", "/"];

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
  const isMounted = useMountedState();
  const [accountAuthSignature, setAccountAuthSignature] = useLocalStorage(
    ACCOUNT_AUTH_LOCALSTORAGE_KEY,
    ""
  );

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
      networkStore.connectWallet(true);
    }
    setCanGoBack(window.history.length > 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (networkStore.walletConnected && isFetched) {
      let isSignatureRequired = true;
      if (accountAuthSignature) {
        try {
          const signatureAccount = accountAuthSignature.split(" ")[0] || "";
          isSignatureRequired =
            signatureAccount === networkStore.address ? false : true;
        } catch (error) {
          console.warn(`Failed to parse stored signature.`);
          isSignatureRequired = true;
        }
      }
      if (isSignatureRequired) {
        (window as any).mina
          ?.signMessage({
            message: ACCOUNT_AUTH_MESSAGE,
          })
          .then((signResult: any) => {
            const authSignatureStr = `${signResult.publicKey || ""} ${
              signResult?.signature?.scalar || ""
            } ${signResult?.signature?.field || ""}`;
            setAccountAuthSignature(authSignatureStr);
          })
          .catch((error: any) => {
            console.log("failed to set signature", error);
          });
      }
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

  const connectWallet = () => {
    if (window.mina?.isPallad) {
      toast(
        (t) => (
          <div className="max-w-md">
            <p className="mb-2 font-bold">
              Pallad wallet is not supported yet. Please use Auro wallet
              instead.
            </p>
            <ol className="mb-2 list-inside list-decimal text-sm">
              <li>
                Open a new tab and go to{" "}
                <span className="rounded bg-gray-200 px-1 font-mono">
                  chrome://extensions
                </span>
              </li>
              <li>Find &quot;Pallad Wallet&quot; in your list of extensions</li>
              <li>Toggle the switch to disable it</li>
            </ol>
            <div className="mt-2 text-sm">
              <a
                href="https://chromewebstore.google.com/detail/auro-wallet/cnmamaachppnkjgnildpdmkaakejnhae"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
                onClick={() => toast.dismiss(t.id)}
              >
                Get Auro Wallet
              </a>
            </div>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="mt-2 text-sm text-gray-500 hover:text-gray-700"
            >
              Dismiss
            </button>
          </div>
        ),
        {
          duration: 20000, // Show for 20 seconds
          position: "top-center",
        }
      );
    } else {
      networkStore.connectWallet(false);
    }
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
          <Link
            target="_blank"
            href={BUG_REPORT_URL}
            className="flex items-center gap-2 rounded-full border-primary bg-primary/30 px-5 py-2 text-xs font-medium hover:bg-primary/50"
          >
            <span>Bug Report</span>
            <Image
              src="/icons/bugReport.svg"
              width={20}
              height={20}
              alt="bug report"
            />
          </Link>
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

          <Link
            id="follow-button"
            className="ms-auto flex cursor-pointer items-center rounded-full bg-primary px-3 py-2 font-medium text-white"
            title="Follow @tileVille on X"
            href="https://discord.com/invite/NvNBQZX7rU"
            target="_blank"
          >
            <DiscordLogoIcon />
            <span className="label ms-1 whitespace-nowrap text-xs" id="l">
              Join Discord
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
                  onClick={connectWallet}
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
