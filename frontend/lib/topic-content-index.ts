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
 */

const __filename = fileURLToPath(import.meta.url);
const PROJECT_ROOT = resolve(dirname(__filename), "..", "..");

export interface TopicManifestItem {
  unitSlug: string;
  topicSlug: string;
  title?: string;
  filename: string;
  source?: string;
  duplicateType?: number;
}

const manifestCache = new Map<string, TopicManifestItem[]>();

export async function getTopicManifest(
  subjectSlug: string,
): Promise<TopicManifestItem[]> {
  const cached = manifestCache.get(subjectSlug);
  if (cached) return cached;
  let parsed: TopicManifestItem[] = [];
  try {
    const abs = join(
      PROJECT_ROOT,
      "public",
      "data",
      "syllabus-notes",
      subjectSlug,
      "_manifest.json",
    );
    parsed = JSON.parse(await readFile(abs, "utf-8"));
    if (!Array.isArray(parsed)) parsed = [];
  } catch {
    parsed = [];
  }
  manifestCache.set(subjectSlug, parsed);
  return parsed;
}

/**
 * True when at least one authored note in the subject manifest belongs to
 * this unit/topic AND its JSON file actually exists — mirroring the client
 * workspace, which loads the manifest entry and then the file itself.
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
  if (matches.length === 0) return false;
  // Verify at least one referenced note file loads (same source the client uses).
  for (const m of matches) {
    try {
      await access(
        join(
          PROJECT_ROOT,
          "public",
          "data",
          "syllabus-notes",
          subjectSlug,
          unitId,
          m.filename,
        ),
      );
      return true;
    } catch {
      continue;
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
