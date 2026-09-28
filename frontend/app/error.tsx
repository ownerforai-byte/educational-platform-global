"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
// ADDITIVE (perf/resilience pass): normalized error funnel. Import only.
import { reportClientError } from "@/lib/errors/app-error";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  // ADDITIVE (perf/resilience pass): keeps the original console.error above
  // untouched and adds kind/status/correlation-id classification, which is
  // what makes a client report traceable to the backend log via `x-error-id`.
  useEffect(() => {
    reportClientError("app-error-boundary", error, {
      digest: error.digest,
      route: typeof window !== "undefined" ? window.location.pathname : undefined,
    });
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <h2 className="text-lg font-semibold">Something went wrong!</h2>
      <p className="text-muted-foreground text-sm">
        {error.message || "An unexpected error occurred."}
      </p>
      <div className="flex gap-2">
        <Button onClick={reset} variant="default">
          Try again
        </Button>
      </div>
    </div>
  );
}
