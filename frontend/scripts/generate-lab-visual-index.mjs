#!/usr/bin/env node
// frontend/scripts/generate-lab-visual-index.mjs
// Regenerates frontend/lib/lab-visual-index.ts, lab-visual-loaders.tsx and
// frontend/tests/lab-visual-index.test.ts from the SuperApp handoff archive.
// Run from repo root:  node frontend/scripts/generate-lab-visual-index.mjs
// Source data (gitignored): .tmp/topic-visual-split/topic-visual-split-agent-handoff/reference/
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const REF = ".tmp/topic-visual-split/topic-visual-split-agent-handoff/reference";
const audit = JSON.parse(readFileSync(path.join(REF, "runtime-map-audit.json"), "utf8"));
const csvLines = readFileSync(path.join(REF, "syllabus-slug-resolution.csv"), "utf8").trim().split("\n");

// ── Build alias map from CSV ──────────────────────────────────────────────
// For rows where resolution is "apostrophe-normalized" / "forward-prefix" /
// "reverse-prefix", the inputSlug is a syllabus slug that fuzzy-matched to
// winningMapKey (a JSON entry's topicSlug). We add inputSlug to that entry's
// slugs array so the index handles it without the legacy prefix resolver.
const aliases = {};
for (const line of csvLines.slice(1)) {
  const parts = line.split(",");
  const [inputSlug, resolution, winningMapKey] = [parts[0] || "", parts[1] || "", parts[2] || ""];
  if (["apostrophe-normalized", "forward-prefix", "reverse-prefix"].includes(resolution) && winningMapKey && inputSlug !== winningMapKey) {
    (aliases[winningMapKey] ??= []).push(inputSlug);
  }
}

// ── Build index entries ───────────────────────────────────────────────────
const indexEntries = audit.entries.map((e) => {
  const slugs = [e.topicSlug, ...(aliases[e.topicSlug] || [])];
  const entry = {
    labId: e.loaderTarget,
    kind: e.valueKind === "chapter" ? "chapter-animation" : "direct-visual",
    entranceTopic: e.entranceTopic,
    slugs,
  };
  if (e.valueKind === "chapter" && e.chapterProps) {
    entry.chapterProps = {
      topicSlug: e.chapterProps.topicSlug,
      topicTitle: e.chapterProps.topicTitle,
      ...(e.chapterProps.unitSlug ? { unitSlug: e.chapterProps.unitSlug } : {}),
      ...(e.chapterProps.subjectSlug ? { subjectSlug: e.chapterProps.subjectSlug } : {}),
    };
  }
  return entry;
});

console.log(`Index: ${indexEntries.length} entries  (chapter: ${indexEntries.filter(e=>e.kind==="chapter-animation").length}, direct: ${indexEntries.filter(e=>e.kind==="direct-visual").length})`);
console.log(`Alias map: ${Object.keys(aliases).length} topic keys with extra slugs, ${Object.values(aliases).reduce((a,b)=>a+b.length,0)} total aliases added`);

// ── 1. frontend/lib/lab-visual-index.ts ───────────────────────────────────
const idx = [];
idx.push("/**",
  " * Auto-generated from runtime-map-audit.json at commit 11e7212a.",
  ` * ${indexEntries.length} entries → ${indexEntries.filter(e=>e.kind==="chapter-animation").length} chapter-animation + ${indexEntries.filter(e=>e.kind==="direct-visual").length} direct-visual.`,
  " * Regenerate: node .tmp/generate-lab-visual-split.mjs  (handoff archive in .tmp/topic-visual-split/)",
  " */",
  "",
  "export interface ChapterTopicProps {",
  "  topicSlug: string;",
  "  topicTitle: string;",
  "  unitSlug?: string;",
  "  subjectSlug?: string;",
  "}",
  "",
  "export interface ChapterVisualEntry {",
  "  labId: string;",
  '  kind: "chapter-animation";',
  "  chapterProps: ChapterTopicProps;",
  "  entranceTopic: string;",
  "  slugs: readonly string[];",
  "}",
  "",
  "export interface DirectVisualEntry {",
  "  labId: string;",
  '  kind: "direct-visual";',
  "  entranceTopic: string;",
  "  slugs: readonly string[];",
  "}",
  "",
  "export type LabVisualIndexEntry = ChapterVisualEntry | DirectVisualEntry;",
  "",
  "export interface ResolverConflict { slug: string; labIds: readonly string[]; }",
  "",
  "export const LAB_VISUAL_INDEX: readonly LabVisualIndexEntry[] = [");

