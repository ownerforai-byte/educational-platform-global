import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Offline — Ravikisan's Platform",
  description: "You are offline. Cached pages are still available.",
};

/**
 * Offline fallback page — served by the service worker when a navigation
 * cannot be fulfilled from the network or cache.
 */
export default function OfflinePage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 py-16 text-center"
    >
      <div
        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted"
        aria-hidden="true"
      >
        <span className="text-3xl" role="img" aria-label="Cloud with slash">
          📴
        </span>
      </div>
      <h1 className="text-2xl font-bold tracking-tight">You&apos;re offline</h1>
      <p className="max-w-md text-muted-foreground">
        No internet connection right now. Pages you have visited before are
        still available from cache, and everything will sync automatically once
        you reconnect.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-colors hover:bg-primary/90"
      >
        Go to homepage
      </Link>
    </main>
  );
}