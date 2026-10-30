import type { Metadata } from "next";
import { ErrorPage } from "@/components/errors/error-page";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Offline — Ravikisan's Platform",
  description: "You are offline. Cached pages are still available.",
};

/** Static fallback served by the service worker only after transport failure. */
export default function OfflinePage() {
  return <ErrorPage variant="offline" />;
}
