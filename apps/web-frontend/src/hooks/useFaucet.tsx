import { useCallback } from "react";
import { useBalancesStore } from "./useBalance";
import { useClientStore } from "./useClientStore";
import { useWalletStore } from "./useWalletStore";

export const useFaucet = () => {
  const client = useClientStore();
  const balances = useBalancesStore();
  const wallet = useWalletStore();

  return useCallback(async () => {
    if (!client.client || !wallet.wallet) return;

    const pendingTransaction = await balances.faucet(
      client.client,
      wallet.wallet
    );

    wallet.addPendingTransaction(pendingTransaction);
  }, [client.client, wallet, balances]);
};
