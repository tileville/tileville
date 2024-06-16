"use client";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { POSTHOG_TOKEN, POSTHOG_URI } from "@/constants";

if (typeof window !== "undefined") {
  posthog.init(POSTHOG_TOKEN, {
    api_host: POSTHOG_URI,
    person_profiles: "identified_only",
    capture_pageview: false,
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") {
        posthog.debug();
      }
    },
  });
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
