import { AppSupabaseClient, Table } from "@/types";
import { supabaseUserClientComponentClient } from "@/supabase-clients/supabaseUserClientComponentClient";
import { TransactionLog } from "@/lib/types";

async function isProfileExist(
  supabase: AppSupabaseClient,
  wallet_address: string
): Promise<boolean> {
  const { data } = await supabase
    .from("player_profile")
    .select("wallet_address")
    .eq("wallet_address", wallet_address)
    .single();

  if (data) return true;
  return false;
}

export async function isUsernameExist(username: string): Promise<boolean> {
  const supabase = supabaseUserClientComponentClient;
  const { data } = await supabase
    .from("player_profile")
    .select("id")
    .eq("username", username)
    .single();

  if (data) return true;
  return false;
}

export const getAllLeaderboardEntries = async (
  supabase: AppSupabaseClient
): Promise<Array<Table<"leaderboard">>> => {
  const { data, error } = await supabase
    .from("leaderboard")
    .select("*")
    .order("score", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

export const getAllCompetitionsEntries = async (
  supabase: AppSupabaseClient
): Promise<Array<Table<"tileville_competitions">>> => {
  const { data, error } = await supabase
    .from("tileville_competitions")
    .select("*");

  if (error) {
    throw error;
  }

  return data;
};

export const addGameToLeaderboard = async (
  supabase: AppSupabaseClient,
  item: {
    competition_id: number;
    game_id: number;
    score: number;
    wallet_address: string;
  }
): Promise<Table<"leaderboard">> => {
  const { data, error } = await supabase
    .from("leaderboard")
    .insert(item)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data;
};

// export const addTransactionLogs = async (
//   supabase: AppSupabaseClient,
//   item: {
//     game_id: string;
//     competition_key: number;
//     txh_hash: string;
//     wallet_address: number;
//     network: string;
//     txn_status: string;
//   }
// ): Promise<Table<"leaderboard">> => {
//   const { data, error } = await supabase
//     .from("leaderboard")
//     .insert(item)
//     .select("*")
//     .single();

//   if (error) {
//     throw error;
//   }

//   return data;
// };

export const addProfile = async (
  supabase: AppSupabaseClient,
  item: {
    wallet_address: string;
    username: string;
    fullname: string;
    email: string;
    avatar_url: string;
  }
): Promise<Table<"player_profile">> => {
  const isExist = await isProfileExist(supabase, item.wallet_address);
  if (isExist) {
    const { wallet_address, ...other_field } = item;
    const { data, error } = await supabase
      .from("player_profile")
      .update(other_field)
      .eq("wallet_address", item.wallet_address)
      .single();
    if (error) {
      throw error;
    }
    return data;
  } else {
    const { data, error } = await supabase
      .from("player_profile")
      .insert(item)
      .select("*")
      .single();
    if (error) {
      throw error;
    }
    return data;
  }
};

export const fetchProfile = async (
  supabase: AppSupabaseClient,
  wallet_address: string
): Promise<Table<"player_profile"> | null> => {
  const { data, error } = await supabase
    .from("player_profile")
    .select("*")
    .eq("wallet_address", wallet_address)
    .single();

  if (error || !data) {
    return null;
  }
  return data;
};

export const insertEmail = async (
  supabase: AppSupabaseClient,
  item: { name: string; email: string }
): Promise<Table<"signup_emails">> => {
  const { data, error } = await supabase
    .from("signup_emails")
    .insert(item)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data;
};

// export const getAllCompetitionsNames = async (
//   supabase: AppSupabaseClient
// ): Promise<Array<Table<"tileville_competitions">>> => {
//   const { data, error } = await supabase
//     .from("tileville_competitions")
//     .select("*")

//   if (error) {
//     throw error;
//   }

//   return data;
// };

export const getAllCompetitionsNames = async (
  supabase: AppSupabaseClient
): Promise<Array<{ id: number; name: string }>> => {
  const { data, error } = await supabase
    .from("tileville_competitions")
    .select("id, name");

  if (error) {
    throw error;
  }

  return data;
};

export const addTransactionLog = async (
  transaction: TransactionLog
): Promise<Table<"transaction_logs">> => {
  const supabase = supabaseUserClientComponentClient;

  const { data, error } = await supabase
    .from("transaction_logs")
    .insert(transaction)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data;
};
