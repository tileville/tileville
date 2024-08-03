import {
  ACCOUNT_AUTH_LOCALSTORAGE_KEY,
  ACCOUNT_AUTH_MESSAGE,
} from "@/constants";
import { useNetworkStore } from "@/lib/stores/network";
import { useCallback, useEffect } from "react";
import { useLocalStorage } from "react-use";

export const useAuthSignature = () => {
  const networkStore = useNetworkStore();
  const [accountAuthSignature, setSignature, deleteSignature] = useLocalStorage(
    ACCOUNT_AUTH_LOCALSTORAGE_KEY,
    ""
  );

  const setSignatureFn = useCallback(() => {
    (window as any).mina
      ?.signMessage({
        message: ACCOUNT_AUTH_MESSAGE,
      })
      .then((signResult: any) => {
        const authSignatureStr = `${signResult.publicKey || ""} ${
          signResult?.signature?.scalar || ""
        } ${signResult?.signature?.field || ""}`;
        setSignature(authSignatureStr);
      })
      .catch((error: any) => {
        console.log("failed to set signature", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (networkStore.walletConnected) {
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
        setSignatureFn();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [networkStore.walletConnected]);

  return { setSignatureFn, accountAuthSignature, deleteSignature };
};
