import { useEffect, useState } from "react";
import { usePosthogEvents } from "./usePosthogEvents";
import toast from "react-hot-toast";
import { NFT_COLLECTIONS, NFTCollectionType } from "@/constants";

export function useZekoMint() {
  const [isLoading, setIsLoading] = useState(false);
  const { nftMinting } = usePosthogEvents();
  console.log("ZEKO MINT STARTS");

  const requestZekoMint = async ({
    nft_id,
    nft_name,
    wallet_address,
  }: {
    nft_id: number;
    nft_name: string;
    wallet_address: string;
  }) => {
    console.log("IS ZEKO IN REQUEST HOOK");
    setIsLoading(true);

    try {
      const response = await fetch("/api/zeko-mint-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Wallet-Address": wallet_address,
        },
        body: JSON.stringify({
          nft_id,
          nft_name,
          wallet_address,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to request NFT minting");
      }

      // Track the event
      nftMinting[0]({
        nftId: nft_id,
        walletAddress: wallet_address,
        step: 1,
        collection: "Zeko",
      });

      toast.success(
        "Your Zeko NFT mint request has been received! We'll process it soon."
      );
      return { success: true, message: data.message };
    } catch (error: any) {
      console.error("Zeko mint request error:", error);
      toast.error(error.message || "Failed to request NFT minting");
      return { success: false, message: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    requestZekoMint,
    isLoading,
  };
}

export function useZekoMintStatus(
  nftId: number,
  walletAddress: string,
  collection: NFTCollectionType
) {
  const [isNftRequested, setIsNftRequested] = useState(false);
  const [hasUserRequest, setHasUserRequest] = useState(false);
  const [hasCompletedRequest, setHasCompletedRequest] = useState(false);
  const [isLoading, setIsLoading] = useState(
    collection === NFT_COLLECTIONS.ZEKO
  );

  useEffect(() => {
    if (collection !== NFT_COLLECTIONS.ZEKO) return;

    if (!nftId || !walletAddress) {
      setIsLoading(false);
      return;
    }

    async function checkMintStatus() {
      try {
        const response = await fetch(
          `/api/zeko-mint-status?nft_id=${nftId}&wallet_address=${walletAddress}`
        );
        const data = await response.json();

        if (response.ok && data.success) {
          setIsNftRequested(data.isNftRequested);
          setHasUserRequest(data.hasUserRequest);
          setHasCompletedRequest(data.hasCompletedRequest || false);
        }
      } catch (error) {
        console.error("Error checking Zeko mint status:", error);
      } finally {
        setIsLoading(false);
      }
    }

    checkMintStatus();
  }, [nftId, walletAddress, collection]);

  return { isNftRequested, hasUserRequest, hasCompletedRequest, isLoading };
}
