import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/database.types";

export type AppSupabaseClient = SupabaseClient<Database>;
export type Table<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type Tile = {
  row: number;
  col: number;
  tile_type: TileType;
};

export type PlayerId = {
  player_address: string;
  player_id: number;
};

export type Score = {
  player_id: number;
  game_id: number;
  score: number;
};

export type RemainingMoves = {
  player_id: number;
  game_id: number;
  moves: number;
};

export type Network = {
  chainId: number;
  name: string;
};

type ChainType = {
  chainId: number;
  chainName: string;
};

type Competition = {
  created_at: string;
  description: string;
  end_date: string;
  funds: number;
  id: number;
  name: string;
  participation_fee: number | null;
  poster_url: string | null;
  seed: number;
  start_date: string;
  treasury_address: string | null;
  unique_keyname: string;
  score_tweet_content: string;
  competition_tweet_content: string;
  prizes: Array;
  is_speed_version: boolean;
  speed_duration: number;
  currency_symbol: string;
};

type Connection = {
  wallet_address: string;
  username: string;
  fullname: string;
  avatar_url: string;
};

type User = {
  wallet_address: string;
  username: string;
  fullname: string;
  avatar_url: string;
};

interface PublicProfile {
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
  total_rewards?: number;
}

interface Challenge {
  created_at: string;
  created_by: string;
  end_time: string;
  entry_fee: number;
  id: number;
  invite_code: string;
  is_speed_challenge: boolean;
  max_participants: number;
  name: string;
  speed_duration: number | null;
  status: string;
  updated_at: string | null;
}

export type ChallengeParticipant = {
  id: number;
  challenge_id: number;
  wallet_address: string;
  joined_at: string;
  played_at: string | null;
  status: string;
  score: number | null;
  has_played: boolean;
  txn_hash: string | null;
  txn_status: string;
  created_at: string;
};

export type ChallengeResponse = {
  success: boolean;
  data: {
    challenge: Challenge;
    participants: ChallengeParticipant[];
  }[];
};