for (const e of indexEntries) {
  const slugsStr = e.slugs.map((s) => JSON.stringify(s)).join(", ");
  if (e.kind === "chapter-animation") {
    const cp = e.chapterProps;
    const cpStr =
      `topicSlug: ${JSON.stringify(cp.topicSlug)}, topicTitle: ${JSON.stringify(cp.topicTitle)}` +
      (cp.unitSlug ? `, unitSlug: ${JSON.stringify(cp.unitSlug)}` : "") +
      (cp.subjectSlug ? `, subjectSlug: ${JSON.stringify(cp.subjectSlug)}` : "");
    idx.push(
      `  { labId: ${JSON.stringify(e.labId)}, kind: "chapter-animation", chapterProps: { ${cpStr} }, entranceTopic: ${JSON.stringify(e.entranceTopic)}, slugs: [${slugsStr}] },`
    );
  } else {
    idx.push(
      `  { labId: ${JSON.stringify(e.labId)}, kind: "direct-visual", entranceTopic: ${JSON.stringify(e.entranceTopic)}, slugs: [${slugsStr}] },`
    );
  }
}

idx.push("];",
  "",
  "/** Known collisions where two slugs would resolve to different visuals. Empty = no conflicts. */",
  "export const RESOLVER_CONFLICTS: readonly ResolverConflict[] = [];",
  "",
  "// ── O(1) alias lookup table ──────────────────────────────────────────────",
  "const aliasToEntry: Map<string, LabVisualIndexEntry> = (() => {",
  "  const m = new Map<string, LabVisualIndexEntry>();",
  "  for (const entry of LAB_VISUAL_INDEX) {",
  "    for (const slug of entry.slugs) m.set(slug.toLowerCase(), entry);",
  "  }",
  "  return m;",
  "})();",
  "",
  "function normalizeSlug(slug: string): string {",
  '  return slug.toLowerCase().replace(/[^a-z0-9-]/g, "-");',
  "}",
  "",
  "/** De-apostrophize: 'newton-s-law' → 'newtons-law' (matches legacy normalizeSlugKey). */",
  "function deApostrophe(normalized: string): string {",
  '  return normalized.replace(/-s-/g, "s-").replace(/-s$/, "s");',
  "}",
  "",
  "export function resolveLabVisualEntry(topicSlug: string): LabVisualIndexEntry | null {",
  "  const normalized = normalizeSlug(topicSlug);",
  "  return aliasToEntry.get(normalized) ?? aliasToEntry.get(deApostrophe(normalized)) ?? null;",
  "}",
  "",
  "export function resolveLabVisualId(topicSlug: string): string | null {",
  "  return resolveLabVisualEntry(topicSlug)?.labId ?? null;",
  "}");

writeFileSync("frontend/lib/lab-visual-index.ts", idx.join("\n") + "\n");
console.log(`✓ frontend/lib/lab-visual-index.ts  (${idx.length} lines)`);

// ── 2. frontend/lib/lab-visual-loaders.tsx ────────────────────────────────
const importPaths = audit.namedImportPaths; // { ComponentName: "@/path" }
const allComponents = Object.entries(importPaths);
const visualComponents = allComponents.filter(([n]) => n !== "EntranceInsight");
const entrancePath = importPaths["EntranceInsight"] || "@/components/lab/entrance-insight";

