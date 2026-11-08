/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ⚠️ IMPORTANT — INTENTIONALLY DISABLED, NOT DEAD CODE ⚠️
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Owner instruction, 2026-11-08:
 *   "keep both, dont remove webenotes ... disable those three (webnotee,
 *    platform, nepalenote) for now ... later it will be added and mark it as
 *    important so a agent dont take it as dead."
 *
 * All three direct-stream PDF sources are OFF. This is a TEMPORARY pause, not
 * a removal. The data, the chapter classification, the renderer and both call
 * sites are all live code that will be switched back on in a later pass.
 *
 * DO NOT:
 *   - delete lib/docs-catalog.ts (platform) or lib/webnotee-catalog.ts,
 *   - delete lib/nepalenotes-streams.ts (298 scraped chapter records),
 *   - delete lib/chapter-resources.ts or direct-stream-pdf-blocks.tsx,
 *   - "clean up" the disabled branches, the flag checks or the guard tests,
 *   - prune entries whose driveIds are still empty (PDFs are pending).
 *
 * TO RE-ENABLE: flip `enabled` to true on the source(s) below. Nothing else
 * needs to change — getChapterStreamPdfs() and the renderer are already
 * doc-count driven, with no fixed two-block cap.
 *
 * Every agent MUST obey this rule. No exceptions.
 * ═══════════════════════════════════════════════════════════════════════════
 */

export type StreamSourceId = "webnotee" | "platform" | "nepalenotes";

export type StreamSourceFlag = {
  /** false = source is hidden everywhere but its data is retained. */
  enabled: boolean;
  label: string;
  /** Where the data lives, for the agent doing the later re-enable pass. */
  registry: string;
  note: string;
};

export const STREAM_SOURCES: Readonly<Record<StreamSourceId, StreamSourceFlag>> = {
  webnotee: {
    enabled: false,
    label: "WebNotee / Google Drive",
    registry: "lib/webnotee-catalog.ts",
    note: "64 Drive /preview exercise PDFs + 5 HTML articles, classified to chapters in lib/chapter-resources.ts.",
  },
  platform: {
    enabled: false,
    label: "Platform documents",
    registry: "lib/docs-catalog.ts",
    note: "Local /pdfs and /materials PDFs and HTML hubs, classified to chapters in lib/chapter-resources.ts.",
  },
  nepalenotes: {
    enabled: false,
    label: "Nepal Enotes chapter PDFs",
    registry: "lib/nepalenotes-streams.ts",
    note: "298 scraped nepalenotes.com chapter pages (science -> class 11/12 -> 6 subjects); 37 confirmed Drive PDF IDs so far. Remaining IDs are pending collection. Verified frameable: Drive /preview returns 200 with no X-Frame-Options and the live CSP already allows drive.google.com.",
  },
};

export const STREAM_SOURCE_IDS = Object.keys(STREAM_SOURCES) as StreamSourceId[];

export function isStreamSourceEnabled(source: StreamSourceId): boolean {
  return STREAM_SOURCES[source].enabled;
}

/** True once ANY source is switched back on. */
export const DIRECT_STREAM_ENABLED = STREAM_SOURCE_IDS.some(isStreamSourceEnabled);
