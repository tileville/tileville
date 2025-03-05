import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/database.types";

export interface CreateNotificationParams {
  userWallet: string;
  title: string;
  message: string;
  notificationType: "follow" | "challenge" | "reward" | "system";
  actionUrl?: string;
  actionText?: string;
}

/**
 * Service to handle notification creation and management
 */
export const notificationService = {
  /**
   * Create a new notification for a user
   */
  async createNotification({
    userWallet,
    title,
    message,
    notificationType,
    actionUrl,
    actionText,
  }: CreateNotificationParams) {
    if (!userWallet) {
      console.error("User wallet address is required to create a notification");
      return null;
    }

    const supabase = createClientComponentClient<Database>();

    try {
      const { data, error } = await supabase
        .from("notifications")
        .insert({
          user_wallet: userWallet,
          title,
          message,
          notification_type: notificationType,
          action_url: actionUrl,
          action_text: actionText,
          read: false,
        })
        .select("*")
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error creating notification:", error);
      return null;
    }
  },

  /**
   * Create a follow notification when a user is followed by someone
   */
  async createFollowNotification(
    targetWallet: string,
    followerUsername: string,
    followerWallet: string
  ) {
    return this.createNotification({
      userWallet: targetWallet,
      title: "New Follower",
      message: `${followerUsername} is now following you`,
      notificationType: "follow",
      actionUrl: `/u/${followerUsername}`,
      actionText: "View Profile",
    });
  },

  /**
   * Create a challenge notification when a challenge is completed
   */
  async createChallengeCompleteNotification(
    participantWallet: string,
    challengeName: string,
    challengeId: number,
    isWinner: boolean
  ) {
    const title = isWinner ? "Challenge Won!" : "Challenge Completed";
    const message = isWinner
      ? `Congratulations! You've won the "${challengeName}" challenge.`
      : `The "${challengeName}" challenge has been completed.`;

    return this.createNotification({
      userWallet: participantWallet,
      title,
      message,
      notificationType: "challenge",
      actionUrl: `/pvp?challengeId=${challengeId}`,
      actionText: "View Results",
    });
  },

  /**
   * Create a reward notification when a user receives a reward
   */
  async createRewardNotification(
    userWallet: string,
    amount: number,
    reason: string,
    txHash?: string
  ) {
    return this.createNotification({
      userWallet,
      title: "Reward Received",
      message: `You've received ${amount} MINA as a reward for ${reason}`,
      notificationType: "reward",
      actionUrl: txHash
        ? `https://minascan.io/mainnet/tx/${txHash}`
        : undefined,
      actionText: txHash ? "View Transaction" : undefined,
    });
  },
};

export default notificationService;
