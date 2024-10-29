import { supabaseServiceClient as supabase } from "@/db/config/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

interface SocialField {
  isPublic: boolean;
  username: string | null;
}

interface EmailField {
  email: string | null;
  isPublic: boolean;
}

// Private/Full Profile
interface PlayerProfile {
  wallet_address: string;
  username?: string;
  fullname?: string;
  avatar_url?: string;
  followers?: string[];
  following?: string[];
  twitter_username?: SocialField | null;
  telegram_username?: SocialField | null;
  discord_username?: SocialField | null;
  email_address?: EmailField | null;
}

// Public Profile (after transformation)
interface PublicPlayerProfile {
  wallet_address: string;
  username?: string;
  fullname?: string;
  avatar_url?: string;
  followers?: string[];
  following?: string[];
  twitter_username?: string | null;
  telegram_username?: string | null;
  discord_username?: string | null;
  email_address?: string | null;
}

function getPublicProfile(profile: PlayerProfile): PublicPlayerProfile {
  return {
    ...profile,
    twitter_username: profile.twitter_username?.isPublic
      ? profile.twitter_username.username
      : null,
    telegram_username: profile.telegram_username?.isPublic
      ? profile.telegram_username.username
      : null,
    discord_username: profile.discord_username?.isPublic
      ? profile.discord_username.username
      : null,
    email_address: profile.email_address?.isPublic
      ? profile.email_address.email
      : null,
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const wallet_address = searchParams.get("wallet_address") || "";

  try {
    const { data, error }: PostgrestSingleResponse<PlayerProfile> =
      await supabase
        .from("player_profile")
        .select(
          `
        wallet_address,
        username,
        fullname,
        avatar_url,
        followers,
        following,
        twitter_username,
        telegram_username,
        discord_username,
        email_address
      `
        )
        .eq("wallet_address", wallet_address)
        .single();

    if (error || !data) {
      return Response.json(
        { status: false, message: "Player profile not found" },
        { status: 404 }
      );
    }
    console.log("all DATA", data);
    const publicData = getPublicProfile(data);
    console.log("PUBLIC DATA", publicData);

    return Response.json(
      {
        status: true,
        data: publicData,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in public GET route:", error);
    return Response.json(
      {
        status: false,
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
