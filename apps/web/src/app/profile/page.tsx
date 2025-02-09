"use client";

import { Spinner2 } from "@/components/common/Spinner";
import { useNetworkStore } from "@/lib/stores/network";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  const networkStore = useNetworkStore();
  const router = useRouter();

  useEffect(() => {
    if (networkStore.address) {
      router.push(`/u/${networkStore.address}`);
    }
  }, [networkStore.address, router]);

  if (!networkStore.address) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center p-8">
        <button
          className="primary-btn"
          onClick={() => {
            networkStore.connectWallet(false);
          }}
        >
          Connect your wallet first
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Spinner2 />
    </div>
  );
}
