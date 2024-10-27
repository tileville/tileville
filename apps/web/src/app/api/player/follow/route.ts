import { supabaseServiceClient as supabase } from "@/db/config/server";
import { NextRequest } from "next/server";
import { withAuth } from "../../authMiddleware";

//  follower_wallet: person who is doing the following
//  target_wallet: person who is being followed by the follower_wallet

export async function handler(request: NextRequest) {
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

    const { data: targetProfile, error: targetError } = await supabase
      .from("player_profile")
      .select("followers")
      .eq("wallet_address", target_wallet)
      .single();

    if (targetError) throw targetError;

    const { data: followerProfile, error: followerError } = await supabase
      .from("player_profile")
      .select("following")
      .eq("wallet_address", follower_wallet)
      .single();

    if (followerError) throw followerError;

    const newTargetFollowers = targetProfile.followers || [];
    if (!newTargetFollowers.includes(follower_wallet)) {
      newTargetFollowers.push(follower_wallet);
    }

    const newFollowerFollowing = followerProfile.following || [];
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
}

export const POST = withAuth(handler);
