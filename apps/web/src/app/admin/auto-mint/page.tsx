"use client";
import { Spinner } from "@/components/common/Spinner";
import { SENDER_PUBLIC_KEY } from "@/constants";
import { useMintMINANFT } from "@/hooks/useMintMINANFT";
import { Button } from "@radix-ui/themes";
import { useState, useEffect, useRef } from "react";

interface Response {
  success?: boolean;
  message?: string;
  reason?: string;
  txHash?: string;
}

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
  const [isWorkerRunning, setIsWorkerRunning] = useState(false);
  const [pendingRequests, setPendingRequests] = useState<ZekoMintRequest[]>([]);
  const [currentRequest, setCurrentRequest] = useState<ZekoMintRequest | null>(
    null
  );
  const [mintingStatus, setMintingStatus] = useState<{
    [key: string]: Response;
  }>({});
  const [isFetching, setIsFetching] = useState(false);
  const [workerStatus, setWorkerStatus] = useState<
    "idle" | "running" | "sleeping"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("Worker is idle");
  const [currentNonce, setCurrentNonce] = useState<number | null>(null);
  const [sleepEndTime, setSleepEndTime] = useState<Date | null>(null);
  const [sleepTimer, setSleepTimer] = useState<string>("");

  // Use refs for values that we need to persist between renders but don't need to trigger re-renders
  const workerRunningRef = useRef(false);
  const nonceRef = useRef<number | null>(null);
  const sleepTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchPendingRequests = async () => {
    setIsFetching(true);
    try {
      const response = await fetch("/api/admin/zeko-pending-requests");
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch pending requests");
      }

      setPendingRequests(data.requests || []);
      return data.requests || [];
    } catch (err) {
      console.error("Error fetching pending mint requests:", err);
      return [];
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchPendingRequests();

    // Cleanup function to ensure worker is stopped if component unmounts
    return () => {
      stopWorker();
    };
  }, []);

  // Function to fetch the latest nonce for a wallet
  const fetchNonce = async () => {
    try {
      const sender = SENDER_PUBLIC_KEY || "";
      const response = await fetch(`/api/nonce?wallet_address=${sender}`);
      const data = await response.json();

      if (!data.success) {
        throw new Error("Failed to fetch nonce");
      }

      console.log("Fetched nonce:", data.nonce);
      setCurrentNonce(data.nonce);
      nonceRef.current = data.nonce;
      return data.nonce;
    } catch (error) {
      console.error("Error fetching nonce:", error);
      throw error;
    }
  };

  // Sleep function that returns a promise that resolves after the given time
  const sleep = (minutes: number) => {
    return new Promise<void>((resolve) => {
      const sleepMs = minutes * 60 * 1000;
      setWorkerStatus("sleeping");

      const wakeTime = new Date(Date.now() + sleepMs);
      setSleepEndTime(wakeTime);
      setStatusMessage(
        `Worker sleeping until ${wakeTime.toLocaleTimeString()}`
      );

      // Clear any existing sleep timeout
      if (sleepTimeoutRef.current) {
        clearTimeout(sleepTimeoutRef.current);
      }

      // Clear any existing timer interval
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }

      // Set up the countdown timer
      timerIntervalRef.current = setInterval(() => {
        const now = new Date();
        const diff = wakeTime.getTime() - now.getTime();

        if (diff <= 0) {
          if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
          }
          setSleepTimer("Waking up...");
        } else {
          const minutes = Math.floor(diff / 60000);
          const seconds = Math.floor((diff % 60000) / 1000);
          setSleepTimer(`${minutes}m ${seconds}s remaining`);
        }
      }, 1000);

      // Set the timeout to wake up
      sleepTimeoutRef.current = setTimeout(() => {
        // Clean up
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
        }

        setSleepEndTime(null);
        setStatusMessage("Worker resuming");
        setSleepTimer("");

        // Only resolve if the worker is still running
        if (workerRunningRef.current) {
          setWorkerStatus("running");
          resolve();
        }
      }, sleepMs);
    });
  };

  // Main worker function that processes the queue
  const startWorker = async () => {
    if (workerRunningRef.current) return;

    workerRunningRef.current = true;
    setIsWorkerRunning(true);
    setWorkerStatus("running");
    setStatusMessage("Worker starting...");

    try {
      // Initial fetch of nonce
      await fetchNonce();
      setStatusMessage(
        `Worker running with initial nonce: ${nonceRef.current}`
      );

      // Main processing loop
      while (workerRunningRef.current) {
        // Fetch fresh list of pending requests
        const freshRequests = await fetchPendingRequests();

        if (freshRequests.length === 0) {
          setStatusMessage("No pending requests, checking again in 1 minute");
          await sleep(1);

          // Check if worker was stopped during sleep
          if (!workerRunningRef.current) break;

          continue;
        }

        // Process each request
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < freshRequests.length; i++) {
          if (!workerRunningRef.current) break;

          const request = freshRequests[i];
          setCurrentRequest(request);
          setStatusMessage(
            `Processing request for ${request.nft_name} (ID: ${request.nft_id})`
          );

          try {
            // Attempt to mint the NFT
            const response = await mintMINANFTHelper({
              name: request.nft_name,
              signed_image_url:
                "https://gateway.pinata.cloud/ipfs/bafybeiaoz4yizmwpxa7oiorwm6jf5pb3blls5ydkqx65x5fjncgh46uer4",
              collection: "Zeko",
              collectionDescription: "Unique Zeko Collection NFT",
              price: 0,
              keys: [],
              owner_address: request.wallet_address,
              ipfs: "bafybeiaoz4yizmwpxa7oiorwm6jf5pb3blls5ydkqx65x5fjncgh46uer4",
              nft_id: request.nft_id,
              nonceFromWorker: nonceRef.current,
            });

            // Update status
            setMintingStatus((prev) => ({
              ...prev,
              [request.id]: {
                success: response?.success,
                message: response?.message,
                reason: response?.reason,
                txHash: response?.txHash,
              },
            }));

            // If successful, increment nonce
            console.log("RESPONSE", response);
            if (response?.success) {
              nonceRef.current = (nonceRef.current || 0) + 1;
              setCurrentNonce(nonceRef.current);
              setStatusMessage(
                `Successfully minted ${request.nft_name}. Current nonce: ${nonceRef.current}`
              );

              // Remove processed request from list
              setPendingRequests((prev) =>
                prev.filter((r) => r.id !== request.id)
              );
            } else {
              // If failed due to nonce issue or other errors, sleep and get fresh nonce
              if (!(response?.message === "Name is not reserved")) {
                setStatusMessage(
                  `Minting error: ${
                    response?.message || response?.reason || "Unknown error"
                  }. Sleeping for 10 minutes.`
                );
                await sleep(10);
                await fetchNonce();
                break; // Exit the for loop to restart with fresh requests and nonce
              }

              // If the name is not reserved, just mark it as processed
              setPendingRequests((prev) =>
                prev.filter((r) => r.id !== request.id)
              );
            }

            // Small delay between requests
            await new Promise((r) => setTimeout(r, 5000));
          } catch (error) {
            console.error(`Error processing request ${request.id}:`, error);
            setStatusMessage(
              `Error: ${
                error instanceof Error ? error.message : "Unknown error"
              }`
            );

            // Add the error to minting status
            setMintingStatus((prev) => ({
              ...prev,
              [request.id]: {
                success: false,
                message:
                  error instanceof Error ? error.message : "Unknown error",
              },
            }));

            // Sleep on error and get fresh nonce
            await sleep(10);
            await fetchNonce();
            break; // Exit the for loop to restart
          } finally {
            setCurrentRequest(null);
          }
        }
      }
    } catch (error) {
      console.error("Worker error:", error);
      setStatusMessage(
        `Worker stopped due to error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      cleanupWorker();
    }
  };

  const stopWorker = () => {
    workerRunningRef.current = false;
    cleanupWorker();
    setStatusMessage("Worker stopped");
  };

  const cleanupWorker = () => {
    // Clear timeouts and intervals
    if (sleepTimeoutRef.current) {
      clearTimeout(sleepTimeoutRef.current);
      sleepTimeoutRef.current = null;
    }

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    // Reset states
    setIsWorkerRunning(false);
    setWorkerStatus("idle");
    setSleepEndTime(null);
    setSleepTimer("");
    setCurrentRequest(null);
  };

  return (
    <div className="mx-auto max-w-4xl p-8 py-40">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Zeko NFT Auto Minter</h1>
        <div className="space-x-4">
          <Button
            onClick={fetchPendingRequests}
            disabled={isFetching || isWorkerRunning}
          >
            Refresh List
            {isFetching && <Spinner className="ml-2" />}
          </Button>

          {!isWorkerRunning ? (
            <Button
              onClick={startWorker}
              disabled={isWorkerRunning}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              Start Worker
            </Button>
          ) : (
            <Button
              onClick={stopWorker}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Stop Worker
            </Button>
          )}
        </div>
      </div>

      <div className="mb-6 rounded-md bg-gray-100 p-4">
        <h2 className="mb-2 text-lg font-semibold">Worker Status</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Status:</p>
            <p
              className={`${
                workerStatus === "running"
                  ? "text-green-600"
                  : workerStatus === "sleeping"
                  ? "text-orange-500"
                  : "text-gray-500"
              }`}
            >
              {workerStatus === "running"
                ? "Running"
                : workerStatus === "sleeping"
                ? "Sleeping"
                : "Idle"}
            </p>
          </div>

          <div>
            <p className="font-semibold">Current Nonce:</p>
            <p>{currentNonce !== null ? currentNonce : "Not set"}</p>
          </div>

          <div className="col-span-2">
            <p className="font-semibold">Status Message:</p>
            <p>{statusMessage}</p>
          </div>

          {workerStatus === "sleeping" && sleepTimer && (
            <div className="col-span-2">
              <p className="font-semibold">Sleep Timer:</p>
              <p>{sleepTimer}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mb-6 rounded-md bg-gray-100 p-4">
        <h2 className="mb-2 text-lg font-semibold">Queue Status</h2>
        <p>
          {pendingRequests.length === 0
            ? "No pending mint requests"
            : `${pendingRequests.length} pending mint requests`}
        </p>

        {currentRequest && (
          <div className="mt-2">
            <p className="font-semibold">Currently Processing:</p>
            <p>
              {currentRequest.nft_name} (ID: {currentRequest.nft_id}) for{" "}
              {currentRequest.wallet_address}
            </p>
          </div>
        )}
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
                    <th className="p-2 text-left">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingRequests.map((request) => (
                    <tr key={request.id} className="border-t border-gray-300">
                      <td className="p-2">{request.nft_name}</td>
                      <td className="p-2">{request.nft_id}</td>
                      <td className="p-2">{request.wallet_address}</td>
                      <td className="p-2">
                        {new Date(request.created_at).toLocaleString()}
                      </td>
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
                      <td className="p-2">
                        {result.message || result.reason || "No message"}
                      </td>
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
