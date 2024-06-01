import { AppSupabaseClient, Table } from "@/types";

export const getAllLeaderboardEntries = async (
  supabase: AppSupabaseClient
): Promise<Array<Table<"leaderboard">>> => {
  const { data, error } = await supabase.from("leaderboard").select("*").order('score', { ascending: false });;

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


export const insertEmail = async (
  supabase: AppSupabaseClient,
  item: { name: string; email: string }
): Promise<Table<'signup_emails'>> => {
  const { data, error } = await supabase
    .from('signup_emails')
    .insert(item)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data;
};
