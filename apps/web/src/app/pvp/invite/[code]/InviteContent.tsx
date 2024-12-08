"use client";
import { useInviteChallenge, useJoinChallenge } from "@/db/react-query-hooks";
import { useEffect } from "react";
import { Dialog } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { formatAddress } from "@/lib/helpers";
import { Spinner2 } from "@/components/common/Spinner";
// import { useNetworkStore } from "@/lib/stores/network";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useNetworkStore } from "@/lib/stores/network";
import toast from "react-hot-toast";
import { CountdownTimerSmall } from "@/components/common/CountdownTimerSmall";

export default function InviteContent({ code }: { code: string }) {
  const router = useRouter();
  const networkStore = useNetworkStore();
  const { data: challenge, isLoading } = useInviteChallenge(code);
  const joinChallengeMutation = useJoinChallenge();

  useEffect(() => {
    if (!code) {
      router.push("/pvp");
    }
  }, [code, router]);

  const handleJoinChallenge = async () => {
    if (!networkStore.address) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      await joinChallengeMutation.mutateAsync({
        challenge_id: challenge.data.id,
        wallet_address: networkStore.address,
      });

      toast.success("Successfully joined the challenge!");
      // Redirect to the challenge page or PVP home
      router.push("/pvp");
    } catch (error: any) {
      toast.error(error.message || "Failed to join challenge");
    }
  };

  return (
    <Dialog.Root open={true}>
      <Dialog.Content className="relative !m-0 !max-w-[500px] !rounded-md !bg-[#C6D4A8] !p-8">
        <div className="flex flex-col items-center gap-4">
          {/* <Image
            src="/icons/invitation.svg"
            width={80}
            height={80}
            alt="invitation"
          /> */}

          {isLoading ? (
            "Loading..."
          ) : (
            <>
              <div className="text-center">
                <h2 className="text-2xl font-bold">
                  {formatAddress(challenge.data.created_by)}
                </h2>
                <h3 className="text-xl">Invited You</h3>
              </div>

              <p className="text-center text-sm">
                You have been invited by{" "}
                <span className="font-semibold">
                  {formatAddress(challenge.data.created_by)}
                </span>{" "}
                to join the challenge:{" "}
                <span className="font-semibold">{challenge.data.name}</span>
              </p>

              <div className="w-full">
                <h3 className="text-2xl font-bold">{challenge.data.name}</h3>
                <button className="ml-auto flex items-center rounded-md bg-primary/30 px-3 py-1 text-sm">
                  copy link
                </button>
              </div>

              <div className="grid w-full grid-cols-3 gap-4">
                <div className="flex flex-col items-center rounded-lg bg-[#9AB579] bg-opacity-30 p-4">
                  {/* <Image
                src="/icons/timer.svg"
                width={24}
                height={24}
                alt="timer"
              /> */}
                  <p className="mt-2 text-sm font-medium">Time remaining</p>
                  <p>
                    <CountdownTimerSmall endTime={challenge.data.end_time} />
                  </p>
                </div>

                <div className="flex flex-col items-center rounded-lg bg-[#9AB579] bg-opacity-30 p-4">
                  {/* <Image
                src="/icons/mina.svg"
                width={24}
                height={24}
                alt="entry fees"
              /> */}
                  <p className="mt-2 text-sm font-medium">Entry Fees</p>
                  <p>{challenge.data.entry_fee} MINA</p>
                </div>

                {challenge.data.is_speed_challenge && (
                  <div className="flex flex-col items-center rounded-lg bg-[#9AB579] bg-opacity-30 p-4">
                    <Image
                      src="/icons/speed.svg"
                      width={24}
                      height={24}
                      alt="speed"
                    />
                    <p className="mt-2 text-sm font-medium">Speed Challenge</p>
                    <p>{challenge.data.speed_duration} seconds</p>
                  </div>
                )}
              </div>

              <div className="w-full">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">
                    Participants ({challenge.data.participants?.length || 0})
                  </h3>
                  <ChevronDownIcon className="h-5 w-5" />
                </div>
              </div>

              <button
                onClick={handleJoinChallenge}
                disabled={joinChallengeMutation.isLoading}
                className="mt-4 w-full rounded-lg bg-[#38830A] py-3 text-lg font-semibold text-white hover:bg-[#38830A]/90 disabled:opacity-50"
              >
                {joinChallengeMutation.isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Spinner2 />
                    <span>Joining...</span>
                  </div>
                ) : (
                  `Pay Entry Fees (${challenge.data.entry_fee} MINA)`
                )}
              </button>
            </>
          )}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
