import { createHash } from "node:crypto";
import { z } from "zod";
import { readSectionMinTiers } from "./sectionTiers";
import { aiSparkTierFor } from "./aiSpark";

/**
 * SECTION TIER CHECK FOR SPARK UNLOCKS.
 *
 * The client coin gate wraps the section gate, so it must not sell an unlock
 * for a section the viewer's rung does not open. The unlock endpoint enforces
 * the same rule: a denied unlock never touches the balance.
 *
 * Only the spark-gated study-desk sections are mapped here (their code
 * defaults mirror frontend/lib/sections.ts); the owner's runtime minimums
 * (`section_min_tier.<id>`) are applied on top, like everywhere else.
 */
export const SPARK_GATED_SECTIONS: ReadonlyArray<{ id: string; href: string; minTier: Tier }> = [
  { id: "srs", href: "/srs", minTier: "plus" },
  { id: "mock-exams", href: "/mock-exams", minTier: "pro" },
  // /downloads is now owner-only — owners bypass the spark gate entirely, so it
  // no longer needs a spark-gated section entry here.
];

export type Tier = "guest" | "member" | "plus" | "pro" | "owner";
/** The one numeric ladder — exported so no consumer keeps a private copy. */
export const TIER_RANK: Record<Tier, number> = { guest: 0, member: 1, plus: 2, pro: 3, owner: 4 };

export interface TierUser {
  email?: string | null;
  role?: string | null;
  plan?: string | null;
  premiumStatus?: boolean | null;
}

// Canonical corpus map shared by unlock and reveal. The key is derived from the
// physical content-relative path, not from a client-supplied moduleKey.
export const CONTENT_KIND_SECTIONS = {
  concepts: "notes/concepts",
  theory: "notes/theory",
  guides: "notes/guides",
  notes: "notes/guides",
  lessons: "notes/lessons",
  formula: "formulas",
  pyqs: "practice/questions",
  sets: "practice/problem-sets",
  examples: "practice/examples",
  exams: "practice/exams",
  drills: "drills",
  mindmap: "visuals/mindmaps",
  rails: "visuals/rails",
  graph: "visuals/graphs",
  documents: "resources/documents",
  "question-bank": "resources/question-bank",
  exports: "resources/exports",
  plans: "resources/plans",
} as const;

export type ContentKind = keyof typeof CONTENT_KIND_SECTIONS;

/** Actual notes/content cost one spark; visual study aids remain free. */
export const CONTENT_UNLOCK_COSTS: Record<ContentKind, number> = {
  concepts: 1,
  theory: 1,
  guides: 1,
  notes: 1,
  lessons: 1,
  formula: 1,
  pyqs: 1,
  sets: 1,
  examples: 1,
  exams: 1,
  drills: 1,
  mindmap: 0,
  rails: 0,
  graph: 0,
  documents: 1,
  "question-bank": 1,
  exports: 1,
  plans: 1,
};

const LEGACY_CLASS_DIRS: Record<string, string> = {
  "class-11": "class-11",
  "class-11-notes": "class-11",
  "class-11e": "class-11",
  "class-12": "class-12",
  "class-12-notes": "class-12",
};
const CANONICAL_CLASS_DIRS = new Set(["class-11", "class-12"]);
const SAFE_SLUG = /^[\w.-]+$/;

export const contentTargetSchema = z.object({
  kind: z.enum(Object.keys(CONTENT_KIND_SECTIONS) as [ContentKind, ...ContentKind[]]),
  classSlug: z.string().min(1).max(60),
  subjectSlug: z.string().min(1).max(60),
  unitSlug: z.string().min(1).max(60),
  filename: z
    .string()
    .max(200)
    .regex(/^[\w.-]+\.json$/, "filename must be a plain JSON filename with no path separators"),
});

export type ContentTarget = z.infer<typeof contentTargetSchema>;

export interface CanonicalContentIdentity {
  /** Opaque, fixed-length key stored in profiles.credits_unlock. */
  key: string;
  /** Canonical class directory (class-11 or class-12). */
  classDir: string;
  /** Canonical section directory (for example notes/concepts). */
  section: string;
  /** POSIX content-relative path used for both hashing and file resolution. */
  relativePath: string;
}

function classDirOfTrack(trackSlug: string): string {
  return trackSlug.replace(/-notes$/, "");
}

function normalizeClassDir(value: string): string {
  return LEGACY_CLASS_DIRS[value] ?? value;
}

function isSafeSlug(value: string): boolean {
  return (
    value.length > 0 &&
    value.length <= 60 &&
    value !== "." &&
    value !== ".." &&
    SAFE_SLUG.test(value)
  );
}

