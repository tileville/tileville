"use client"; // Error components must be Client Components

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
    // Log the error to an error reporting service
    Sentry.captureException(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return <ErrorBoundaryFallbackComponent className="" />;
}