const ld = [];
ld.push('"use client";',
  "import dynamic from \"next/dynamic\";",
  'import type { ReactNode, ComponentType } from "react";',
  'import type { LabVisualIndexEntry } from "@/lib/lab-visual-index";',
  "",
  "/** Shared skeleton shown while a 3D visual chunk is loading (mirrors SchematicDiagramLazy). */",
  "function VisualLoading() {",
  '  return <div className="min-h-[380px] animate-pulse rounded-2xl border border-border/60 bg-background/50" />;',
  "}",
  "const visualLoading = { loading: () => <VisualLoading /> } as const;",
  "");

for (const [name, modPath] of visualComponents) {
  ld.push(
    `const ${name}Lazy = dynamic(() => import("${modPath}").then((m) => m.${name}), { ssr: false, ...visualLoading });`
  );
}
ld.push(
  `const EntranceInsightLazy = dynamic(() => import("${entrancePath}").then((m) => m.EntranceInsight), { ssr: false });`
);
ld.push("");
ld.push(`// ${visualComponents.length} lazy visual targets (${visualComponents.length - 1} topic visuals + ChapterAnimation).`,
  `// Repeated symbols across groups share one loader. No fourth catalog/registry/manifest here.`,
  `const LOADERS: Record<string, ComponentType<any>> = {`);
for (const [name] of visualComponents) {
  ld.push(`  ${name}: ${name}Lazy,`);
}
ld.push("};",
  "",
  "/** True when a lazy loader is registered for this visual identity. */",
  "export function hasLabVisualLoader(labId: string): boolean {",
  "  return Object.prototype.hasOwnProperty.call(LOADERS, labId);",
  "}",
  "",
  "/**",
  " * Build the React node for a lab-visual index entry: the visual component",
  " * (a chapter-animation with per-entry props, or a bare direct visual) plus the",
  " * lazy EntranceInsight. Returns null only if the loader is unknown.",
  " */",
  "export function getLabVisualNode(entry: LabVisualIndexEntry): ReactNode {",
  "  const Visual = LOADERS[entry.labId];",
  "  if (!Visual) return null;",
  "  return (",
  "    <>",
  `      {entry.kind === "chapter-animation" ? <Visual {...entry.chapterProps} /> : <Visual />}`,
  "      <EntranceInsightLazy topic={entry.entranceTopic} />",
  "    </>",
  "  );",
  "}",
  "");

writeFileSync("frontend/lib/lab-visual-loaders.tsx", ld.join("\n") + "\n");
console.log(`✓ frontend/lib/lab-visual-loaders.tsx  (${ld.length} lines)`);

