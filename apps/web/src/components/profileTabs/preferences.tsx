import { TILEVILLE_BOT_URL } from "@/constants";
import Link from "next/link";
import React, { useState } from "react";

export default function Preferences() {
  const [isTelegramConnected, setIsTelegramConnected] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center pt-8">
      <h2 className="mb-4 text-2xl font-semibold">Preference Settings</h2>
      <div className="flex items-center">
        {isTelegramConnected ? (
          <p className="text-lg">
            Telegram account:{" "}
            <span className="font-medium text-primary">Already connected</span>
          </p>
        ) : (
          <Link
            href={TILEVILLE_BOT_URL}
            target="_blank"
            className="rounded bg-primary px-4 py-2 text-white hover:bg-primary/70"
          >
            Connect Telegram Account
          </Link>
        )}
      </div>
    </div>
  );
}
