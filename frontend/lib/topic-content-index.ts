import { existsSync } from "node:fs";
import { readFile, access } from "node:fs/promises";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { classDirOfTrack, parseContentPath } from "@/lib/content/paths";
import { noteMatchesTopic } from "@/lib/note-topic-match";
import { resolveUnitSlug } from "@/lib/syllabus-notes-manifest";

/**
 * Server-side "does this syllabus topic have authored notes?" index.
 *
 * The topic workspace (TopicVerticalNotes) loads authored notes from
 * public/data/syllabus-notes/{subject}/_manifest.json at runtime. This module
 * mirrors that lookup on the server so pages can render an explicit
 * "Coming Soon" state when a topic would otherwise show an empty workspace.
 *
 * Path note: this file lives in `frontend/lib/`, so the public tree is one
 * level up (`frontend/public/data`). Next can be started either from the repo
 * root or from `frontend/`, so we probe the same candidates as
 * `lib/data-loader.ts` and additionally resolve relative to this module.
 */

const __filename = fileURLToPath(import.meta.url);

/** Candidate `public/data` roots, module-relative first. */
const DATA_ROOT_CANDIDATES: readonly string[] = [
  resolve(dirname(__filename), "..", "public", "data"),
  join(process.cwd(), "public", "data"),
  join(process.cwd(), "frontend", "public", "data"),
  resolve(process.cwd(), "..", "public", "data"),
];

/**
 * The candidates above, deduplicated and narrowed to the ones that exist here.
 *
 * Probing them blind meant every missing candidate threw `ENOENT`, which the
 * empty `catch {}` then swallowed — so checking one topic printed
 * `no such file or directory, access '…\frontend\public\data'` for each
 * candidate that isn't on this machine's layout. Filtering once at module load
 * keeps the happy path to a single `access` call and lets the per-file catch
 * below mean something again. The first two candidates are the same path when
 * Next runs with `frontend/` as cwd, hence the Set.
 */
const DATA_ROOTS: readonly string[] = (() => {
  const deduped = Array.from(new Set(DATA_ROOT_CANDIDATES));
  const existing = deduped.filter((root) => existsSync(root));
  // Unusual cwd (some bundlers) can leave nothing behind; keep every candidate
  // so reads still probe rather than silently reading nothing.
  return existing.length > 0 ? existing : deduped;
})();

export interface TopicManifestItem {
  unitSlug: string;
  topicSlug: string;
  title?: string;
  filename: string;
  source?: string;
  duplicateType?: number;
}

const manifestCache = new Map<string, TopicManifestItem[]>();

async function readManifestFile(
  subjectSlug: string,
): Promise<TopicManifestItem[]> {
  for (const root of DATA_ROOTS) {
    try {
      const raw = await readFile(
        join(root, "syllabus-notes", subjectSlug, "_manifest.json"),
        "utf-8",
      );
      const parsed: unknown = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as TopicManifestItem[]) : [];
    } catch {
      // try next candidate root
    }
  }
  return [];
}

export async function getTopicManifest(
  subjectSlug: string,
): Promise<TopicManifestItem[]> {
  const cached = manifestCache.get(subjectSlug);
  if (cached) return cached;
  const parsed = await readManifestFile(subjectSlug);
  manifestCache.set(subjectSlug, parsed);
  return parsed;
}

interface SupplementaryItem {
  path: string;
  data?: { topicSlug?: unknown };
}

let supplementaryCache: SupplementaryItem[] | null = null;

/**
 * The shipped classified corpus (`public/data/content/manifest.json`) — the
 * exact payload the workspace's supplementary branch reads. Cached after the
 * first read; the file is ~8 MB, so it is read once per process.
 */
