import { NextRequest } from "next/server";
import { searchJobs } from "@/lib/algolia";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const wallet_address = searchParams.get("wallet_address") || "";

  if (!wallet_address) {
    return Response.json(
      { success: false, message: "Wallet address is required" },
      { status: 400 }
    );
  }

  try {
    const response = await searchJobs({
      query: "",
      hitsPerPage: 1000,
      currentPage: 0,
      statuses: ["pending", "applied"],
      owner: wallet_address,
    });

    return Response.json({
      success: true,
      nfts: response.hits,
      totalNFTs: response.nbHits,
      totalPages: response.nbPages,
    });
  } catch (error: any) {
    console.error("Error fetching owned NFTs:", error);
    return Response.json(
      {
        success: false,
        message: error.message || "Failed to fetch owned NFTs",
      },
      { status: 500 }
    );
  }
}
