import { readFile } from "fs/promises";
import { CONTENT_CACHE_TTL_MS, contentCache } from "../../lib/cache.js";
import { resolveDataPath } from "../../utils/paths";

/**
 * Shared reader for the website content manifest
 * (`frontend/public/data/content/manifest.json`, generated from `content/`).
 *
 * REUSE (Agent 2 boundary): the PYQ and formula-sheet catalogs read the SAME
 * manifest the website's corpus loaders consume — no duplicated curriculum
 * data, no new authoring surface. The manifest is static between deploys, so
 * the pagination anchor in the list routes is a stable list index.
 *
 * Entry shape (subset the mobile routes need):
 *   { path: "practice/questions/class-11/physics/<unit>/01-neb-2023.json",
 *     data: { title, unitSlug, topicSlug, source, notes: string[] } }
 */
export interface ManifestEntry {
  path: string;
  data: {
    title?: unknown;
    unitSlug?: unknown;
    topicSlug?: unknown;
    source?: unknown;
    notes?: unknown;
  };
}

/** Load (and cache) the shared content manifest. Empty array if absent. */
export async function loadContentManifest(): Promise<ManifestEntry[]> {
  return contentCache.getOrLoad("mobile-manifest:content", CONTENT_CACHE_TTL_MS, async () => {
    try {
      const raw = await readFile(resolveDataPath("content", "manifest.json"), "utf-8");
      const parsed = JSON.parse(raw) as unknown;
      return Array.isArray(parsed) ? (parsed as ManifestEntry[]) : [];
    } catch {
      // The manifest is a generated artifact; a deploy without it must degrade
      // to an honest empty catalog, never a 500.
      return [];
    }
  });
}

/** String array out of a manifest entry's `notes` field (or []). */
export function notesOf(entry: ManifestEntry): string[] {
  return Array.isArray(entry.data.notes) ? entry.data.notes.filter((n): n is string => typeof n === "string") : [];
}

/** Title out of a manifest entry (or a fallback built from the file name). */
export function titleOf(entry: ManifestEntry): string {
  const t = entry.data.title;
  if (typeof t === "string" && t.trim().length > 0) return t;
  const file = entry.path.split("/").pop() ?? entry.path;
  return file.replace(/\.json$/, "").replace(/-/g, " ");
}

/**
 * Split a manifest path under a classified section into its coordinates.
 * `practice/questions/{class}/{subject}/[{unit}/]file.json` and
 * `formulas/{class}/{subject}/{unit}/file.json` — unit is optional for PYQs
 * (see frontend/lib/content/paths.ts KIND_SECTIONS).
 */
export function coordsOf(
  path: string,
  prefix: string,
): { classDir: string; subject: string; unit: string | null; file: string } | null {
  if (!path.startsWith(prefix)) return null;
  const parts = path.slice(prefix.length).split("/").filter(Boolean);
  if (parts.length < 3) return null;
  const file = parts.pop() as string;
  const unit = parts.length >= 3 ? (parts.pop() as string) : null;
  const subject = parts.pop() as string;
  const classDir = parts.pop() as string;
  if (!classDir || !subject || !file.endsWith(".json")) return null;
  return { classDir, subject, unit, file };
}

/** NEB year parsed from a PYQ file name (`01-neb-2023.json` → 2023). */
export function yearOfFile(file: string): number | null {
  const m = file.match(/(19|20)\d{2}/);
  return m ? Number(m[0]) : null;
}

/**
 * Validate a client-supplied content path for the file detail endpoints:
 * it must stay under the allowed section prefix and contain no traversal.
 * Returns the split segments, or null when the path must be rejected.
 */
export function safeContentPath(path: string, prefix: string): string[] | null {
  if (typeof path !== "string" || !path.startsWith(prefix) || !path.endsWith(".json")) return null;
  const segments = path.split("/").filter(Boolean);
  if (segments.some((s) => s === "." || s === ".." || s.includes("\\"))) return null;
  return segments;
}
