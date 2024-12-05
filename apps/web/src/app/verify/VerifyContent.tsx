"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { PRIMARY_BUTTON_STYLES_LG, TILEVILLE_BOT_URL } from "@/constants";
import { generateAuroWalletDeepLink } from "@/lib/helpers";
import { isMobile } from "react-device-detect";
import Link from "next/link";
import Image from "next/image";
import { useWalletVerification } from "@/hooks/useWalletVerification";
import toast from "react-hot-toast";

export default function VerifyContent() {
  const searchParams = useSearchParams();
  const chatId = searchParams.get("chatId");

  const { handleVerification, getButtonText, isProcessing, isSuccess } =
    useWalletVerification(chatId);

  useEffect(() => {
    if (!chatId) {
      toast.error("Invalid verification link");
    }
  }, [chatId]);

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
              className={`${PRIMARY_BUTTON_STYLES_LG} flex items-center justify-center md:min-h-[64px]`}
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

            <p className="mb-3 text-sm text-[#494949] md:mb-6 md:text-xl">
              Connect your wallet and complete the account verification on
              TileVille.
            </p>

            <button
              onClick={handleVerification}
              disabled={isProcessing}
              className={`${PRIMARY_BUTTON_STYLES_LG} md:min-h-[64px]`}
            >
              {getButtonText()}
            </button>

            {isMobile && (
              <div className="">
                <p className="mb-3 mt-12 text-sm text-[#494949] md:mb-6 md:text-xl">
                  To Verify, Please Open this link in Auro Mobile Wallet
                </p>

                <Link
                  className={`${PRIMARY_BUTTON_STYLES_LG} flex items-center justify-center md:min-h-[64px]`}
                  href={generateAuroWalletDeepLink(chatId || "")}
                >
                  Open with Auro Mobile Wallet
                </Link>
              </div>
            )}
          </>
        )}
      </div>

      {isMobile && !isSuccess && (
        <p className="mt-12">Note: Ignore if Already open in mobile wallet</p>
      )}
    </div>
  );
}
