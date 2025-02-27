import { Dialog, Flex } from "@radix-ui/themes";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { useNetworkStore, useParticipationFee } from "@/lib/stores/network";
import { usePosthogEvents } from "@/hooks/usePosthogEvents";
import { Competition } from "@/types";
import { Spinner } from "./common/Spinner";
import { DEFAULT_TRASURY_ADDRESS } from "@/constants";

// Types
type VoucherValidationResponse = {
  isValid: boolean;
  message: string;
};

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
  // Hooks
  const router = useRouter();
  const networkStore = useNetworkStore();
  const { payParticipationFees } = useParticipationFee();
  const {
    joinedCompetition: [logJoinCompetition],
  } = usePosthogEvents();

  // State
  const [isShowVoucherCode, setIsVoucherCode] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherValidationResponse, setVoucherValidationResponse] =
    useState<VoucherValidationResponse>({
      isValid: false,
      message: "",
    });
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  // Refs
  let timeoutId: NodeJS.Timeout;

  // Mutations
  const validateVoucher = useMutation({
    mutationFn: (code: string) =>
      fetch(`/api/vouchers?code=${code}`).then((res) => res.json()),
    onSuccess: (response) => {
      setVoucherValidationResponse(response);
    },
  });

  // Handlers
  const handlePayParticipationFees = async () => {
    if (!networkStore.address) {
      try {
        networkStore.connectWallet(false);
      } catch (error) {
        console.error(`Failed to connect with wallet`, error);
      } finally {
        return;
      }
    }

    setIsPaymentLoading(true);

    logJoinCompetition({
      walletAddress: networkStore.address,
      competition_name: competition.name,
      network: networkStore.minaNetwork?.networkID || "berkeley",
    });

    const paymentType = voucherValidationResponse.isValid
      ? "VOUCHER"
      : competition.participation_fee === 0
      ? "FREE"
      : "NETWORK";

    const data = await payParticipationFees({
      participation_fee: competition.participation_fee ?? 0,
      treasury_address: competition.treasury_address || DEFAULT_TRASURY_ADDRESS,
      competition_key: competition.unique_keyname,
      type: paymentType,
      code: voucherCode,
      competition_name: competition.name,
    });

    setIsPaymentLoading(false);

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
        `Failed to connect wallet. Please make sure your wallet extension is unlocked. If issue still persists, Please report a bug!`
      );
    }
  };

  const handleApplyVoucher = () => {
    validateVoucher.mutate(voucherCode);
  };

  const handleRemoveVoucher = () => {
    setVoucherCode("");
    setVoucherValidationResponse({
      isValid: false,
      message: "",
    });
    setIsVoucherCode(false);
  };

  // Effects
  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // Render helpers
  const renderVoucherField = () => {
    if (!isShowVoucherCode) return null;

    return (
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
          onClick={handleApplyVoucher}
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
          onClick={handleRemoveVoucher}
        >
          remove
        </button>
      </div>
    );
  };

  const renderVoucherValidationMessage = () => {
    if (voucherValidationResponse.isValid) {
      return (
        <span className="text-primary">
          Voucher code is valid. click on redeem code button to join the
          competition for free.
        </span>
      );
    }

    if (voucherValidationResponse.message) {
      return (
        <span className="text-red-500">
          {voucherValidationResponse.message}
        </span>
      );
    }

    return null;
  };

  const getActionButtonText = () => {
    if (!networkStore.address) return "Connect Wallet";
    return voucherValidationResponse.isValid ? "Redeem Code" : "Pay Entry Fees";
  };

  // Render
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
            onClick={() => setIsVoucherCode(true)}
          >
            Have a voucher code?
          </button>
          {renderVoucherField()}
          {renderVoucherValidationMessage()}
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
              onClick={handlePayParticipationFees}
              className="relative min-w-[160px] rounded-md bg-primary px-3 text-sm font-medium text-white hover:bg-primary/90 disabled:bg-primary/80"
              disabled={isPaymentLoading}
            >
              {getActionButtonText()}
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
