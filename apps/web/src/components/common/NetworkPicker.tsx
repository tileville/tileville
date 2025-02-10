import { useEffect, useState } from "react";
import { NETWORKS } from "@/constants/network";
import { walletInstalled } from "@/lib/helpers";
import { useNetworkStore } from "@/lib/stores/network";

//TODO: register worker client

import { AnimatePresence, motion } from "framer-motion";
import NetworkPickerCard from "@/components/common/NetworkPickerCard";
import zekoLogo from "/public/image/cards/zekoLogo.png";
import berkleyLogo from "/public/image/cards/berkleyLogo.png";
import minaLogo from "/public/image/cards/minaLogo.png";
import Image from "next/image";
import { useSwitchNetwork } from "@/hooks/useSwitchNetwork";

export default function NetworkPicker() {
  const [expanded, setExpanded] = useState(false);
  const networkStore = useNetworkStore();
  const { switchNetwork } = useSwitchNetwork();

  useEffect(() => {
    if (!walletInstalled()) return;

    (() => {
      const listener = ({
        chainId,
        name,
        networkID,
      }: {
        chainId: string;
        name: string;
        networkID: string;
      }) => {
        console.log("chain changed", { chainId, name, networkID });
        const minaNetwork = NETWORKS.find(
          (x) =>
            (chainId != "unknown" ? x.chainId == chainId : x.name == name) ||
            x.networkID === networkID
        );
        console.log("mina network", minaNetwork);
        networkStore.setNetwork(minaNetwork);
      };

      (window.mina as any).on("chainChanged", listener);

      return () => {
        (window.mina as any).removeListener(listener);
      };
    })();
  }, [networkStore.walletConnected]);

  useEffect(() => {
    if (!walletInstalled()) return;

    (() => {
      const listener = (accounts: string[]) => {
        const [account] = accounts;
        if (networkStore.minaNetwork?.chainId)
          networkStore.setNetwork(networkStore.minaNetwork);
        networkStore.onWalletConnected(account);
      };

      (window.mina as any).on("accountsChanged", listener);

      return () => {
        (window.mina as any).removeListener(listener);
      };
    })();
  }, []);

  return (
    <div className="relative">
      <NetworkPickerCard
        text={networkStore.minaNetwork?.name || "Unsupported network"}
        image={
          networkStore.minaNetwork?.chainId === "zeko"
            ? zekoLogo
            : networkStore.minaNetwork?.chainId === "devnet"
            ? berkleyLogo
            : minaLogo
        }
        onClick={() => setExpanded(!expanded)}
        toggle={true}
        expanded={expanded}
      />
      <AnimatePresence initial={false} mode={"wait"}>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0 }}
            className="border-left-accent bg-bg-dark absolute top-[90%] flex w-full flex-col items-center overflow-hidden rounded-b"
          >
            {NETWORKS.map((network) => (
              <div
                key={network.chainId}
                className="text-header-menu flex h-full w-full cursor-pointer flex-row items-center gap-2 py-3 pl-2 text-foreground last:rounded-b hover:font-semibold hover:text-black"
                onClick={() => {
                  switchNetwork(network);
                  setExpanded(false);
                }}
              >
                <Image
                  src={minaLogo}
                  className={
                    "group-hover:border-left-accent rounded-[5px] border border-foreground w-3 h-3 md:w-6 md:h-6"
                  }
                  alt={""}
                  width={24}
                  height={24}
                />
                <span>{network.name}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
