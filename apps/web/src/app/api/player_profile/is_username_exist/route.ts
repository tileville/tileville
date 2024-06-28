import { supabaseServiceClient as supabase } from "@/db/config/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "";
  const userId = searchParams.get("userId") || "";
  let query = supabase
    .from("player_profile")
    .select("id")
    .eq("username", username);
  if (userId) {
    query = query.neq("id", userId);
  }
  const { data, error } = await query.single();
  if (error) throw error;
  return Response.json(data);
}
