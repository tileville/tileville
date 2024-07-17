"use client";

import { useEffect } from "react";
import { ErrorBoundaryFallbackComponent } from "@/components/error-boundary/ErrorBoundryFallbackComponent";
import * as Sentry from "@sentry/nextjs";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return <ErrorBoundaryFallbackComponent className="" />;
}
