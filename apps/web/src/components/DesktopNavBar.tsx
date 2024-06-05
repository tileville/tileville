"use client";

import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { PrimaryButton } from "./PrimaryButton";
import { useEffect, useState } from "react";
import { MediaPlayer } from "./MediaPlayer";
import { useNetworkStore } from "@/lib/stores/network";
import { formatAddress, walletInstalled } from "@/lib/helpers";
import { HeaderCard } from "@/components/common/HeaderCard";
import NetworkPicker from "@/components/common/NetworkPicker";
import AccountCard from "@/components/common/AccountCard";

export const DesktopNavBar = ({ autoConnect }: { autoConnect: boolean }) => {
  const [focusedButtonIndex, setFocusedButtonIndex] = useState<number>(0);

  const networkStore = useNetworkStore();
  useEffect(() => {
    if (!walletInstalled()) return;

    if (autoConnect) {
      networkStore.connectWallet(true);
    }
  }, []);

  useEffect(() => {
    if (networkStore.walletConnected) {
      //Log entry
      // Show modal
    }
  }, [networkStore.walletConnected]);

  const handleFocus = (index: number) => {
    setFocusedButtonIndex(index);
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-20 mb-6 px-4 pt-2 text-black">
      <div className="flex w-full items-start justify-between">
        <div className="flex gap-3">
          <PrimaryButton
            key={1}
            onFocus={() => handleFocus(1)}
            size="sm"
            icon={<ChevronLeftIcon width={30} height={30} />}
            autoFocus={1 === focusedButtonIndex}
            href={"/main-menu"}
            className={`rounded-3xl !border !border-primary !px-6`}
          />

          <div className="min-w-[180px]">
            <MediaPlayer />
          </div>
        </div>

        <div>
          <div className="flex gap-5">
            {networkStore.walletConnected && networkStore.address ? (
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
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, label }: { to: string; label: string }) => {
  return (
    <Button variant="outline" size="3" radius="none">
      <Link href={to} className="">
        {label}
      </Link>
    </Button>
  );
};

export const AnchorNavLink = ({ to, label }: { to: string; label: string }) => {
  return (
    <Button variant="outline" size="4" radius="none">
      <a href={to} target="_blank">
        {label}
      </a>
    </Button>
  );
};
