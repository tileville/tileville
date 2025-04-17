"use client";

import { Spinner } from "@/components/common/Spinner";
import { useMintMINANFT } from "@/hooks/useMintMINANFT";
import { Button } from "@radix-ui/themes";
import { useState, useEffect } from "react";

type Response = {
  success: boolean;
  message?: string | undefined;
  reason?: string | undefined;
  txHash?: string | undefined;
};

type ZekoMintRequest = {
  id: string;
  nft_id: number;
  nft_name: string;
  wallet_address: string;
  status: string;
  created_at: string;
};

export default function AutoMint() {
  const { mintMINANFTHelper } = useMintMINANFT();
  const [isLoading, setIsLoading] = useState(false);
  const [pendingRequests, setPendingRequests] = useState<ZekoMintRequest[]>([]);
  const [currentRequest, setCurrentRequest] = useState<ZekoMintRequest | null>(
    null
  );
  const [mintingStatus, setMintingStatus] = useState<{
    [key: string]: Response;
  }>({});
  const [isFetching, setIsFetching] = useState(false);

  const fetchPendingRequests = async () => {
    setIsFetching(true);
    try {
      const response = await fetch("/api/admin/zeko-pending-requests");
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch pending requests");
      }

      setPendingRequests(data.requests || []);
    } catch (err) {
      console.error("Error fetching pending mint requests:", err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const mintNextNFT = async () => {
    if (isLoading || pendingRequests.length === 0) return;

    // Get the next request to process
    const nextRequest = pendingRequests[0];
    setCurrentRequest(nextRequest);
    setIsLoading(true);

    try {
      const response = await mintMINANFTHelper({
        name: nextRequest.nft_name,
        signed_image_url:
          "https://gateway.pinata.cloud/ipfs/bafybeiaoz4yizmwpxa7oiorwm6jf5pb3blls5ydkqx65x5fjncgh46uer4",
        collection: "Zeko",
        collectionDescription: "Unique Zeko Collection NFT",
        price: 0,
        keys: [],
        owner_address: nextRequest.wallet_address,
        ipfs: "bafybeiaoz4yizmwpxa7oiorwm6jf5pb3blls5ydkqx65x5fjncgh46uer4",
        nft_id: nextRequest.nft_id,
      });

      // Update the status in our local state
      setMintingStatus((prev) => ({
        ...prev,
        [nextRequest.id]: response,
      }));

      // Remove this request from the pending list
      setPendingRequests((prev) =>
        prev.filter((req) => req.id !== nextRequest.id)
      );

      console.log(`Minted NFT ${nextRequest.nft_name}:`, response);
    } catch (err) {
      console.error(`Error minting NFT ${nextRequest.nft_name}:`, err);

      setMintingStatus((prev) => ({
        ...prev,
        [nextRequest.id]: {
          success: false,
          message: err instanceof Error ? err.message : "Unknown error",
        },
      }));
    } finally {
      setIsLoading(false);
      setCurrentRequest(null);
    }
  };

  const refreshList = () => {
    fetchPendingRequests();
    setMintingStatus({});
  };

  return (
    <div className="mx-auto max-w-4xl p-8 py-40">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Zeko NFT Auto Minter</h1>
        <div className="space-x-4">
          <Button onClick={refreshList} disabled={isFetching || isLoading}>
            Refresh List
            {isFetching && <Spinner className="ml-2" />}
          </Button>
          <Button
            onClick={mintNextNFT}
            disabled={isLoading || pendingRequests.length === 0}
          >
            Mint Next NFT
            {isLoading && <Spinner className="ml-2" />}
          </Button>
        </div>
      </div>

      <div className="mb-6 rounded-md bg-gray-100 p-4">
        <h2 className="mb-2 text-lg font-semibold">Status</h2>
        <p>
          {isLoading
            ? `Currently minting: ${currentRequest?.nft_name} (ID: ${currentRequest?.nft_id})`
            : pendingRequests.length === 0
            ? "No pending mint requests"
            : `${pendingRequests.length} pending mint requests`}
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="mb-2 text-lg font-semibold">
            Pending Requests ({pendingRequests.length})
          </h2>
          {pendingRequests.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left">NFT Name</th>
                    <th className="p-2 text-left">NFT ID</th>
                    <th className="p-2 text-left">Wallet Address</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingRequests.map((request) => (
                    <tr key={request.id} className="border-t border-gray-300">
                      <td className="p-2">{request.nft_name}</td>
                      <td className="p-2">{request.nft_id}</td>
                      <td className="p-2">{request.wallet_address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="italic text-gray-500">No pending requests</p>
          )}
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold">Minting Results</h2>
          {Object.keys(mintingStatus).length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left">Request ID</th>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-left">Message</th>
                    <th className="p-2 text-left">Tx Hash</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(mintingStatus).map(([requestId, result]) => (
                    <tr key={requestId} className="border-t border-gray-300">
                      <td className="p-2">{requestId}</td>
                      <td className="p-2">
                        <span
                          className={
                            result.success ? "text-green-600" : "text-red-600"
                          }
                        >
                          {result.success ? "Success" : "Failed"}
                        </span>
                      </td>
                      <td className="p-2">{result.message || "No message"}</td>
                      <td className="p-2">
                        {result.txHash ? (
                          <a
                            href={`https://minascan.io/mainnet/tx/${result.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                          >
                            {result.txHash.substring(0, 8)}...
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="italic text-gray-500">No minting results yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
