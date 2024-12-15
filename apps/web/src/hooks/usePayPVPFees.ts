import { useNetworkStore } from "@/lib/stores/network";
// import { usePosthogEvents } from "./usePosthogEvents";
import { NETWORKS } from "@/constants/network";
import { sendPayment } from "@/lib/helpers";
import { addPVPTransactionLog } from "@/db/supabase-queries";
import toast from "react-hot-toast";
import { TransactionStatus } from "o1js";

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
    challenge_id: string;
  }): Promise<{ id: number } | null | undefined> => {
    const network = window.mina?.isPallad
      ? networkStore.minaNetwork?.palladNetworkID || NETWORKS[1].palladNetworkID
      : networkStore.minaNetwork?.networkID || NETWORKS[1].networkID;
    let txn_status: TransactionStatus = "PENDING";
    if (!networkStore.address) {
      networkStore.connectWallet(false);
      return null;
    }

    const hash = await sendPayment({
      from: networkStore.address,
      amount: participation_fee,
      memo: `CID ${challenge_id}`,
    });

    txn_status = "PENDING";

    try {
      if (hash) {
        console.log("response hash", hash);
        const response = await addPVPTransactionLog({
          txn_hash: hash,
          wallet_address: networkStore.address,
          network,
          challenge_id: Number(challenge_id),
          txn_status,
          amount: participation_fee,
          is_game_played: false,
        });

        console.log("Add pvp transaction log response", response);
        return response;
      } else {
        console.log("toast error");
      }
    } catch (err: any) {
      console.log("ERROR SENDIN ENTRY FEES IN PVP", err);
      toast("Failed to transfer entry fees😭");
      //   logJoinCompetitionError(err.toString());
      return null;
    }
  };

  return { payPVPFees };
};
