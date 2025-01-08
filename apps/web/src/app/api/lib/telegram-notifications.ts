// src/app/api/lib/telegram-notifications.ts
import { ADMIN_API_URL } from "@/constants";
import { supabaseServiceClient as supabase } from "@/db/config/server";

export async function sendPersonalNotification({
  message,
  chatIds,
}: {
  message: string;
  chatIds: string[];
}) {
  try {
    const response = await fetch(
      `${ADMIN_API_URL}/api/telegram/personal-messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": process.env.NEXT_PUBLIC_ADMIN_API_TOKEN || "",
        },
        body: JSON.stringify({
          message,
          chatIds,
        }),
      }
    );
    return response.json();
  } catch (error) {
    console.error("Error sending telegram notification:", error);
    return null;
  }
}

export async function sendChallengeJoinNotification({
  newParticipant,
  challengeName,
  currentParticipants,
}: {
  newParticipant: string;
  challengeName: string;
  currentParticipants: string[];
}) {
  try {
    // Fetch telegram chat IDs for all current participants
    const { data: telegramAuth } = await supabase
      .from("telegram_auth")
      .select("chat_id, wallet_address")
      .in("wallet_address", currentParticipants)
      .eq("authenticated", true);

    if (!telegramAuth?.length) return;

    // Get username of new participant
    const { data: participantProfile } = await supabase
      .from("player_profile")
      .select("username")
      .eq("wallet_address", newParticipant)
      .single();

    const participantName =
      participantProfile?.username || `Wallet ${newParticipant.slice(0, 6)}`;

    // Prepare notification message
    const message = `🎮 New Challenger Alert!\n\n${participantName} just joined the challenge "${challengeName}"!\n\nGet ready for some exciting competition! 🏆`;

    // Send notification to all participants except the new one
    const chatIds = telegramAuth
      .filter((auth) => auth.wallet_address !== newParticipant)
      .map((auth) => auth.chat_id)
      .filter(Boolean) as string[];

    if (chatIds.length > 0) {
      await sendPersonalNotification({
        message,
        chatIds,
      });
    }

    return true;
  } catch (error) {
    console.error("Error sending challenge join notifications:", error);
    return false;
  }
}
