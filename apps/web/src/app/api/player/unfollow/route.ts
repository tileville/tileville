import { supabaseServiceClient as supabase } from "@/db/config/server";
import { NextRequest } from "next/server";
import { withAuth } from "../../authMiddleware";

// Changed from export async function to const
const postHandler = async (request: NextRequest) => {
  try {
    const { follower_wallet, target_wallet } = await request.json();

    const auth_wallet = request.headers.get("Wallet-Address");

    // Verify follower_wallet matches authenticated wallet
    if (follower_wallet !== auth_wallet) {
      return Response.json(
        {
          success: false,
          error: "You can only unfollow with your own wallet",
        },
        { status: 403 }
      );
    }

    // Rest of your code stays exactly the same...
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

    // Remove from arrays
    const newTargetFollowers = (targetProfile.followers || []).filter(
      (wallet: string) => wallet !== follower_wallet
    );

    const newFollowerFollowing = (followerProfile.following || []).filter(
      (wallet: string) => wallet !== target_wallet
    );

    // Update both profiles
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
        message: "Successfully unfollowed user",
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