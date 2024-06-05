import { useEffect, useState } from "react";
import { NETWORKS, Network } from "@/constants/network";
import { walletInstalled } from "@/lib/helpers";
import { useNetworkStore } from "@/lib/stores/network";

//TODO: register worker client

import { AnimatePresence, motion } from "framer-motion";
import NetworkPickerCard from "@/components/common/NetworkPickerCard";
import zekoLogo from "/public/image/cards/zekoLogo.svg";
import berkleyLogo from "/public/image/cards/berkleyLogo.svg";
import minaLogo from "/public/image/cards/minaLogo.svg";
import Image from "next/image";

export default function NetworkPicker() {
  const [expanded, setExpanded] = useState(false);
  const networkStore = useNetworkStore();

  const switchNetwork = async (network: Network) => {
    console.log("Switching to", network);
    try {
      if (network.chainId == "zeko") {
        (window.mina as any).addChain({
          url: "https://devnet.zeko.io/graphql",
          name: "Zeko",
        });
      }

      await (window as any).mina.switchChain({
        chainId: network.chainId,
      });
      networkStore.setNetwork(network);
      setExpanded(false);
    } catch (e: any) {
      if (e?.code == 1001) {
        await (window as any).mina.requestAccounts();
        await switchNetwork(network);
      }
      throw e;
    }
  };

  useEffect(() => {
    if (!walletInstalled()) return;

    (() => {
      const listener = ({
        chainId,
        name,
      }: {
        chainId: string;
        name: string;
      }) => {
        const minaNetwork = NETWORKS.find((x) =>
          chainId != "unknown" ? x.chainId == chainId : x.name == name
        );
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
            : networkStore.minaNetwork?.chainId === "berkeley"
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
                onClick={() => switchNetwork(network)}
              >
                <Image
                  src={
                    network.chainId === "zeko"
                      ? zekoLogo
                      : network.chainId === "berkeley"
                      ? berkleyLogo
                      : minaLogo
                  }
                  className={
                    "group-hover:border-left-accent rounded-[5px] border border-foreground"
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
