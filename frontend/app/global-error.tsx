"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 bg-background">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold tracking-tight">Something went wrong</h2>
            <p className="text-sm text-muted-foreground max-w-md">
              An unexpected error occurred. This may be caused by a render timing issue in a
              third-party library. Please try again or reload the page.
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={reset} variant="default">
              Try again
            </Button>
            <Button
              onClick={() => {
                window.location.reload();
              }}
              variant="outline"
            >
              Reload page
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