function isSafeFilename(value: string): boolean {
  return (
    value.length > 0 &&
    value.length <= 200 &&
    !value.includes("..") &&
    !value.includes("/") &&
    !value.includes("\\") &&
    !value.includes("\0") &&
    /^[\w.-]+\.json$/.test(value)
  );
}

/**
 * Derive the one canonical identity for a corpus file. Kind and class aliases
 * collapse to their physical directories before hashing, so an unlock for one
 * spelling cannot be replayed against a different file.
 */
export function canonicalContentIdentity(
  target: ContentTarget,
): CanonicalContentIdentity | null {
  if (!Object.prototype.hasOwnProperty.call(CONTENT_KIND_SECTIONS, target.kind)) {
    return null;
  }

  const section = CONTENT_KIND_SECTIONS[target.kind];
  const classDir = normalizeClassDir(classDirOfTrack(target.classSlug));
  if (
    !CANONICAL_CLASS_DIRS.has(classDir) ||
    !isSafeSlug(classDir) ||
    !isSafeSlug(target.subjectSlug) ||
    !isSafeSlug(target.unitSlug) ||
    !isSafeFilename(target.filename)
  ) {
    return null;
  }

  const relativePath = [
    section,
    classDir,
    target.subjectSlug,
    target.unitSlug,
    target.filename,
  ].join("/");
  const digest = createHash("sha256").update(relativePath).digest("hex");
  return { key: `content:${digest}`, classDir, section, relativePath };
}

/**
 * Canonicalize both supported route-key spellings (`route:/srs` and the raw
 * `/srs` href used by older directory clients). Only internal absolute paths
 * are accepted; arbitrary namespaces, external URLs and traversal segments are
 * rejected. Query strings and fragments never become part of the identity.
 */
export function canonicalRouteModuleKey(moduleKey: string | undefined): string | null {
  if (!moduleKey || moduleKey.length > 200) return null;
  const value = moduleKey.startsWith("route:") ? moduleKey.slice("route:".length) : moduleKey;
  if (!value.startsWith("/") || value.startsWith("//")) return null;

  const rawPath = value.split(/[?#]/, 1)[0];
  if (!rawPath || /[\\\0-\x1f\x7f]/.test(rawPath) || /%(?:2f|5c)/i.test(rawPath)) {
    return null;
  }

  let decoded: string;
  try {
    decoded = decodeURIComponent(rawPath);
  } catch {
    return null;
  }
  if (/[\\\0-\x1f\x7f?#]/.test(decoded)) return null;

  const segments = decoded.split("/");
  while (segments.length > 1 && segments[segments.length - 1] === "") segments.pop();
  if (segments.slice(1).some((segment) => segment === "" || segment === "." || segment === "..")) {
    return null;
  }

  let routePath = `/${segments.slice(1).join("/")}`;
  // Mirror frontend creditModuleKey(): the PDF viewer shares the library window.
  if (routePath === "/pdfs/read") routePath = "/pdfs";
  return `route:${routePath}`;
}

/** The viewer's rung — the SAME resolver the spark allowance uses, so a tier
 * grant never disagrees with the quota. The caller's owner check wins first.
 */
export function tierForUser(user: TierUser, isOwner: boolean): Tier {
  if (isOwner) return "owner";
  return aiSparkTierFor(user);
}

/** The path inside a canonical client unlock key (`route:/srs` → `/srs`). */
function pathFromModuleKey(moduleKey: string | undefined): string | null {
  const canonical = canonicalRouteModuleKey(moduleKey);
  return canonical ? canonical.slice("route:".length) : null;
}

/**
 * True when this viewer's rung opens the section behind a valid route key.
 * Missing/malformed keys fail closed. Valid internal routes outside the spark-
 * gated registry remain allowed for compatibility with existing route unlocks.
 */
export async function canUnlockModule(
  user: TierUser,
  isOwner: boolean,
  moduleKey: string | undefined,
  readOverrides: () => Promise<Record<string, string>> = readSectionMinTiers,
): Promise<boolean> {
  const path = pathFromModuleKey(moduleKey);
  if (!path) return false;
  const section = SPARK_GATED_SECTIONS.find((s) => path === s.href || path.startsWith(`${s.href}/`));
  if (!section) return true;
  const overrides = await readOverrides();
  const override = overrides[section.id] as Tier | undefined;
  const min: Tier = override && override in TIER_RANK ? override : section.minTier;
  return TIER_RANK[tierForUser(user, isOwner)] >= TIER_RANK[min];
}
