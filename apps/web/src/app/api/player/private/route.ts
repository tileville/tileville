import { NextRequest } from "next/server";
import { supabaseServiceClient as supabase } from "@/db/config/server";
import { withAuth } from "../../authMiddleware";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

interface SocialField {
  isPublic: boolean;
  username: string | null;
}

interface EmailField {
  email: string | null;
  isPublic: boolean;
}

interface PrivateProfile {
  email_address: EmailField | null;
  discord_username: SocialField | null;
  twitter_username: SocialField | null;
  telegram_username: SocialField | null;
}

const privateProfileHandler = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const wallet_address = searchParams.get("wallet_address") || "";

  const authenticatedWallet = request.headers.get("Wallet-Address");

  if (authenticatedWallet !== wallet_address) {
    return Response.json(
      {
        success: false,
        message: "Unauthorized: Can only access your own private profile data",
      },
      { status: 403 }
    );
  }

  try {
    const { data, error }: PostgrestSingleResponse<PrivateProfile> =
      await supabase
        .from("player_profile")
        .select(
          `
        email_address,
        discord_username,
        twitter_username,
        telegram_username
      `
        )
        .eq("wallet_address", wallet_address)
        .single();

    if (error || !data) {
      return Response.json(
        {
          success: false,
          message: `Private profile data not found for ${wallet_address}`,
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        data: {
          email_address: data.email_address,
          social_accounts: {
            discord: data.discord_username,
            twitter: data.twitter_username,
            telegram: data.telegram_username,
          },
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching private profile data:", error);
    return Response.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
};

export const GET = withAuth(privateProfileHandler);
