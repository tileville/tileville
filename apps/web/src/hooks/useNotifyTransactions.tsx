import { useChainStore } from "./useChainStore";
import { useClientStore } from "./useClientStore";
import { useWalletStore } from "./useWalletStore";
import { toast } from "react-hot-toast";
import { usePrevious } from "react-use";
import { useMemo, useCallback, useEffect } from "react";
import { PendingTransaction, UnsignedTransaction } from "@proto-kit/sequencer";
import { MethodIdResolver } from "@proto-kit/module";
import truncateMiddle from "truncate-middle";
import { Field, UInt64, PublicKey, Signature } from "o1js";

export const useNotifyTransactions = () => {
  const wallet = useWalletStore();
  const chain = useChainStore();
  const client = useClientStore();

  const previousPendingTransactions = usePrevious(wallet.pendingTransactions);
  const newPendingTransactions = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return wallet.pendingTransactions.filter(
      (pendingTransaction) =>
        !(previousPendingTransactions ?? []).includes(pendingTransaction)
    );
  }, [wallet.pendingTransactions, previousPendingTransactions]);

  const notifyTransaction = useCallback(
    (
      status: "PENDING" | "CONFIRMED" | "FAILURE",
      transaction: UnsignedTransaction | PendingTransaction
    ) => {
      if (!client.client) return;

      const methodIdResolver = client.client.resolveOrFail(
        "MethodIdResolver",
        MethodIdResolver
      );

      const resolvedMethodDetails = methodIdResolver.getMethodNameFromId(
        transaction.methodId.toBigInt()
      );

      if (!resolvedMethodDetails)
        throw new Error("Unable to resolve method details");

      const [moduleName, methodName] = resolvedMethodDetails;

      const hash = truncateMiddle(transaction.hash().toString(), 15, 15, "...");

      function title() {
        switch (status) {
          case "PENDING":
            return `⏳ Transaction sent: ${moduleName}.${methodName}`;
          case "CONFIRMED":
            return `✅ Transaction successful: ${moduleName}.${methodName}`;
          case "FAILURE":
            return `❌ Transaction failed: ${moduleName}.${methodName}`;
        }
      }

      toast(`${title()} : Hash ${hash}`);
    },
    [client.client]
  );

  // notify about new pending transactions
  useEffect(() => {
    newPendingTransactions.forEach((pendingTransaction) => {
      notifyTransaction("PENDING", pendingTransaction);
    });
  }, [newPendingTransactions, notifyTransaction]);

  // notify about transaction success or failure
  useEffect(() => {
    const confirmedTransactions = chain.block?.txs?.map(
      ({ tx, status, statusMessage }) => {
        return {
          tx: new PendingTransaction({
            methodId: Field(tx.methodId),
            nonce: UInt64.from(tx.nonce),
            sender: PublicKey.fromBase58(tx.sender),
            argsFields: tx.argsFields.map((arg) => Field(arg)),
            argsJSON: tx.argsJSON,
            signature: Signature.fromJSON({
              r: tx.signature.r,
              s: tx.signature.s,
            }),
            isMessage: false,
          } as any),
          status,
          statusMessage,
        };
      }
    );

    const confirmedPendingTransactions = confirmedTransactions?.filter(
      ({ tx }) => {
        return wallet.pendingTransactions?.find((pendingTransaction) => {
          return pendingTransaction.hash().toString() === tx.hash().toString();
        });
      }
    );

    confirmedPendingTransactions?.forEach(({ tx, status }) => {
      wallet.removePendingTransaction(tx);
      notifyTransaction(status ? "CONFIRMED" : "FAILURE", tx);
    });
  }, [
    chain.block,
    wallet.pendingTransactions,
    client.client,
    notifyTransaction,
  ]);
};
