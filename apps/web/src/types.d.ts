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
