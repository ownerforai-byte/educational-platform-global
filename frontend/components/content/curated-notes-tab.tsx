"use client";

/**
 * Curated Notes tab — the ONE home of the one-tap notes curation
 * (owner 2026-11-09: "curate my notes — keep it in all chapter as content
 * tabs and remove from all ai … so create one as tab and render it in all
 * and remove it from ai"; later the same day: "wire it only with agnes api
 * key … make it conscious like it knows the place").
 *
 * The block lives as a content tab that EVERY chapter renders. It passes the
 * chapter's full place (class · subject · chapter · topic) to Agnes, which
 * curates 20–80 bullets for exactly that place — rendered in the block.
 */

import { CuratedNotesBlock } from "@/components/content/curated-notes-block";
import type { CuratePlace } from "@/lib/api/curate-notes";

/** "physics" → "Physics", "optional-maths" → "Optional Maths". */
export function subjectNameFromSlug(subjectSlug: string): string {
  return subjectSlug
    .split("-")
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");
}

/** "class-12" → "Class 12". */
function classLabelFromSlug(classSlug: string): string {
  return classSlug
    .split("-")
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");
}

export function CuratedNotesTab({
  classSlug,
  subjectSlug,
  unitId,
  topicTitle,
}: {
  classSlug: string;
  subjectSlug: string;
  unitId: string;
  topicTitle?: string;
}) {
  const place: CuratePlace = {
    surface: "chapter-tab",
    classLevel: classLabelFromSlug(classSlug),
    subject: subjectNameFromSlug(subjectSlug),
    chapter: subjectNameFromSlug(unitId),
    topic: topicTitle,
  };
  return <CuratedNotesBlock place={place} />;
}
