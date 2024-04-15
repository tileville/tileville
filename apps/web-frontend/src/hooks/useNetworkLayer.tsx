import { useCallback, useContext, useEffect, useState } from "react";
import { ChainContext, SignerContext } from "../contexts";
import {
  SendTransactionResult,
  ProviderError,
} from "@aurowallet/mina-provider";
import toast from "react-hot-toast";
import { GAME_ENTRY_FEE_KEY, TREASURY_ADDRESS } from "../constants";
import { Network } from "../types";
import { useSessionStorage } from "react-use";

export const useNetworkLayer = () => {
  const { signer, setSigner } = useContext(SignerContext);
  const { chain, setChain } = useContext(ChainContext);
  const [resHash, setResHash] = useState("");
  const [, setIsEntryFeeFaid] = useSessionStorage(GAME_ENTRY_FEE_KEY, false);
  useEffect(() => {
    const mina = (window as any).mina;
    if (mina) {
      mina.on("chainChanged", (network: Network) => {
        setChain({ chainId: network.chainId, chainName: network.name });
      });
    }
  }, []);

  const connect = useCallback(async () => {
    if (typeof (window as any).mina == "undefined") {
      toast("Please install Auro wallet extension!");
    } else {
      const accounts = await (window as any).mina.requestAccounts();
      const network = await (window as any).mina.requestNetwork();
      setSigner(accounts[0]);
      setChain({ chainId: network.chainId, chainName: network.name });
    }
  }, []);

  const transferEntryFee = useCallback(async () => {
    if (!signer) {
      toast("Please connect your wallet first");
    }
    try {
      const data: SendTransactionResult | ProviderError = await (
        window as any
      )?.mina?.sendPayment({
        amount: 2,
        to: TREASURY_ADDRESS,
        memo: "minapolis game",
      });
      const hash = (data as SendTransactionResult).hash;
      if (hash) {
        console.log("response hash", hash);
        setResHash(hash);
        setIsEntryFeeFaid(true);
      } else {
        toast((data as ProviderError).message || "");
      }
    } catch (err) {
      toast("Failed to transfer entry fees😭");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signer]);

  return {
    connect,
    transferEntryFee,
    signer,
    resHash,
    chain,
  };
};
