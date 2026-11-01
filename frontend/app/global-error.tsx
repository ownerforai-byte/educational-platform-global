"use client";

import { useEffect } from "react";
import "@/app/globals.css";
import { ErrorPage } from "@/components/errors/error-page";
import { reportClientError } from "@/lib/errors/app-error";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportClientError("global-error-boundary", error, {
      digest: error.digest,
      route: typeof window !== "undefined" ? window.location.pathname : undefined,
    });
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <ErrorPage error={error} reset={reset} />
      </body>
    </html>
  );
}
