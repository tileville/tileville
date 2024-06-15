import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useNetworkStore, useParticipationFee } from "@/lib/stores/network";
import { type Competition } from "@/app/competitions/page";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

let timeoutId: NodeJS.Timeout;
export const GameEntryFeesModal = ({
  open,
  handleClose,
  competition,
}: {
  open: boolean;
  handleClose: () => void;
  competition: Competition;
}) => {
  const networkStore = useNetworkStore();
  const { payParticipationFees } = useParticipationFee();
  const router = useRouter();

  const handlePayParticipationFess = async () => {
    if (!networkStore.address) {
      return networkStore.connectWallet(false);
    }
    const data = await payParticipationFees(
      competition.participation_fee ?? 0,
      "B62qqhL8xfHBpCUTk1Lco2Sq8HitFsDDNJraQG9qCtWwyvxcPADn4EV",
      competition.unique_keyname
    );
    if (data?.id) {
      toast(
        `You have joined the ${competition.name} competition successfully. Redirecting you to the game screen now.`
      );
      timeoutId = setTimeout(() => {
        router.push(
          `/competitions/${competition.unique_keyname}/game/${data.id}`
        );
      }, 3000);
      handleClose();
    } else {
      toast(
        `Operation failed. If amount deducted from your wallet, please reach out to support handles mentioned in FAQ page.`
      );
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Dialog.Root open={open}>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Pay Participation Fees</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          You need to pay one time participation fees of{" "}
          {competition.participation_fee} MINA token to join{" "}
          <strong>{competition.name}</strong> competition.
        </Dialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray" onClick={handleClose}>
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={handlePayParticipationFess} color="blue">
              {!!networkStore.address ? "Pay Entry Fees" : "Connect Wallet"}
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
