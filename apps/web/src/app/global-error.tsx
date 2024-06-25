"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { ErrorBoundaryFallbackComponent } from "@/components/error-boundary/ErrorBoundryFallbackComponent";
import { usePosthogEvents } from "@/hooks/usePosthogEvents";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const ph = usePosthogEvents();
  useEffect(() => {
    // Log the error to an error reporting service
    ph.reactErrorBoundary(error, {} as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return <ErrorBoundaryFallbackComponent className="" />;
}
