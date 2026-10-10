import type { Metadata } from "next";
import { ImageHub } from "@/features/image-hub";

export const metadata: Metadata = {
  title: "Diagram Hub · Ravikisan's Platform",
  description:
    "Owner-only drawing studio: describe a labelled diagram, an academic figure or a picture and the hub draws it (puter.js browser fallback), with the gallery saved to your account and downloads.",
};

/**
 * DIAGRAM HUB (owner request 2026-10-02): the former Mind Studio workspace is
 * REPLACED — this route now hosts the whole drawing interface:
 * prompt → server drawing engine → puter.js fallback → gallery. Renamed
 * Diagram Hub on 2026-10-07 (owner: no vendor name, no "AI" wording).
 *
 * Owner emails only (owner requests 2026-10-05 / 2026-10-06): the route sits
 * under the coin gate priced at 5 coins — owners open it free, and a
 * non-owner's unlock is refused (provider + the server unlock route), so
 * only owner emails ever reach the studio. The backend gates
 * /api/ai/image + /api/ai/figure with requireOwnerEmail as the real
 * boundary (with the ai-image rate-limit tier protecting the key).
 */
export default function ImageHubPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-2 sm:px-4 py-4 sm:py-6">
      <ImageHub />
    </div>
  );
}
