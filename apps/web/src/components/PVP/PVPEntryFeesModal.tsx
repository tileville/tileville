import { Dialog, Flex } from "@radix-ui/themes";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useNetworkStore } from "@/lib/stores/network";
// import { usePosthogEvents } from "@/hooks/usePosthogEvents";
import { usePayPVPFees } from "@/hooks/usePayPVPFees";

type PVPEntryFeesModalProps = {
  open: boolean;
  handleClose: () => void;
  entryFee: number;
  challengeId: string;
};

//TODO: Handle Loading states

export const PVPEntryFeesModal = ({
  open,
  handleClose,
  entryFee,
  challengeId,
}: PVPEntryFeesModalProps) => {
  let timeoutId: NodeJS.Timeout;
  const networkStore = useNetworkStore();
  const { payPVPFees } = usePayPVPFees();

  const router = useRouter();
  //TODO: Add new posthog events for challenge
  //   const {
  //     joinedCompetition: [logJoinCompetition],
  //   } = usePosthogEvents();

  const handlePayParticipationFess = async () => {
    if (!networkStore.address) {
      return networkStore.connectWallet(false);
    }
    // logJoinCompetition({
    //   walletAddress: networkStore.address,
    //   competition_name: competition.name,
    //   network: networkStore.minaNetwork?.networkID || "berkeley",
    // });
    const data = await payPVPFees({
      participation_fee: entryFee ?? 0,
      challenge_id: challengeId,
    });

    if (data.success) {
      toast(
        `You have joined the challenge successfully. Redirecting you to the game screen now.`
      );
      timeoutId = setTimeout(() => {
        router.push(`/pvp`);
      }, 3000);
      handleClose();
    } else {
      toast(data.message);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Dialog.Root open={open}>
      <Dialog.Content style={{ maxWidth: 450 }} className="dialog-content-v1">
        <Dialog.Title>Pay Participation Fees</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          You need to pay one time participation fees of {entryFee} MINA token
          to join create this competition.
        </Dialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <button
              className="h-10 rounded-md border-primary bg-primary/30 px-5 py-2 text-sm font-medium hover:bg-primary/50"
              onClick={handleClose}
            >
              Cancel
            </button>
          </Dialog.Close>
          <Dialog.Close>
            <button
              onClick={handlePayParticipationFess}
              className="rounded-md bg-primary px-3 text-sm font-medium text-white hover:bg-primary/90"
            >
              {!!networkStore.address ? "Pay Entry Fees" : "Connect Wallet"}
            </button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