async function getSupplementaryManifest(): Promise<SupplementaryItem[]> {
  if (supplementaryCache) return supplementaryCache;
  for (const root of DATA_ROOTS) {
    try {
      const raw = await readFile(join(root, "content", "manifest.json"), "utf-8");
      const parsed: unknown = JSON.parse(raw);
      supplementaryCache = Array.isArray(parsed) ? (parsed as SupplementaryItem[]) : [];
      return supplementaryCache;
    } catch {
      // try next candidate root
    }
  }
  supplementaryCache = [];
  return supplementaryCache;
}

/**
 * True when at least one authored note the workspace would load belongs to
 * this unit/topic. This is the "coming soon" decider and it MUST agree with
 * the loader in `topic-vertical-notes.tsx`, which resolves notes from two
 * sources:
 *
 *   1. the flat subject manifest (`syllabus-notes/{subject}/_manifest.json`)
 *      — matched here with unit-alias folding, and at least one referenced
 *      note file must actually load (same source the client uses);
 *   2. the shipped classified corpus (`content/manifest.json` under
 *      public/data) — class-directory-aware, exactly like the client's
 *      supplementary branch.
 *
 * Counting only source 1 used to make the banner announce "under progress"
 * on pages whose notes source 2 happily rendered (measured 2026-11-08:
 * ~200 class-12 topics, including 17 real note sets under
 * class-12/physics/electrostatics) — a page that looked broken while its
 * content sat one scroll below. Whatever the loader can show, the banner
 * reflects; only topics with neither source say "coming soon".
 */
export async function hasTopicManifestNotes(
  subjectSlug: string,
  unitId: string,
  topicSlug: string,
  classSlug: string,
): Promise<boolean> {
  const manifest = await getTopicManifest(subjectSlug);
  const wantedUnit = resolveUnitSlug(unitId);
  const matches = manifest.filter(
    (m) =>
      resolveUnitSlug(m.unitSlug) === wantedUnit &&
      noteMatchesTopic(m.topicSlug, m.filename, topicSlug),
  );
  // Verify at least one referenced note file loads (same source the client uses).
  for (const m of matches) {
    for (const root of DATA_ROOTS) {
      try {
        await access(
          join(root, "syllabus-notes", subjectSlug, m.unitSlug, m.filename),
        );
        return true;
      } catch {
        // try next candidate root
      }
    }
  }
  // Classified corpus — the loader's supplementary branch (class-aware).
  const supplementary = await getSupplementaryManifest();
  const classDir = classDirOfTrack(classSlug);
  return supplementary.some((item) => {
    const parsed = parseContentPath(item.path);
    if (!parsed || parsed.classDir !== classDir || parsed.unitSlug !== unitId) return false;
    const filename = item.path.split(/[\\/]/).at(-1);
    const data = item.data as { topicSlug?: unknown } | undefined;
    return noteMatchesTopic(
      typeof data?.topicSlug === "string" ? data.topicSlug : undefined,
      filename,
      topicSlug,
    );
  });
}

/** Sync variant backed by a pre-warmed cache (build-time / RSC prefetch). */
export function hasTopicManifestNotesCached(
  subjectSlug: string,
  unitId: string,
  topicSlug: string,
  classSlug: string,
): boolean {
  const manifest = manifestCache.get(subjectSlug);
  if (!manifest) return true; // unknown → assume content, never false-alarm
  const wantedUnit = resolveUnitSlug(unitId);
  const flatHit = manifest.some(
    (m) =>
      resolveUnitSlug(m.unitSlug) === wantedUnit &&
      noteMatchesTopic(m.topicSlug, m.filename, topicSlug),
  );
  if (flatHit) return true;
  const classDir = classDirOfTrack(classSlug);
  return (supplementaryCache ?? []).some((item) => {
    const parsed = parseContentPath(item.path);
    if (!parsed || parsed.classDir !== classDir || parsed.unitSlug !== unitId) return false;
    const filename = item.path.split(/[\\/]/).at(-1);
    const data = item.data as { topicSlug?: unknown } | undefined;
    return noteMatchesTopic(
      typeof data?.topicSlug === "string" ? data.topicSlug : undefined,
      filename,
      topicSlug,
    );
  });
}