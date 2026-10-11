import { existsSync } from "node:fs";
import { readFile, access } from "node:fs/promises";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

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

/**
 * True when at least one authored note in the subject manifest belongs to
 * this unit/topic AND its JSON file actually exists — mirroring the client
 * workspace, which loads the manifest entry and then the file itself.
 *
 * The supplementary `ravikishan/manifest.json` is deliberately NOT counted.
 * Its class-12 entries are generated stubs ("This topic covers the fundamental
 * concepts of …", "Key definitions and theorems related to … should be
 * memorized") whose payload files are not shipped, so treating them as notes
 * hid the honest placeholder state above three filler lines.
 */
export async function hasTopicManifestNotes(
  subjectSlug: string,
  unitId: string,
  topicSlug: string,
): Promise<boolean> {
  const manifest = await getTopicManifest(subjectSlug);
  const matches = manifest.filter(
    (m) =>
      m.unitSlug === unitId &&
      (m.topicSlug === topicSlug || m.filename.includes(topicSlug)),
  );
  // Verify at least one referenced note file loads (same source the client uses).
  for (const m of matches) {
    for (const root of DATA_ROOTS) {
      try {
        await access(
          join(root, "syllabus-notes", subjectSlug, unitId, m.filename),
        );
        return true;
      } catch {
        // try next candidate root
      }
    }
  }
  return false;
}

/** Sync variant backed by a pre-warmed cache (build-time / RSC prefetch). */
export function hasTopicManifestNotesCached(
  subjectSlug: string,
  unitId: string,
  topicSlug: string,
): boolean {
  const manifest = manifestCache.get(subjectSlug);
  if (!manifest) return true; // unknown → assume content, never false-alarm
  return manifest.some(
    (m) =>
      m.unitSlug === unitId &&
      (m.topicSlug === topicSlug || m.filename.includes(topicSlug)),
  );
}