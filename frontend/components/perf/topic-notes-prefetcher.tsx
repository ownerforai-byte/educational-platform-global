"use client";

/**
 * components/perf/topic-notes-prefetcher.tsx — ADD-ONLY intent prefetch layer.
 *
 * Why: `components/content/topic-vertical-notes.tsx` (client component) renders
 * a topic page with a two-stage client waterfall —
 *   1. `loadData("syllabus-notes/<subject>/_manifest.json")`
 *   2. N × `loadData("syllabus-notes/<subject>/<unit>/<file>.json")`
 * plus a 510 KB `ravikishan/manifest.json` — so the first paint after a click
 * waits on a round trip that was *predictable* from the link the user hovered.
 *
 * What: this component renders nothing and attaches three passive, delegated
 * listeners to `document`. When pointer/focus intent lands on a topic link it
 * warms exactly the JSON that link's page will ask for, so the click resolves
 * from the in-memory `loadData` cache instead of the network.
 *
 * Safety (all guarded, all additive):
 *   • intent only — `mouseover` / `focusin` / `touchstart`; no timers, no polls
 *   • deduped per route via a bounded LRU, at most `MAX_CONCURRENT` in flight
 *   • skipped when offline, on `saveData`, or on 2g/slow-2g connections
 *   • scheduled through `onIdle`, so it never competes with paint
 *   • every failure is swallowed through `reportClientError` (never throws)
 */

import { useEffect } from "react";
import { loadData, peekData, prefetchData } from "@/lib/data-loader";
import { reportClientError } from "@/lib/errors/app-error";
import { onIdle } from "@/lib/perf/idle";
import { createLru } from "@/lib/perf/memo";

/** Notes tracks whose topic routes render the client notes viewer. */
export const TOPIC_TRACKS = ["class-11-notes", "class-12-notes"] as const;

/**
 * `/class-11-notes/physics/chapters/units-and-measurement/topics/...`
 * — anchored, segment-validated, query/hash tolerant.
 */
export const TOPIC_ROUTE_PATTERN =
  /^\/(class-(?:11|12)-notes)\/([a-z0-9-]+)\/chapters\/([a-z0-9-]+)\/topics\/([a-z0-9-]+)/i;

/** Max simultaneous background note fetches. */
export const MAX_CONCURRENT = 2;
/** Max topic body files warmed per hovered link. */
export const MAX_FILES_PER_TOPIC = 3;

/** Parsed pieces of a topic route. */
export interface TopicRouteParts {
  track: string;
  subjectSlug: string;
  unitId: string;
  topicSlug: string;
}

/** Manifest row shape used by the notes viewer. */
interface NotesManifestItem {
  filename: string;
  unitSlug?: string;
  topicSlug?: string;
}

/**
 * Extracts the notes coordinates from an internal topic href.
 * Returns `null` for external links, other routes and malformed values.
 */
export function parseTopicRoute(href: string): TopicRouteParts | null {
  if (!href || href.startsWith("http") || href.startsWith("//")) return null;
  const path = href.split(/[?#]/)[0];
  const match = TOPIC_ROUTE_PATTERN.exec(path);
  if (!match) return null;
  return {
    track: match[1],
    subjectSlug: match[2].toLowerCase(),
    unitId: match[3].toLowerCase(),
    topicSlug: match[4].toLowerCase(),
  };
}

/** Deterministic path of a subject's syllabus-notes manifest. */
export function notesManifestPath(subjectSlug: string): string {
  return `syllabus-notes/${subjectSlug}/_manifest.json`;
}

/** True when the browser's own hints say background fetching is unwelcome. */
export function networkAllowsPrefetch(): boolean {
  if (typeof navigator === "undefined") return false;
  if (navigator.onLine === false) return false;
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (connection?.saveData) return false;
  const effective = connection?.effectiveType;
  return effective !== "slow-2g" && effective !== "2g";
}

/** Unused-import guard: keeps `loadData` referenced for type-only parity. */
export const NOTES_LOADER = loadData;

/**
 * Warms the JSON a topic page will request, using only what is already in
 * memory. When the subject manifest is still cold, it warms just the manifest
 * (one known request) rather than guessing file names.
 *
 * Resolves with the number of body files scheduled; never rejects.
 */
export async function prefetchTopicNotes(parts: TopicRouteParts): Promise<number> {
  try {
    const manifestPath = notesManifestPath(parts.subjectSlug);
    const manifest = await peekData<NotesManifestItem[]>(manifestPath);

    if (!manifest || !Array.isArray(manifest)) {
      prefetchData(manifestPath);
      return 0;
    }

    const relevant = manifest
      .filter(
        (item) =>
          typeof item?.filename === "string" &&
          item.unitSlug === parts.unitId &&
          (item.topicSlug === parts.topicSlug || item.filename.includes(parts.topicSlug)),
      )
      .slice(0, MAX_FILES_PER_TOPIC);

    for (const item of relevant) {
      prefetchData(`syllabus-notes/${parts.subjectSlug}/${parts.unitId}/${item.filename}`);
    }
    return relevant.length;
  } catch (error) {
    reportClientError("topic-notes-prefetch", error, { subject: parts.subjectSlug });
    return 0;
  }
}

/**
 * Invisible, app-wide warm-up. Mount once (see `app/(app)/layout.tsx`); it
 * renders `null`, adds no DOM, styles nothing and changes no workflow.
 */
export function TopicNotesPrefetcher() {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const seen = createLru<true>(64);
    const inFlight = new Set<string>();

    const handleIntent = (event: Event) => {
      if (!networkAllowsPrefetch()) return;
      if (inFlight.size >= MAX_CONCURRENT) return;

      const target = event.target as Element | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const parts = parseTopicRoute(anchor.getAttribute("href") ?? "");
      if (!parts) return;

      const key = `${parts.subjectSlug}/${parts.unitId}/${parts.topicSlug}`;
      if (seen.has(key) || inFlight.has(key)) return;
      seen.set(key, true);
      inFlight.add(key);

      // Deferred to idle so a fast pointer sweep never competes with paint.
      onIdle(
        () => {
          void prefetchTopicNotes(parts)
            .catch((error: unknown) => {
              reportClientError("topic-notes-prefetch:run", error, { key });
            })
            .finally(() => {
              inFlight.delete(key);
            });
        },
        { timeoutMs: 250 },
      );
    };

    document.addEventListener("mouseover", handleIntent, { passive: true });
    document.addEventListener("focusin", handleIntent, { passive: true });
    document.addEventListener("touchstart", handleIntent, { passive: true });

    return () => {
      document.removeEventListener("mouseover", handleIntent);
      document.removeEventListener("focusin", handleIntent);
      document.removeEventListener("touchstart", handleIntent);
    };
  }, []);

  return null;
}
