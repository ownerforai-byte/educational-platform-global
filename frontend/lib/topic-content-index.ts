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
const DATA_ROOTS: string[] = [
  resolve(dirname(__filename), "..", "public", "data"),
  join(process.cwd(), "public", "data"),
  join(process.cwd(), "frontend", "public", "data"),
  resolve(process.cwd(), "..", "public", "data"),
];

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
 * When the primary manifest has no entry for the topic, the supplementary
 * `ravikishan/manifest.json` is checked exactly the way the client workspace
 * checks it (path contains the unit id, and the topic slug matches either the
 * entry's `data.topicSlug` or its filename). Class-12 notes live only in that
 * supplementary manifest, so without this the page rendered "Coming Soon"
 * above the very notes it was showing.
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
  return hasSupplementaryNote(unitId, topicSlug);
}

interface SupplementaryEntry {
  path: string;
  data?: { topicSlug?: string };
}

let supplementaryCache: SupplementaryEntry[] | null = null;

/** Cached read of `ravikishan/manifest.json` (the inline class-11+12 export). */
async function readSupplementaryManifest(): Promise<SupplementaryEntry[]> {
  if (supplementaryCache) return supplementaryCache;
  for (const root of DATA_ROOTS) {
    try {
      const raw = await readFile(join(root, "ravikishan", "manifest.json"), "utf-8");
      const parsed: unknown = JSON.parse(raw);
      supplementaryCache = Array.isArray(parsed) ? (parsed as SupplementaryEntry[]) : [];
      return supplementaryCache;
    } catch {
      // try next candidate root
    }
  }
  supplementaryCache = [];
  return supplementaryCache;
}

/** Same match the client workspace uses for its supplementary source. */
async function hasSupplementaryNote(
  unitId: string,
  topicSlug: string,
): Promise<boolean> {
  const entries = await readSupplementaryManifest();
  return entries.some((entry) => {
    if (!entry?.data) return false;
    const parts = String(entry.path ?? "").split("/");
    return (
      parts.includes(unitId) &&
      (entry.data.topicSlug === topicSlug ||
        parts[parts.length - 1].includes(topicSlug))
    );
  });
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