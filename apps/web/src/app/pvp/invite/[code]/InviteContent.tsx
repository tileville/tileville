"use client";
import {
  useInviteChallenge,
  useJoinChallenge,
  useUsername,
} from "@/db/react-query-hooks";
import { useEffect, useState } from "react";
import { Dialog, Skeleton } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { copyToClipBoard, formatAddress } from "@/lib/helpers";
import { Spinner2 } from "@/components/common/Spinner";
// import { useNetworkStore } from "@/lib/stores/network";
import { useNetworkStore } from "@/lib/stores/network";
import toast from "react-hot-toast";
import { CountdownTimerSmall } from "@/components/common/CountdownTimerSmall";
import Link from "next/link";
import { ParticipantsList } from "@/components/PVP/ParticipantsList";
import clsx from "clsx";
import { usePayPVPFees } from "@/hooks/usePayPVPFees";
import { ChallengeParticipant } from "@/types";
import { isMobile } from "react-device-detect";
import { InviteContentMobileWarning } from "@/components/PVP/InviteContentMobileWarning";
import { usePosthogEvents } from "@/hooks/usePosthogEvents";

export default function InviteContent({ code }: { code: string }) {
  const router = useRouter();
  const networkStore = useNetworkStore();
  const { data: challenge, isLoading } = useInviteChallenge(code);
  const joinChallengeMutation = useJoinChallenge();
  const { data: username, isLoading: usernameLoading } = useUsername(
    challenge?.data?.created_by || ""
  );
  const [isParticipantsListOpen, setIsParticipantsListOpen] = useState(false);
  const [payLoading, setPayLoading] = useState(false);
  const { payPVPFees } = usePayPVPFees();
  const {
    joinedPVPChallenge: [logJoinChallenge, logJoinChallengeError],
  } = usePosthogEvents();

  const isNormalMobileBrowser = !window.mina && isMobile;

  useEffect(() => {
    if (!code) {
      router.push("/pvp");
    }
  }, [code, router]);

  const getUserParticipantStatus = () => {
    return challenge?.data?.participants?.find(
      (p: ChallengeParticipant) => p.wallet_address === networkStore.address
    );
  };
  const userParticipant = getUserParticipantStatus();

  // Update the handleJoinChallenge function
  const handleJoinChallenge = async () => {
    if (!networkStore.address) {
      return networkStore.connectWallet(false);
    }

    setPayLoading(true);
    try {
      let joinChallengeResponse;
      if (!userParticipant) {
        joinChallengeResponse = await joinChallengeMutation.mutateAsync({
          challenge_id: challenge.data.id,
          wallet_address: networkStore.address,
        });

        logJoinChallenge({
          walletAddress: networkStore.address,
          challengeId: challenge.data.id,
          challengeName: challenge.data.name,
          isSpeedChallenge: challenge.data.is_speed_challenge,
          entryFee: challenge.data.entry_fee,
        });
      }

      if (joinChallengeResponse?.success || userParticipant) {
        const paymentResult = await payPVPFees({
          participation_fee: challenge.data.entry_fee ?? 0,
          challenge_id: challenge.data.id,
        });

        if (paymentResult.success) {
          toast.success("Successfully joined the challenge!");
          router.push("/pvp");
        } else {
          logJoinChallengeError(`Payment failed: ${paymentResult.message}`);
          toast.error(paymentResult.message || "Payment failed");
        }
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      logJoinChallengeError(errorMessage);
      toast.error(errorMessage || "Failed to join challenge");
    } finally {
      setPayLoading(false);
    }
  };

  const renderActionButton = () => {
    if (!networkStore.address) {
      return (
        <button
          onClick={() => networkStore.connectWallet(false)}
          className="mt-4 w-full rounded-lg bg-[#38830A] py-2 text-sm font-semibold text-white hover:bg-[#38830A]/90 md:py-3 md:text-lg"
        >
          Connect Wallet
        </button>
      );
    }

    if (userParticipant) {
      // If user has already played
      if (userParticipant.has_played) {
        return (
          <button
            disabled
            className="mt-4 w-full rounded-lg bg-gray-500 py-2 text-sm font-semibold text-white opacity-50 md:py-3 md:text-lg"
          >
            Already Played
          </button>
        );
      }

      // If payment is confirmed and ready to play
      if (userParticipant.txn_status === "CONFIRMED") {
        return (
          <button
            onClick={() => router.push(`/pvp/${challenge.data.id}/game`)}
            className="mt-4 w-full rounded-lg bg-[#38830A] py-2 text-sm font-semibold text-white hover:bg-[#38830A]/90 md:py-3 md:text-lg"
          >
            Play Now
          </button>
        );
      }

      // If payment is pending
      if (userParticipant.txn_status === "PENDING") {
        return (
          <button
            disabled
            className="mt-4 w-full rounded-lg bg-[#38830A] py-2 text-sm font-semibold text-white opacity-70 md:py-3 md:text-lg"
          >
            Payment Processing...
          </button>
        );
      }

      // If payment failed, allow retry
      if (userParticipant.txn_status === "FAILED") {
        return (
          <button
            onClick={handleJoinChallenge}
            disabled={payLoading || joinChallengeMutation.isLoading}
            className="mt-4 w-full rounded-lg bg-[#38830A] py-2 text-sm font-semibold text-white hover:bg-[#38830A]/90 disabled:opacity-50 md:py-3 md:text-lg"
          >
            Retry Payment
          </button>
        );
      }
    }

    // Default case: New participant joining
    return (
      <button
        onClick={handleJoinChallenge}
        disabled={payLoading || joinChallengeMutation.isLoading}
        className="mt-4 w-full rounded-lg bg-[#38830A] py-3 text-lg font-semibold text-white hover:bg-[#38830A]/90 disabled:opacity-50"
      >
        {payLoading || joinChallengeMutation.isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <Spinner2 />
            <span>{payLoading ? "Processing Payment..." : "Joining..."}</span>
          </div>
        ) : (
          `Pay Entry Fees (${challenge.data.entry_fee} MINA)`
        )}
      </button>
    );
  };

  return (
    <Dialog.Root open={true}>
      <Dialog.Content className="relative !m-0 !min-h-[523px] !max-w-[560px] !rounded-md !bg-[#A6B97B] !px-2 !py-4  sm:!p-8">
        <div className="flex !min-h-[523px] flex-col items-center justify-center gap-2 text-sm md:gap-4 md:text-base">
          {isLoading ? (
            <Spinner2 />
          ) : (
            <>
              <div className="text-center">
                {isNormalMobileBrowser && (
                  <InviteContentMobileWarning inviteCode={code} />
                )}

                <Link
                  href="/pvp"
                  className="absolute right-2 top-2 text-xs underline hover:no-underline"
                >
                  open player vs player mode
                </Link>
                <div className="mb-2 flex items-center justify-center">
                  <Image
                    src="/icons/invitation.png"
                    width={80}
                    height={80}
                    alt="invitation"
                    className="h-10 w-10 md:h-20 md:w-20"
                  />
                </div>

                <h2 className="text-lg font-bold md:text-2xl">
                  {usernameLoading ? (
                    <Skeleton />
                  ) : username ? (
                    <Link
                      href={`${window.location.origin}/u/${username}`}
                      className="underline hover:no-underline"
                      target="_blank"
                    >
                      {username}
                    </Link>
                  ) : (
                    formatAddress(challenge.data.created_by)
                  )}
                </h2>

                <h3 className="text-xl">Invited You</h3>
              </div>

              <p className="text-center text-sm">
                You have been invited by{" "}
                <span className="font-semibold">
                  {formatAddress(challenge.data.created_by)}
                </span>{" "}
                to join the <br /> challenge:{" "}
                <span className="font-semibold">{challenge.data.name}</span>
              </p>

              <div className="flex w-full items-center justify-between">
                <h3 className="text-lg font-bold md:text-2xl">
                  {challenge.data.name}
                </h3>
                <button
                  className="ml-auto flex items-center rounded-md bg-primary/30 px-3 py-1 text-sm"
                  onClick={() =>
                    copyToClipBoard({
                      toCopyContent: window.location.href,
                      copiedType: "Invite Link",
                    })
                  }
                >
                  copy link
                </button>
              </div>

              <div className="grid w-full grid-cols-3 gap-1 md:gap-4">
                <div className="flex flex-col rounded-lg border border-[#76993E] bg-[#9AB579] p-2 md:p-4">
                  <Image
                    src="/icons/timer.png"
                    width={27}
                    height={27}
                    alt="timer"
                  />
                  <p className="my-1 text-base font-bold md:text-xl">
                    Time <br /> remaining
                  </p>
                  <p className="mt-auto">
                    <CountdownTimerSmall endTime={challenge.data.end_time} />
                  </p>
                </div>

                <div className="flex flex-col rounded-lg border border-[#76993E] bg-[#9AB579] p-2 md:p-4">
                  <Image
                    src="/icons/cashCoin.png"
                    width={27}
                    height={27}
                    alt="entry fees"
                  />
                  <p className="my-1 text-base font-bold md:text-xl">
                    Entry <br /> Fees
                  </p>
                  <p className="mt-auto">{challenge.data.entry_fee} MINA</p>
                </div>

                {challenge.data.is_speed_challenge && (
                  <div className="flex flex-col rounded-lg border border-[#76993E] bg-[#9AB579] p-2 md:p-4">
                    <Image
                      src="/icons/rocket.png"
                      width={27}
                      height={27}
                      alt="speed"
                    />
                    <p className="my-1 text-base font-bold md:text-xl">
                      Speed <br /> Challenge
                    </p>
                    <p className="mt-auto">
                      {challenge.data.speed_duration} seconds
                    </p>
                  </div>
                )}
              </div>

              <div className="w-full">
                <button
                  onClick={() =>
                    setIsParticipantsListOpen(!isParticipantsListOpen)
                  }
                  className="flex w-full items-center justify-between rounded-lg px-4 py-1 transition-all hover:bg-primary/10"
                >
                  <h3 className="text-base font-bold md:text-xl">
                    Participants ({challenge?.data?.participants?.length || 0})
                  </h3>
                  <span
                    className={clsx(
                      "origin-center transform text-4xl font-bold transition-transform duration-300",
                      isParticipantsListOpen ? "rotate-180" : ""
                    )}
                  >
                    &#9662;
                  </span>
                </button>

                <div
                  className={clsx(
                    "participants-dropdown",
                    isParticipantsListOpen && "open"
                  )}
                >
                  <ParticipantsList
                    participants={challenge?.data?.participants || []}
                    winner={null}
                  />
                </div>
              </div>
              {renderActionButton()}
              <p className="mt-3 text-center text-xs text-[#5D6845] md:mt-6 md:text-sm">
                Note: A fee of 1 MINA will be deducted from the total prize pool
                to cover the cost of creating the challenge.
              </p>
            </>
          )}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
