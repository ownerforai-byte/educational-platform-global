import type { Metadata } from "next";
import { ErrorPage } from "@/components/errors/error-page";

export const metadata: Metadata = {
  title: "Offline — Ravikisan's Platform",
  description: "You are offline. Cached pages are still available.",
};

/** Offline fallback cached by the service worker after a successful visit. */
export default function OfflinePage() {
  return <ErrorPage variant="offline" />;
}
