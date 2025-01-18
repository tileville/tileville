import { getMinaScanNormalLink } from "@/lib/helpers";
import Link from "next/link";

type RewardsSentContentType = {
  rewardCount: number;
  rewardTxnHash: string | null;
};

export const RewardsSentContent = ({
  rewardCount,
  rewardTxnHash,
}: RewardsSentContentType) => {
  return (
    <div className="flex items-center gap-2 rounded-md border border-primary bg-[#C6C99C] px-4 py-2 text-primary">
      <span>🎉 Reward of {rewardCount} MINA has been sent!</span>
      {rewardTxnHash && (
        <Link
          href={getMinaScanNormalLink(rewardTxnHash)}
          target="_blank"
          className="text-primary underline hover:no-underline"
        >
          View Transaction
        </Link>
      )}
    </div>
  );
};
