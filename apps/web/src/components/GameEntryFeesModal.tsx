import { Dialog, Flex } from "@radix-ui/themes";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useNetworkStore, useParticipationFee } from "@/lib/stores/network";
import { usePosthogEvents } from "@/hooks/usePosthogEvents";
import { Competition } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "./common/Spinner";
import { DEFAULT_TRASURY_ADDRESS } from "@/constants";

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
  const router = useRouter();
  const networkStore = useNetworkStore();
  const { payParticipationFees } = useParticipationFee();
  const [isShowVoucherCode, setIsShowVoucherCode] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [vocherValidationResponse, setVoucherValidationResponse] = useState({
    isValid: false,
    message: "",
  });
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const {
    joinedCompetition: [logJoinCompetition],
  } = usePosthogEvents();

  // Using tanstack query for voucher validation
  const validateVoucher = useMutation({
    mutationFn: (code: string) =>
      fetch(`/api/vouchers?code=${code}`).then((res) => res.json()),
    onSuccess: (response) => {
      setVoucherValidationResponse(response);
    },
  });

  // Handle payment for competition participation
  const handlePayParticipationFees = async () => {
    // Check wallet connection
    if (!networkStore.address) {
      try {
        await networkStore.connectWallet(false);
        return; // Early return until wallet is connected
      } catch (error) {
        console.error(`Failed to connect with wallet`, error);
        toast.error("Failed to connect with wallet. Please try again.");
        return;
      }
    }

    setIsPaymentLoading(true);

    // Log analytics event
    logJoinCompetition({
      walletAddress: networkStore.address,
      competition_name: competition.name,
      network: networkStore.minaNetwork?.networkID || "berkeley",
    });

    try {
      const paymentType = vocherValidationResponse.isValid
        ? "VOUCHER"
        : competition.participation_fee === 0
        ? "FREE"
        : "NETWORK";

      const data = await payParticipationFees({
        participation_fee: competition.participation_fee ?? 0,
        treasury_address:
          competition.treasury_address || DEFAULT_TRASURY_ADDRESS,
        competition_key: competition.unique_keyname,
        type: paymentType,
        code: voucherCode,
        competition_name: competition.name,
      });

      if (data?.id) {
        toast.success(
          `You have joined the ${competition.name} competition successfully. Redirecting you to the game screen now.`
        );

        // Redirect after successful payment
        setTimeout(() => {
          router.push(
            `/competitions/${competition.unique_keyname}/game/${data.id}`
          );
        }, 3000);

        handleClose();
      } else {
        toast.error(
          `Failed to process payment. Please make sure your wallet extension is unlocked and try again.`
        );
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Something went wrong with the payment. Please try again.");
    } finally {
      setIsPaymentLoading(false);
    }
  };

  // Reset voucher state
  const resetVoucher = () => {
    setVoucherCode("");
    setVoucherValidationResponse({
      isValid: false,
      message: "",
    });
    setIsShowVoucherCode(false);
  };

  return (
    <Dialog.Root open={open}>
      <Dialog.Content style={{ maxWidth: 450 }} className="dialog-content-v1">
        <Dialog.Title>Pay Participation Fees</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          You need to pay one time participation fees of{" "}
          {competition.participation_fee} MINA token to join{" "}
          <strong>{competition.name}</strong> competition.
          {/* Voucher section */}
          <button
            className="block text-xs font-medium text-primary"
            onClick={() => setIsShowVoucherCode(true)}
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
                  setVoucherValidationResponse({ isValid: false, message: "" });
                  setVoucherCode(e.target.value);
                }}
                value={voucherCode}
              />

              <button
                className="relative flex min-w-[100px] items-center justify-center gap-2 rounded-md bg-primary px-3 text-sm font-medium text-white hover:bg-primary/90 disabled:bg-primary/80"
                onClick={() => validateVoucher.mutate(voucherCode)}
                disabled={voucherCode.length === 0 || validateVoucher.isLoading}
              >
                {validateVoucher.isLoading && (
                  <span className="absolute left-2 top-[5px] w-5">
                    <Spinner />
                  </span>
                )}
                <span className="inline-block">Apply</span>
              </button>

              <button
                className="text-xs font-medium text-black/70 underline"
                onClick={resetVoucher}
              >
                remove
              </button>
            </div>
          )}
          {/* Voucher validation message */}
          {vocherValidationResponse.isValid ? (
            <span className="text-primary">
              Voucher code is valid. click on redeem code button to join the
              competition for free.
            </span>
          ) : (
            <span className="text-red-500">
              {vocherValidationResponse.message}
            </span>
          )}
        </Dialog.Description>

        {/* Action buttons */}
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
              onClick={handlePayParticipationFees}
              className="relative min-w-[160px] rounded-md bg-primary px-3 text-sm font-medium text-white hover:bg-primary/90 disabled:bg-primary/80"
              disabled={isPaymentLoading}
            >
              {!!networkStore.address
                ? vocherValidationResponse.isValid
                  ? "Redeem Code"
                  : "Pay Entry Fees"
                : "Connect Wallet"}
              {isPaymentLoading && (
                <Spinner className="!absolute right-4 top-1/2" />
              )}
            </button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
