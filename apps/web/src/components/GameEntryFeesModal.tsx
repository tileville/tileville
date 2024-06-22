import { Dialog, Flex, Button } from "@radix-ui/themes";
import { useNetworkStore, useParticipationFee } from "@/lib/stores/network";
// import { type Competition } from "@/app/competitions/page";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePosthogEvents } from "@/hooks/usePosthogEvents";
import { Competition } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { validateVoucherCode } from "@/db/supabase-queries";

let timeoutId: NodeJS.Timeout;

type GameEntryFeesModalProps = {
  open: boolean;
  handleClose: () => void;
  competition: Competition;
};
export const GameEntryFeesModal = ({
  open,
  handleClose,
  competition,
}: GameEntryFeesModalProps) => {
  const networkStore = useNetworkStore();
  const { payParticipationFees } = useParticipationFee();
  const [isShowVoucherCode, setIsVoucherCode] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [isVoucherCodeValid, setIsVoucherCodeValid] = useState(false);
  const validateVoucher = useMutation({
    mutationFn: validateVoucherCode,
    onSuccess: (response) => {
      console.log("mutation response", response);
      if (response) {
        setIsVoucherCodeValid(true);
      }
    },
  });

  const router = useRouter();
  const {
    joinedCompetition: [logJoinCompetition],
  } = usePosthogEvents();

  const handlePayParticipationFess = async () => {
    if (!networkStore.address) {
      return networkStore.connectWallet(false);
    }
    logJoinCompetition({
      walletAddress: networkStore.address,
      competition_name: competition.name,
      network: networkStore.minaNetwork?.networkID || "berkeley",
    });
    const data = await payParticipationFees({
      participation_fee: competition.participation_fee ?? 0,
      treasury_address:
        competition.treasury_address ||
        "B62qqhL8xfHBpCUTk1Lco2Sq8HitFsDDNJraQG9qCtWwyvxcPADn4EV",
      competition_key: competition.unique_keyname,
      type: isVoucherCodeValid
        ? "VOUCHER"
        : competition.participation_fee === 0
        ? "FREE"
        : "NETWORK",
      code: voucherCode,
    });
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
      <Dialog.Content style={{ maxWidth: 450 }} className="dialog-content-v1">
        <Dialog.Title>Pay Participation Fees</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          You need to pay one time participation fees of{" "}
          {competition.participation_fee} MINA token to join{" "}
          <strong>{competition.name}</strong> competition.
          <button
            className="block text-xs font-medium text-primary"
            onClick={() => {
              setIsVoucherCode(true);
            }}
          >
            Have a voucher code?
          </button>
          {isShowVoucherCode && (
            <div className="fade-slide-in flex gap-3 pt-3">
              <input
                type="text"
                placeholder="Enter 14 character voucher code"
                className="border-primary-30 h-full w-full rounded-md border bg-transparent px-2 py-2 font-medium outline-none placeholder:text-primary/30"
                onChange={(e) => {
                  setIsVoucherCodeValid(false);
                  setVoucherCode(e.target.value);
                }}
                value={voucherCode}
              />
              <button
                className="rounded-md bg-primary px-3 text-sm font-medium text-white hover:bg-primary/90"
                onClick={() => {
                  validateVoucher.mutate(voucherCode);
                }}
                disabled={voucherCode.length === 0}
              >
                {validateVoucher.isLoading ? "Applying..." : "Apply"}
              </button>
              {isVoucherCodeValid && (
                <button
                  className="text-xs font-medium text-primary"
                  onClick={() => {
                    setVoucherCode("");
                    setIsVoucherCodeValid(false);
                    setIsVoucherCode(false);
                  }}
                >
                  remove
                </button>
              )}
            </div>
          )}
          {isVoucherCodeValid && (
            <p className="text-primary">
              Voucher code is valid. click on redeem code button to join the
              competition for free.
            </p>
          )}
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
              {!!networkStore.address
                ? isVoucherCodeValid
                  ? "Redeem Code"
                  : "Pay Entry Fees"
                : "Connect Wallet"}
            </button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
