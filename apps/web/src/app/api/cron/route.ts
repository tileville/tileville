export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

export function GET() {
  console.log("Cron job executed at:", new Date().toISOString());
  return NextResponse.json({ message: "Cron job ran successfully!" });
}
