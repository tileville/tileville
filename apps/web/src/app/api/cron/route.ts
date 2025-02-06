import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Cron job executed at:", new Date().toISOString());
  return res.status(200).json({ message: "Cron job ran successfully!" });
}
