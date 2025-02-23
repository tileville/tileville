import { supabaseServiceClient as supabase } from "@/db/config/server";
import { NextRequest } from "next/server";
import { withAuth } from "../../authMiddleware";
import { sendPersonalNotification } from "../../lib/telegram-notifications";

const postHandler = async (request: NextRequest) => {
  try {
    const { follower_wallet, target_wallet } = await request.json();

    const auth_wallet = request.headers.get("Wallet-Address");

    if (follower_wallet !== auth_wallet) {
      return Response.json(
        {
          success: false,
          error: "You can only follow users with your own wallet",
        },
        { status: 403 }
      );
    }

    const { data: followerProfile } = await supabase
      .from("player_profile")
      .select("username")
      .eq("wallet_address", follower_wallet)
      .single();

    const { data: targetTelegramAuth } = await supabase
      .from("telegram_auth")
      .select("chat_id")
      .eq("wallet_address", target_wallet)
      .eq("authenticated", true)
      .single();

    const { data: targetProfile, error: targetError } = await supabase
      .from("player_profile")
      .select("followers")
      .eq("wallet_address", target_wallet)
      .single();

    if (targetError) throw targetError;

    const { data: followerProfile2, error: followerError } = await supabase
      .from("player_profile")
      .select("following")
      .eq("wallet_address", follower_wallet)
      .single();

    if (followerError) throw followerError;

    const newTargetFollowers = targetProfile.followers || [];
    if (!newTargetFollowers.includes(follower_wallet)) {
      newTargetFollowers.push(follower_wallet);
    }

    const newFollowerFollowing = followerProfile2.following || [];
    if (!newFollowerFollowing.includes(target_wallet)) {
      newFollowerFollowing.push(target_wallet);
    }

    const { error: updateError } = await supabase
      .from("player_profile")
      .update({ followers: newTargetFollowers })
      .eq("wallet_address", target_wallet);

    const { error: updateFollowerError } = await supabase
      .from("player_profile")
      .update({ following: newFollowerFollowing })
      .eq("wallet_address", follower_wallet);

    if (updateError || updateFollowerError)
      throw updateError || updateFollowerError;

    if (targetTelegramAuth?.chat_id) {
      const followerName =
        followerProfile?.username || `Wallet ${follower_wallet.slice(0, 6)}`;
      const message = `🎯 New Follower Alert!\n\n${followerName} just started following you on TileVille! Check out their profile at https://tileville.xyz/u/${
        followerProfile?.username || follower_wallet
      }`;

      await sendPersonalNotification({
        message,
        chatIds: [targetTelegramAuth.chat_id],
      });
    }

    return Response.json({
      success: true,
      data: {
        message: "Successfully followed user",
      },
    });
  } catch (error: any) {
    console.error("Error in POST route:", error);
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
};

export const POST = withAuth(postHandler);
