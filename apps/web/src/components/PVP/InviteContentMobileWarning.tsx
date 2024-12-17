import { generateAuroWalletDeepLinkForChallengeInvite } from "@/lib/helpers";
import Image from "next/image";
import Link from "next/link";

type InviteContentMobileWarningType = {
  inviteCode: string;
};

export const InviteContentMobileWarning = ({
  inviteCode,
}: InviteContentMobileWarningType) => {
  return (
    <div className="mb-6 rounded-xl bg-[#38830A]/10 p-4 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <div className="rounded-full bg-[#38830A] p-2">
          <Image
            src="/icons/mobileWarning.svg"
            width={24}
            height={24}
            alt="mobile"
            className="h-6 w-6"
          />
        </div>
        <div>
          <h3 className="mb-2 text-lg font-bold text-[#38830A]">
            Opening from Mobile Browser
          </h3>
          <p className="mb-3 text-sm text-[#38830A]/80">
            For the best gaming experience, we recommend:
          </p>
          <ul className="space-y-2 text-left text-sm text-[#38830A]/80">
            <li className="flex gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#38830A]/20">
                1
              </span>
              Opening this link on a desktop browser
            </li>
            <li className="flex gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#38830A]/20">
                2
              </span>
              <span>
                Or paste this link in the{" "}
                <Link
                  href={generateAuroWalletDeepLinkForChallengeInvite(
                    inviteCode
                  )}
                  target="_blank"
                  className="font-medium underline hover:no-underline"
                >
                  Auro mobile app browser
                </Link>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
