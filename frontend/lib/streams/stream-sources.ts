/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ⚠️ IMPORTANT — RETAINED DATA, NOT DEAD CODE ⚠️
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Owner instruction, 2026-11-08 (clarified):
 *   "i didnt mean to disable them but just that small box which shows this
 *    notes belongs to which (like platform, webnotee, nepalenotes) ... so just
 *    that small box which shows the source is to be disabled for now nothing
 *    more - keep rest all (stream, all source pdf working)".
 *
 * ALL THREE PDF SOURCES ARE LIVE. Only the small source-labelling badge is
 * hidden (SHOW_SOURCE_BADGE = false). Streams, all source PDFs, the chapter
 * classification and the doc-count-driven renderer all keep working.
 *
 * DO NOT:
 *   - disable or delete any of the three sources below,
 *   - delete lib/docs-catalog.ts, lib/webnotee-catalog.ts or
 *     lib/nepalenotes-streams.ts (298 scraped chapter records),
 *   - delete lib/chapter-resources.ts or direct-stream-pdf-blocks.tsx,
 *   - "clean up" the badge branches that are currently hidden,
 *   - prune nepalenotes entries whose driveIds are still empty (PDFs pending).
 *
 * The badge is only HIDDEN, not removed — flip SHOW_SOURCE_BADGE to true to
 * bring it back. Every agent MUST obey this rule. No exceptions.
 * ═══════════════════════════════════════════════════════════════════════════
 */

export type StreamSourceId = "webnotee" | "platform" | "nepalenotes";

export type StreamSourceFlag = {
  /** true = this source's PDFs stream normally. Must stay true. */
  enabled: boolean;
  label: string;
  /** Where the source's catalog lives. */
  registry: string;
  note: string;
};

export const STREAM_SOURCES: Readonly<Record<StreamSourceId, StreamSourceFlag>> = {
  webnotee: {
    enabled: true,
    label: "WebNotee / Google Drive",
    registry: "lib/webnotee-catalog.ts",
    note: "64 Drive /preview exercise PDFs + 5 HTML articles, classified to chapters in lib/chapter-resources.ts.",
  },
  platform: {
    enabled: true,
    label: "Platform documents",
    registry: "lib/docs-catalog.ts",
    note: "Local /pdfs and /materials PDFs and HTML hubs, classified to chapters in lib/chapter-resources.ts.",
  },
  nepalenotes: {
    enabled: true,
    label: "Nepal Enotes chapter PDFs",
    registry: "lib/nepalenotes-streams.ts",
    note: "298 scraped nepalenotes.com chapter pages (science -> class 11/12 -> 6 subjects); 171 unique confirmed Drive PDF IDs collected on 2026-11-08 and every chapter classified to a syllabus unitId. Wired into the class 11 AND class 12 Direct Stream pool. Verified frameable: Drive /preview returns 200 with no X-Frame-Options and the live CSP already allows drive.google.com (nepalenotes.com article pages send X-Frame-Options: SAMEORIGIN, so only the Drive PDFs are framed).",
  },
};

export const STREAM_SOURCE_IDS = Object.keys(STREAM_SOURCES) as StreamSourceId[];

export function isStreamSourceEnabled(source: StreamSourceId): boolean {
  return STREAM_SOURCES[source].enabled;
}

/** True while any source is live. All three are live. */
export const DIRECT_STREAM_ENABLED = STREAM_SOURCE_IDS.some(isStreamSourceEnabled);

/**
 * ⚠️ THE ONLY THING THAT IS "DISABLED": the small badge telling the reader
 * which source a note came from (Platform / WebNotee / NepalEnotes). Hidden
 * for now by owner request — the badge markup is retained, just not rendered.
 * Nothing else is disabled. Flip to true to show it again.
 */
export const SHOW_SOURCE_BADGE = false;
