"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { TILEVILLE_BOT_URL } from "@/constants";
import { copyToClipBoard, generateAuroWalletDeepLink } from "@/lib/helpers";
import { isMobile } from "react-device-detect";
import Link from "next/link";
import Image from "next/image";
import { useWalletVerification } from "@/hooks/useWalletVerification";
import toast from "react-hot-toast";
import { CopyIcon } from "@radix-ui/react-icons";

export default function VerifyContent() {
  const searchParams = useSearchParams();
  const chatId = searchParams.get("chatId");

  const {
    handleVerification,
    getButtonText,
    isProcessing,
    isSuccess,
    isAuroWalletBrowser,
  } = useWalletVerification(chatId);

  useEffect(() => {
    if (!chatId) {
      toast.error("Invalid verification link");
    }
  }, [chatId]);

  const handleButtonClick = () => {
    if (isMobile && !isAuroWalletBrowser) {
      window.location.href = generateAuroWalletDeepLink(chatId || "");
    } else {
      handleVerification();
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 font-roboto">
      <div className="w-full max-w-[588px] rounded-xl bg-[#99B579] px-8 py-12 text-center shadow-[0px_4px_4px_0px_#00000040]">
        {isSuccess ? (
          <>
            <div className="flex items-center justify-center">
              <Image
                src="/img/gifs/congrats.gif"
                width={165}
                height={165}
                alt="congrats"
              />
            </div>
            <h1 className="mb-6 text-[28px] font-bold">
              Account Connected Successfully !!
            </h1>

            <p className="mb-6 text-xl text-[#494949]">
              Your wallet has been verified. Redirecting you to the bot...
            </p>
            <Link
              href={TILEVILLE_BOT_URL}
              className="primary-button-styles-lg flex items-center justify-center md:min-h-[64px]"
            >
              Return to BOT
            </Link>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center">
              <Image
                src="/img/gifs/mayor.gif"
                width={165}
                height={165}
                alt="mayor"
              />
            </div>
            <h1 className="mb-6 text-[28px] font-bold">Verify Your Account</h1>

            {isMobile && window.mina && (
              <p className="mb-3 text-sm text-[#494949] md:mb-6 md:text-xl">
                Connect your wallet and complete the account verification on
                TileVille.
              </p>
            )}

            {isMobile && !window.mina && (
              <p className="mb-3 text-sm text-[#494949]">
                Copy the verification link and tap &quot;Open Auro App&quot; to
                continue. Paste the link in Auro app&apos;s browser to connect
                your wallet and complete verification.
                <br />
                <br />
                Note: Your regular mobile browser cannot connect to wallets
                directly. Using Auro app&apos;s built-in browser allows secure
                wallet connection.
              </p>
            )}
            {window.mina && (
              <button
                onClick={handleVerification}
                disabled={isProcessing}
                className="primary-button-styles-lg md:min-h-[64px]"
              >
                {getButtonText()}
              </button>
            )}

            {isMobile && !window.mina && (
              <div className="mt-6 flex flex-col gap-4">
                <button
                  className="primary-button-styles-lg flex items-center justify-center gap-4"
                  onClick={() => {
                    copyToClipBoard({
                      toCopyContent: window.location.href,
                      copiedType: "URL",
                    });
                  }}
                >
                  Copy Verification Link
                  <CopyIcon className="h-5 w-5" />
                </button>

                <Link
                  href={generateAuroWalletDeepLink(chatId || "")}
                  className="primary-button-styles-lg"
                >
                  Open Auro App
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
