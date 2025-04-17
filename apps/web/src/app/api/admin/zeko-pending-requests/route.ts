import { NextResponse } from "next/server";
import { supabaseServiceClient as supabase } from "@/db/config/server";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("zeko_mint_requests")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ success: true, requests: data });
  } catch (error: any) {
    console.error("Error fetching pending requests:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch pending requests",
      },
      { status: 500 }
    );
  }
}
