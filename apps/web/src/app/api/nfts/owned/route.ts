import { NextRequest } from "next/server";
import { searchJobs } from "@/lib/algolia";
import { RateLimiterMemory } from "rate-limiter-flexible";

const RATE_LIMIT_DURATION = 60;
const RATE_LIMIT_ATTEMPTS = 20;

const rateLimiter = new RateLimiterMemory({
  points: RATE_LIMIT_ATTEMPTS,
  duration: RATE_LIMIT_DURATION,
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const wallet_address = searchParams.get("wallet_address") || "";

  const ip = request.headers.get("x-forwarded-for") || request.ip || "unknown";

  try {
    try {
      await rateLimiter.consume(ip);
    } catch (rateLimitError) {
      return new Response(
        JSON.stringify({
          success: false,
          message: `Too many requests. Please try again after ${RATE_LIMIT_DURATION} seconds`,
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!wallet_address) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Wallet address is required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const response = await searchJobs({
      query: "",
      hitsPerPage: 1000,
      currentPage: 0,
      statuses: ["pending", "applied"],
      owner: wallet_address,
    });

    return new Response(
      JSON.stringify({
        success: true,
        nfts: response.hits,
        totalNFTs: response.nbHits,
        totalPages: response.nbPages,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching owned NFTs:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to fetch owned NFTs",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
