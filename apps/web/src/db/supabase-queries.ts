import { AppSupabaseClient, Table } from "@/types";
import { supabaseUserClientComponentClient as supabase } from "@/supabase-clients/supabaseUserClientComponentClient";
import { TransactionLog, TransactionStatus } from "@/lib/types";

type PlayerProfile = {
  username: string;
};

// async function isProfileExist(
//   supabase: AppSupabaseClient,
//   wallet_address: string
// ): Promise<boolean> {
//   const { data } = await supabase
//     .from("player_profile")
//     .select("wallet_address")
//     .eq("wallet_address", wallet_address)
//     .single();

//   if (data) return true;
//   return false;
// }

export async function isUsernameExist(
  username: string,
  userId?: number
): Promise<boolean> {
  let query = supabase
    .from("player_profile")
    .select("id")
    .eq("username", username);
  if (userId) {
    query = query.neq("id", userId);
  }
  const { data } = await query.single();

  return !!data;
}

export const getAllCompetitionsEntries = async (
  supabase: AppSupabaseClient
): Promise<Array<Table<"tileville_competitions">>> => {
  const { data, error } = await supabase
    .from("tileville_competitions")
    .select("*")
    .order("priority");
  const formattedData = data ?? [];

  if (error) {
    throw error;
  }
  return formattedData;
};

