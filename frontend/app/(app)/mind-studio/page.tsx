import type { Metadata } from "next";
import { ImageHub } from "@/features/image-hub";

export const metadata: Metadata = {
  title: "Image Hub — Agnes 2.1 Flash · Ravikisan's Platform",
  description:
    "Owner-only image studio: describe a picture or an academic figure and Agnes 2.1 Flash draws it (puter.js browser fallback), with the gallery saved to your account and downloads.",
};

/**
 * IMAGE HUB (owner request 2026-10-02): the former Mind Studio diagram
 * workspace is REPLACED — this route now hosts the whole image interface:
 * prompt → Agnes 2.1 Flash image chain → puter.js fallback → gallery.
 *
 * Owner emails only (owner request 2026-10-05: "make the image hub under
 * owner emails only"): layout.tsx bounces everyone else, and the backend
 * endpoints /api/ai/image + /api/ai/figure + /api/ai/image-history +
 * /api/ai/image-search + /api/ai/image-facts enforce the same boundary
 * (with the ai-image rate-limit tier protecting the key).
 */
export default function ImageHubPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-2 sm:px-4 py-4 sm:py-6">
      <ImageHub />
    </div>
  );
}
