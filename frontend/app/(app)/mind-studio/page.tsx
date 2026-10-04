import type { Metadata } from "next";
import { ImageHub } from "@/features/image-hub";

export const metadata: Metadata = {
  title: "Image Hub — Agnes 2.1 Flash · Ravikisan's Platform",
  description:
    "Every student's image studio: describe a picture or an academic figure and Agnes 2.1 Flash draws it (puter.js browser fallback), with the gallery saved to your account and downloads.",
};

/**
 * IMAGE HUB (owner request 2026-10-02): the former Mind Studio diagram
 * workspace is REPLACED — this route now hosts the whole image interface:
 * prompt → Agnes 2.1 Flash image chain → puter.js fallback → gallery.
 *
 * Open to every signed-in student (owner request 2026-10-04: "enable saving
 * of image for every user"): layout.tsx only asks for a login, and the
 * backend endpoints /api/ai/image + /api/ai/figure enforce the same
 * every-user boundary (with the ai-image rate-limit tier protecting the key).
 */
export default function ImageHubPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-2 sm:px-4 py-4 sm:py-6">
      <ImageHub />
    </div>
  );
}
