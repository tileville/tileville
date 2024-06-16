"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { ErrorBoundaryFallbackComponent } from "@/components/error-boundary/ErrorBoundryFallbackComponent";
import { usePosthogEvents } from "@/hooks/usePosthogEvents";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const ph = usePosthogEvents();
  useEffect(() => {
    // Log the error to an error reporting service
    ph.reactErrorBoundary(error, {} as any);
  }, [error]);

  return <ErrorBoundaryFallbackComponent className="" />;
}