export const saveGameScoreDb = async (
  supabase: AppSupabaseClient,
  item: {
    competition_key: string;
    game_id: number;
    score: number;
    wallet_address: string;
  }
): Promise<Table<"game_scores">> => {
  let isExist = false;

  try {
    const { data } = await supabase
      .from("game_scores")
      .select("game_id")
      .eq("game_id", item.game_id)
      .single();
    isExist = !!data;
  } catch (error) {
    console.log("failed to check existing game");
  }

  if (!isExist) {
    const { data, error } = await supabase
      .from("game_scores")
      .insert(item)
      .select("*")
      .single();
    if (error) {
      throw error;
    }
    return data;
  }
  const { data, error } = await supabase
    .from("game_scores")
    .update({ score: item.score })
    .eq("game_id", item.game_id)
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

export const getAllCompetitionsNames = async (
  supabase: AppSupabaseClient
): Promise<
  Array<{
    id: number;
    name: string;
    unique_keyname: string;
    start_date: string;
    end_date: string;
  }>
> => {
  const { data, error } = await supabase
    .from("tileville_competitions")
    .select("id, name, unique_keyname, start_date, end_date");

  if (error) {
    throw error;
  }

  return data;
};

export const addTransactionLog = async (
  transaction: TransactionLog
): Promise<Table<"transaction_logs">> => {
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

export const updateTransactionLog = async (
  txn_hash: string,
  update_payload: { txn_status: string }
): Promise<Table<"transaction_logs">> => {
  const { data, error } = await supabase
    .from("transaction_logs")
    .update(update_payload)
    .eq("txn_hash", txn_hash)
    .single();

  if (error) {
    throw error;
  }
  return data;
};

export const fetchTransactions = async (
  wallet_address: string,
  txn_status: string
): Promise<Array<Table<"transaction_logs">>> => {
  const { data, error } = await supabase
    .from("transaction_logs")
    .select("*")
    .eq("wallet_address", wallet_address)
    .eq("txn_status", txn_status);

  if (error) {
    throw error;
  }

  return data;
};

export const fetchPVPChallengeTransaction = async (
  wallet_address: string,
  challenge_id: string | number
): Promise<Table<"pvp_challenge_participants">> => {
  const { data, error } = await supabase
    .from("pvp_challenge_participants")
    .select("*")
    .eq("wallet_address", wallet_address)
    .eq("challenge_id", challenge_id)
    .single();

  if (error) throw error;
  return data;
};

export const fetchTransactionLogById = async (
  wallet_address: string,
  id: number
): Promise<Table<"transaction_logs">> => {
  const { data, error } = await supabase
    .from("transaction_logs")
    .select("*")
    .eq("wallet_address", wallet_address)
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
};

export const getUsername = async (
  wallet_address: string
): Promise<PlayerProfile[]> => {
  const { data, error } = await supabase
    .from("player_profile")
    .select("username")
    .eq("wallet_address", wallet_address);

  if (error) {
    throw error;
  }

  return data as PlayerProfile[];
};

export const fetchAllTransactionsByWallet = async (
  supabase: AppSupabaseClient,
  wallet_address: string
): Promise<Array<Table<"transaction_logs">>> => {
  const { data, error } = await supabase
    .from("transaction_logs")
    .select("*")
    .eq("wallet_address", wallet_address)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }
  return data;
};

export const getFilteredTransactionByStatus = async (
  supabase: AppSupabaseClient,
  wallet_address: string,
  txn_status: string
): Promise<Array<Table<"transaction_logs">>> => {
  if (txn_status !== "ALL") {
    const { data, error } = await supabase
      .from("transaction_logs")
      .select("*")
      .eq("wallet_address", wallet_address)
      .eq("txn_status", txn_status)
      .order("created_at", { ascending: false });
    if (error) {
      throw error;
    }
    return data;
  } else {
    const { data, error } = await supabase
      .from("transaction_logs")
      .select("*")
      .eq("wallet_address", wallet_address)
      .order("created_at", { ascending: false });
    if (error) {
      throw error;
    }
    return data;
  }
};

export const getPastGames = async (
  wallet_address: string
): Promise<Array<Table<"game_scores">>> => {
  const { data, error } = await supabase
    .from("game_scores")
    .select("*")
    .eq("wallet_address", wallet_address)
    .order("created_at", { ascending: false })
    .order("score", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

export const getActiveGames = async (
  supabase: AppSupabaseClient,
  wallet_address: string
): Promise<Array<Table<"transaction_logs">>> => {
  //TODO: Use filter method for a single query
  const txnLogsPromise = await supabase
    .from("transaction_logs")
    .select("*")
    .eq("wallet_address", wallet_address)
    .or("txn_status.eq.CONFIRMED,txn_status.eq.PENDING")
    .order("created_at", { ascending: false });

  const gameScoresPromise = await supabase
    .from("game_scores")
    .select("game_id")
    .eq("wallet_address", wallet_address);

  const [
    { data: gameTxnLogs, error: gameTxnLogsError },
    { data: gameScoreIds, error: gameScoreError },
  ] = await Promise.all([txnLogsPromise, gameScoresPromise]);
  if (gameTxnLogsError) {
    throw gameTxnLogsError;
  }
  if (gameScoreError) {
    throw gameScoreError;
  }
  const existingGameIds = gameScoreIds?.map(({ game_id }) => game_id) || [];
  const activeGames = (gameTxnLogs ?? []).filter(
    ({ id }) => !existingGameIds.includes(id)
  );
  // console.log({ gameTxnLogs, gameScoreIds });
  return activeGames;
};

export const getCompetitionByKey = async (
  supabase: AppSupabaseClient,
  unique_keyname: string
): Promise<Table<"tileville_competitions">> => {
  const { data, error } = await supabase
    .from("tileville_competitions")
    .select("*")
    .eq("unique_keyname", unique_keyname)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const anonymousSignIn = async () => {
  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) {
    console.log("sign in error", error);
  }
  console.log("anonymous sign in succeeded");
  return data;
};

export const isGameAlreadyPlayed = async (
  game_id: number
): Promise<boolean> => {
  const { data, error } = await supabase
    .from("game_scores")
    .select("id")
    .eq("game_id", game_id)
    .single();

  if (error) {
    return false;
  }
  console.log("is game already played reponse", data);
  return !!data;
};

export const fetchGlobalConfig = async (
  config_name: string
): Promise<Table<"global_config">> => {
  const { data, error } = await supabase
    .from("global_config")
    .select("*")
    .eq("name", config_name)
    .single();

  if (error) {
    throw error;
  }
  return data;
};

export const updateChallengeTransaction = async (payload: {
  wallet_address: string;
  challenge_id: number;
  txn_hash: string;
  txn_status: string;
}): Promise<boolean> => {
  const { wallet_address, challenge_id, ...updateData } = payload;

  const { data, error } = await supabase
    .from("pvp_challenge_participants")
    .update(updateData)
    .match({ wallet_address, challenge_id })
    .single();

  if (error) {
    throw error;
  }
  return true;
};

export const confirmChallengeParticipation = async (
  txn_hash: string,
  challenge_id: number,
  txn_status: TransactionStatus
): Promise<Table<"pvp_challenge_participants">> => {
  console.log("updating txn to supabase", txn_status);
  const { data, error } = await supabase
    .from("pvp_challenge_participants")
    .update({ txn_status })
    .match({ txn_hash, challenge_id })
    .single();

  if (error) {
    throw error;
  }
  return data;
};
