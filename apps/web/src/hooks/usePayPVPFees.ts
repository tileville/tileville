import { useNetworkStore } from "@/lib/stores/network";
// import { usePosthogEvents } from "./usePosthogEvents";
import { NETWORKS } from "@/constants/network";
import { sendPayment } from "@/lib/helpers";
import { updateChallengeTransaction } from "@/db/supabase-queries";
import { TransactionStatus } from "o1js";

type PayPVPFeesResponse = {
  success: boolean;
  message: string;
  data?: {
    [key: string]: any;
  };
};
// {code, message: `failed for %s %s`, showHelp: true}
export const usePayPVPFees = () => {
  const networkStore = useNetworkStore();
  //   const {
  //     joinedCompetition: [, logJoinCompetitionError],
  //   } = usePosthogEvents();
  const payPVPFees = async ({
    participation_fee,
    challenge_id,
  }: {
    participation_fee: number;
    challenge_id: number;
  }): Promise<PayPVPFeesResponse> => {
    const network = window.mina?.isPallad
      ? networkStore.minaNetwork?.palladNetworkID || NETWORKS[1].palladNetworkID
      : networkStore.minaNetwork?.networkID || NETWORKS[1].networkID;

    const txn_status: TransactionStatus = "PENDING";

    if (!networkStore.address) {
      networkStore.connectWallet(false);
      return { success: false, message: "Please connect your wallet first" };
    }
    try {
      const hash = await sendPayment({
        from: networkStore.address,
        amount: participation_fee,
        memo: `CID ${challenge_id}`,
      });

      if (!hash) {
        return {
          success: false,
          message: "Transaction failed, Please try again",
        };
      }
      //TODO: Replace all these logs with actual sentry or posthog logs for debugging purpose
      console.log(
        `pvp transaction hash ${hash} for challenge ID ${challenge_id}`
      );

      const isSuccess = await updateChallengeTransaction({
        txn_hash: hash,
        wallet_address: networkStore.address,
        challenge_id: challenge_id,
        txn_status,
      });

      //TODO: replace with sentry
      console.log("Add pvp transaction log response", isSuccess);
      if (!isSuccess) {
        return {
          success: false,
          message: `Failed to add PVP transaction log in db for challenge ID ${challenge_id}`,
        };
      }
      return {
        success: true,
        message: `PVP join fees paid successfully`,
        data: {
          hash,
        },
      };
    } catch (err: any) {
      console.log("ERROR pay pvp fees", err);
      return {
        success: false,
        message: `Failed to pay pvp fees due to ${err.toString()}`,
      };
      //   logJoinCompetitionError(err.toString());
    }
  };

  return { payPVPFees };
};
