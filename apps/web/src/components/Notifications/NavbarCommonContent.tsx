import AccountCard from "../common/AccountCard";
import NetworkPicker from "../common/NetworkPicker";
import { formatAddress, walletInstalled } from "@/lib/helpers";
import { HeaderCard } from "../common/HeaderCard";
import Link from "next/link";
import { useMountedState } from "react-use";
import { useNetworkStore } from "@/lib/stores/network";
import { useUsername } from "@/db/react-query-hooks";
import NotificationBadge from "./NotificationBadge";

export const NavbarCommonContent = () => {
  const isMounted = useMountedState();
  const networkStore = useNetworkStore();
  const { data: username } = useUsername(networkStore?.address);

  return (
    <div className="ms-auto flex gap-2 text-xs md:ms-0 md:gap-5 md:text-base">
      {isMounted() &&
        (networkStore.walletConnected && networkStore.address ? (
          <>
            {/* Add the notification badge component */}
            <NotificationBadge />
            
            <Link
              href={`/u/${username ? `${username}` : networkStore.address}`}
            >
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
            <HeaderCard svg={"account"} text="Install wallet" isMiddle={true} />
          </Link>
        ))}
    </div>
  );
};