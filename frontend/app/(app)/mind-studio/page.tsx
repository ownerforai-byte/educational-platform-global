import type { Metadata } from "next";
import { ImageHub } from "@/features/image-hub";

export const metadata: Metadata = {
  title: "Image Hub — Agnes 2.1 Flash · Ravikisan's Platform",
  description:
    "Owner-only image studio: describe a picture and Agnes 2.1 Flash draws it (puter.js browser fallback), with a per-session gallery and downloads.",
  // Owner-only (layout.tsx gates the render) — keep the studio out of
  // search indexes too.
  robots: { index: false, follow: false },
};

/**
 * IMAGE HUB (owner request 2026-10-02): the former Mind Studio diagram
 * workspace is REPLACED — this route now hosts the whole image interface:
 * prompt → Agnes 2.1 Flash image chain → puter.js fallback → gallery.
 *
 * The owner-only gate lives in layout.tsx (login/home bounces); the backend
 * endpoint /api/ai/image enforces the same boundary server-side.
 */
export default function ImageHubPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-2 sm:px-4 py-4 sm:py-6">
      <ImageHub />
    </div>
  );
}
