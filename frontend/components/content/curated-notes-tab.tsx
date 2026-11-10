"use client";

/**
 * Curated Notes tab — the ONE home of the one-tap notes curation
 * (owner 2026-11-09: "curate my notes — keep it in all chapter as content tabs
 * and remove from all ai … so create one as tab and render it in all and
 * remove it from ai").
 *
 * The block used to sit on the AI chat homes and the floating widget; it now
 * lives as a content tab that EVERY chapter renders. Tapping its single
 * button hands the same curation request to the canonical Veer chat
 * (/chat?q=…), where the curated revision notes come back in the framed
 * reply card where they can be copied or saved.
 */

import { useRouter } from "next/navigation";
import {
  CuratedNotesBlock,
  curateNotesPrompt,
} from "@/components/content/curated-notes-block";

/** "physics" → "Physics", "optional-maths" → "Optional Maths". */
function subjectNameFromSlug(subjectSlug: string): string {
  return subjectSlug
    .split("-")
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");
}

export function CuratedNotesTab({ subjectSlug }: { subjectSlug: string }) {
  const router = useRouter();
  return (
    <CuratedNotesBlock
      subjectName={subjectNameFromSlug(subjectSlug)}
      onCurate={(prompt) => {
        router.push(`/chat?q=${encodeURIComponent(prompt)}`);
      }}
    />
  );
}

/** Kept for callers that want the prompt without the tab. */
export { curateNotesPrompt };
