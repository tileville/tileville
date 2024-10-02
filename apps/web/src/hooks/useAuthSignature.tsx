import { ACCOUNT_AUTH_LOCAL_KEY, ACCOUNT_AUTH_MESSAGE } from "@/constants";
import { useNetworkStore } from "@/lib/stores/network";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useLocalStorage } from "react-use";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { signMessage } from "@/lib/helpers";

type ShowToastFunction = (message: string, isError?: boolean) => void;

export const useAuthSignature = () => {
  const networkStore = useNetworkStore();
  const [accountAuthSignature, setAccountAuthSignature] = useLocalStorage(
    ACCOUNT_AUTH_LOCAL_KEY,
    ""
  );

  const validateOrSetSignature = useCallback(() => {
    if (!networkStore.address) {
      return networkStore.connectWallet(false);
    }
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
      signMessage(ACCOUNT_AUTH_MESSAGE)
        .then((signResult: any) => {
          const authSignatureStr = `${signResult.publicKey || ""} ${
            signResult?.signature?.scalar || ""
          } ${signResult?.signature?.field || ""}`;
          setAccountAuthSignature(authSignatureStr);

          showAuthSignatureToast("Signature added successfully.", false);
        })
        .catch((error: any) => {
          console.log("failed to set signature", error);

          if (String(error).includes("4001") || error.code === 1002) {
            showAuthSignatureToast(
              "You've declined the request to sign with your wallet. Please don't decline it.",
              true
            );
          } else {
            showAuthSignatureToast(
              "An error occurred while signing. Please try again.",
              true
            );
          }
        });
    }
  }, [networkStore.address, accountAuthSignature]);

  const showAuthSignatureToast: ShowToastFunction = (
    message,
    isError = false
  ) => {
    toast.custom(
      (t) => (
        <div className="flex w-full max-w-md items-center gap-2 rounded-lg bg-white p-3 shadow-lg">
          <div>
            {isError ? (
              <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
            ) : (
              <span className="text-green-500">✓</span>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {isError ? "Wallet Signature Error" : "Wallet Signature"}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {message}
              {isError && (
                <button
                  className="ms-1 text-blue-500"
                  onClick={validateOrSetSignature}
                >
                  Retry
                </button>
              )}
            </p>
          </div>
        </div>
      ),
      { duration: 2000 }
    );
  };

  return { validateOrSetSignature, accountAuthSignature };
};