// ── 3. frontend/tests/lab-visual-index.test.ts ────────────────────────────
const test = `import { describe, it, expect, vi } from "vitest";
import {
  LAB_VISUAL_INDEX,
  RESOLVER_CONFLICTS,
  resolveLabVisualEntry,
  resolveLabVisualId,
} from "@/lib/lab-visual-index";

describe("lab-visual-index", () => {
  it("has 453 entries with correct chapter/direct split", () => {
    expect(LAB_VISUAL_INDEX).toHaveLength(453);
    const chapter = LAB_VISUAL_INDEX.filter((e) => e.kind === "chapter-animation");
    const direct  = LAB_VISUAL_INDEX.filter((e) => e.kind === "direct-visual");
    expect(chapter).toHaveLength(158);
    expect(direct).toHaveLength(295);
  });

  it("has no alias collisions between different visuals", () => {
    // Build slug → set of labIds
    const slugToLabIds = new Map<string, Set<string>>();
    for (const entry of LAB_VISUAL_INDEX) {
      for (const slug of entry.slugs) {
        const key = slug.toLowerCase();
        const set = slugToLabIds.get(key) ?? new Set<string>();
        set.add(entry.labId);
        slugToLabIds.set(key, set);
      }
    }
    const collisions = [...slugToLabIds.entries()].filter(([, ids]) => ids.size > 1);
    expect(collisions).toEqual([]);
  });

  it("RESOLVER_CONFLICTS is empty (no unresolvable conflicts)", () => {
    expect(RESOLVER_CONFLICTS).toEqual([]);
  });

  it("resolver returns null for unknown slugs", () => {
    expect(resolveLabVisualEntry("nonexistent-topic-zzz")).toBeNull();
    expect(resolveLabVisualId("nonexistent-topic-zzz")).toBeNull();
  });

  it("resolver is case-insensitive and de-apostrophizes", () => {
    // "physical-quantities" → ChapterAnimation
    expect(resolveLabVisualEntry("physical-quantities")?.labId).toBe("ChapterAnimation");
    expect(resolveLabVisualId("PHYSICAL-QUANTITIES")).toBe("ChapterAnimation");
    // Apostrophe variant: "newton-s-law" should resolve like "newtons-law"
    const newtonEntry = LAB_VISUAL_INDEX.find((e) =>
      e.slugs.some((s) => s.toLowerCase() === "newtons-law-of-universal-gravitation")
    );
    if (newtonEntry) {
      const resolved = resolveLabVisualEntry("newton-s-law-of-universal-gravitation");
      expect(resolved?.labId).toBe(newtonEntry.labId);
    }
  });

  it("every entry has valid structure", () => {
    for (const entry of LAB_VISUAL_INDEX) {
      expect(entry.slugs.length).toBeGreaterThanOrEqual(1);
      expect(entry.entranceTopic.length).toBeGreaterThan(0);
      expect(["chapter-animation", "direct-visual"]).toContain(entry.kind);
      expect(entry.labId.length).toBeGreaterThan(0);
    }
  });

  it("every distinct labId has a registered loader (no unknown targets)", async () => {
    const { hasLabVisualLoader } = await import("@/lib/lab-visual-loaders");
    const labIds = [...new Set(LAB_VISUAL_INDEX.map((e) => e.labId))];
    expect(labIds).toHaveLength(142); // 141 direct visuals + ChapterAnimation
    for (const labId of labIds) {
      expect(hasLabVisualLoader(labId)).toBe(true);
    }
  });

  it("getLabVisualNode builds a node for every entry", async () => {
    const { getLabVisualNode } = await import("@/lib/lab-visual-loaders");
    for (const entry of LAB_VISUAL_INDEX) {
      expect(getLabVisualNode(entry)).not.toBeNull();
    }
  });

  it("direct visuals resolve to their named component", () => {
    // Find a known direct visual entry
    const entry = LAB_VISUAL_INDEX.find((e) => e.labId === "ProjectileMotionVisual");
    expect(entry).toBeDefined();
    expect(entry?.kind).toBe("direct-visual");
    const resolved = resolveLabVisualEntry("projectile-motion-and-its-applications");
    expect(resolved?.labId).toBe("ProjectileMotionVisual");
  });

  it("chapter entries have chapterProps with topicSlug and topicTitle", () => {
    for (const entry of LAB_VISUAL_INDEX.filter((e) => e.kind === "chapter-animation")) {
      expect(entry.kind).toBe("chapter-animation");
      if (entry.kind === "chapter-animation") {
        expect(entry.chapterProps.topicSlug.length).toBeGreaterThan(0);
        expect(entry.chapterProps.topicTitle.length).toBeGreaterThan(0);
      }
    }
  });
});
`;
writeFileSync("frontend/tests/lab-visual-index.test.ts", test + "\n");
console.log(`✓ frontend/tests/lab-visual-index.test.ts  written`);

console.log("\nAll 3 files written. Verify topic-vertical-notes.tsx uses the sync resolver + lazy render (Phase 1 consumer edit).");
