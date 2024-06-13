import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useNetworkLayer } from "@/hooks/useNetworkLayer";
import { FAUCET_URL } from "@/constants";
import { useNetworkStore, useParticipationFee } from "@/lib/stores/network";
import { type Competition } from "@/app/competitions/page";

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
            <Button
              onClick={
                !!networkStore.address
                  ? async () => {
                      await payParticipationFees(
                        competition.participation_fee ?? 0,
                        "B62qqhL8xfHBpCUTk1Lco2Sq8HitFsDDNJraQG9qCtWwyvxcPADn4EV"
                      );
                      handleClose();
                    }
                  : async () => {
                      await networkStore.connectWallet(false);
                    }
              }
              color="blue"
            >
              {!!networkStore.address ? "Pay Entry Fees" : "Connect Wallet"}
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
