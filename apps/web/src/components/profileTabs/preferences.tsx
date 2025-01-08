import { TILEVILLE_BOT_URL } from "@/constants";
import Link from "next/link";
import React from "react";
import { useTelegramStatus } from "@/db/react-query-hooks";
import { useNetworkStore } from "@/lib/stores/network";
import { Spinner2 } from "../common/Spinner";

export default function Preferences() {
  const networkStore = useNetworkStore();
  const { data: isVerified, isLoading } = useTelegramStatus(
    networkStore.address || ""
  );

  return (
    <div className="flex flex-col items-center justify-center pt-8">
      <h2 className="mb-4 text-2xl font-semibold">Preference Settings</h2>
      <div className="flex items-center">
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Spinner2 />
            <span>Checking telegram connection...</span>
          </div>
        ) : isVerified ? (
          <div className="flex flex-col items-center gap-2">
            <p className="text-lg">
              Telegram account:{" "}
              <span className="font-medium text-primary">Connected</span>
            </p>
            <p className="text-sm text-gray-600">
              You will receive notifications about new competitions, challenge
              updates, and rewards
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <Link
              href={TILEVILLE_BOT_URL}
              target="_blank"
              className="rounded bg-primary px-4 py-2 text-white hover:bg-primary/70"
            >
              Connect Telegram Account
            </Link>
            <p className="text-sm text-gray-600">
              Connect your Telegram account to receive notifications about new
              competitions, challenge updates, and rewards
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
