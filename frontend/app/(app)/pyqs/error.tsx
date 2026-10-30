"use client";

import { useEffect } from "react";
import { ErrorPage } from "@/components/errors/error-page";
import { reportClientError } from "@/lib/errors/app-error";

/** PYQ-section crash fallback rendered inside the existing AppShell. */
export default function PyqsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportClientError("pyqs-error-boundary", error, {
      digest: error.digest,
      route: typeof window !== "undefined" ? window.location.pathname : undefined,
    });
  }, [error]);

  return <ErrorPage error={error} reset={reset} compact />;
}
