import { NextRequest } from "next/server";

export function GET(req: NextRequest) {
  const data = {
    name: "MinaPolis",
    description: "An on-chain city development arcade game",
  };
  return Response.json(data);
}
