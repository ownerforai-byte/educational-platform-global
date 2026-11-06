/**
 * lab-manifest-coverage.ts — inventory + parity gate for the 3D activity manifest.
 *
 *   cd frontend && node ../node_modules/tsx/dist/cli.mjs scripts/lab-manifest-coverage.ts
 *   cd frontend && node ../node_modules/tsx/dist/cli.mjs scripts/lab-manifest-coverage.ts --check
 *   (root: npm run audit:lab-manifest [-- --check])
 *
 * `plan.md` § "One 3D System for All Subjects" requires a coverage matrix over
 * every syllabus topic, an inventory of every 3D-related file, an orphan rule
 * and a parity check against the live sources. This script produces that
 * evidence and enforces the manifest half of it.
 *
 * It is deliberately dependency-free: it reads source DATA modules (manifest,
 * visual index, catalog, metadata, syllabus) plus the topic-map text, so it never
 * pulls Three.js into Node. `--check` exits 1 on any violation.
 */

import fs from "node:fs";
import path from "node:path";

import { LABS } from "@/lib/lab-catalog";
import { LAB_METADATA_LIST } from "@/lib/lab-metadata";
import {
  ACTIVITY_MANIFEST,
  PILOT_ACTIVITIES,
  type LabActivity,
} from "@/lib/lab-manifest";
import { LAB_VISUAL_INDEX } from "@/lib/lab-visual-index";
import { SYLLABUS, slugifySyllabusTopic } from "@/lib/syllabus";

const FRONTEND = path.resolve(__dirname, "..");
const REPO = path.resolve(FRONTEND, "..");
const LOADERS_FILE = path.join(FRONTEND, "lib", "lab-activity-loaders.ts");
const VISUAL_LOADERS_FILE = path.join(FRONTEND, "lib", "lab-visual-loaders.tsx");
const REGISTRY_FILE = path.join(FRONTEND, "lib", "lab-registry.tsx");
const REPORT_FILE = path.join(REPO, "reports", "lab-manifest-coverage.json");

type Violation = { rule: string; detail: string };

const violations: Violation[] = [];
const fail = (rule: string, detail: string) => violations.push({ rule, detail });

/* ── syllabus index ─────────────────────────────────────────────────────── */

type Placement = { classSlug: string; subject: string; unitId: string; title: string };

const topics = new Map<string, Placement>();
const unitIds = new Set<string>();
for (const cls of SYLLABUS) {
  for (const subject of cls.subjects) {
    for (const unit of subject.units) {
      unitIds.add(unit.id);
      for (const title of unit.topics) {
        topics.set(slugifySyllabusTopic(title), {
          classSlug: cls.slug,
          subject: subject.slug,
          unitId: unit.id,
          title,
        });
      }
    }
  }
}

/* ── live-source inventory ──────────────────────────────────────────────── */

/** Every slug the generated index resolves: canonical topic slugs plus aliases. */
const indexSlugSet = new Set(LAB_VISUAL_INDEX.flatMap((entry) => entry.slugs));

// Reachability for the orphan rule is "wired into the lazy loader", not "named in
// some map": `lab-visual-loaders.tsx` is the only module that can mount a topic
// visual, so a component it never imports can never reach a learner.
const visualLoadersSource = fs.readFileSync(VISUAL_LOADERS_FILE, "utf8");
const visualImportPaths = new Set(
  [...visualLoadersSource.matchAll(/import\("(@\/components\/lab\/[^"]+)"\)/g)].map((match) =>
    match[1].replace(/^@\//, ""),
  ),
);

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return entry.isFile() && /\.tsx?$/.test(entry.name) ? [full] : [];
  });
}

const visualFiles = walk(path.join(FRONTEND, "components", "lab", "topic-visuals")).map(
  (file) => path.relative(REPO, file).split(path.sep).join("/"),
);
const orphanVisuals = visualFiles.filter((file) => {
  const spec = file.replace(/^frontend\//, "").replace(/\.tsx?$/, "");
  return !visualImportPaths.has(spec);
});

/* ── registry metadata mirror (guarded, not derivable) ──────────────────── */
// `lab-metadata.ts` is a data-only mirror of `lab-registry.tsx`. Search, the
// site index and this manifest all read it precisely so they never import the
// component module — that module cannot even load in Node (it reaches a content
// pipeline). The mirror therefore cannot be derived, so it is guarded instead:
// an entry that disappears from the registry, or a title that drifts, fails the
// gate rather than silently serving stale metadata.
const registrySource = fs.readFileSync(REGISTRY_FILE, "utf8");
const registryTitleById = new Map(
  [...registrySource.matchAll(/id:\s*"([^"]+)",\s*\n\s*title:\s*"([^"]+)"/g)].map((match) => [
    match[1],
    match[2],
  ]),
);
for (const lab of LAB_METADATA_LIST) {
  const registryTitle = registryTitleById.get(lab.id);
  if (!registryTitle) {
    fail("registry-metadata-orphan", `lab-metadata entry "${lab.id}" is not in lab-registry.tsx`);
  } else if (registryTitle !== lab.title) {
    fail(
      "registry-metadata-drift",
      `lab-metadata title "${lab.title}" differs from registry title "${registryTitle}" (${lab.id})`,
    );
  }
}

/* ── reviewed orphan exemptions (strict rule) ───────────────────────────── */

const ORPHAN_EXEMPTIONS_FILE = path.join(FRONTEND, "scripts", "lab-manifest-orphans.json");
const orphanExemptions: { approved: Array<{ path: string; why: string }> } = JSON.parse(
  fs.readFileSync(ORPHAN_EXEMPTIONS_FILE, "utf8"),
);
const approvedOrphans = new Set(orphanExemptions.approved.map((entry) => entry.path));
const unexpectedOrphans = orphanVisuals.filter((file) => !approvedOrphans.has(file));
const staleExemptions = [...approvedOrphans].filter((file) => !orphanVisuals.includes(file));

/* ── manifest validation ────────────────────────────────────────────────── */

const loadersSource = fs.readFileSync(LOADERS_FILE, "utf8");
const registryIds = new Set(LAB_METADATA_LIST.map((lab) => lab.id));
const catalogIds = new Set(Object.keys(LABS));
const seenIds = new Set<string>();
const seenSlugs = new Map<string, string>();
const seenTopics = new Map<string, string>();

function checkRenderer(activity: LabActivity): void {
  const renderer = activity.renderer;

  if (renderer.kind === "module") {
    const relative = renderer.modulePath.replace(/^@\//, "");
    const exists = [`${relative}.tsx`, `${relative}.ts`].some((file) =>
      fs.existsSync(path.join(FRONTEND, file)),
    );
    if (!exists) fail("renderer-missing", `${activity.id} → ${renderer.modulePath} does not exist`);
    if (!loadersSource.includes(`"${renderer.modulePath}"`)) {
      fail("loader-unwired", `${activity.id} → ${renderer.modulePath} has no lazy loader branch`);
    }
    return;
  }

  if (renderer.kind === "visual") {
    if (!LAB_VISUAL_INDEX.includes(renderer.entry)) {
      fail("renderer-missing", `${activity.id} points at a visual not present in LAB_VISUAL_INDEX`);
    }
    return;
  }

  if (renderer.kind === "catalog") {
    if (!catalogIds.has(renderer.entryId)) {
      fail("renderer-missing", `${activity.id} → catalog entry "${renderer.entryId}" is unknown`);
    }
    return;
  }

  // Registry renderers must name a real lab id.
  if (!registryIds.has(renderer.labId)) {
    fail("renderer-missing", `${activity.id} → registry lab "${renderer.labId}" is unknown`);
  }
}

for (const activity of ACTIVITY_MANIFEST) {
  if (seenIds.has(activity.id)) fail("id-unique", `duplicate manifest id ${activity.id}`);
  seenIds.add(activity.id);

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(activity.slug)) {
    fail("slug-format", `${activity.id} slug "${activity.slug}" is not a URL-safe slug`);
  }
  const slugOwner = seenSlugs.get(activity.slug);
  if (slugOwner && slugOwner !== activity.id) {
    fail("slug-unique", `slug "${activity.slug}" is claimed by ${slugOwner} and ${activity.id}`);
  }
  seenSlugs.set(activity.slug, activity.id);

  if (!activity.fallback?.summary) fail("fallback", `${activity.id} has no fallback summary`);
  if (!["3d-sim", "animation", "theory", "practical"].includes(activity.kind)) {
    fail("kind", `${activity.id} has an unknown kind ${activity.kind}`);
  }
  if (!["live", "pilot", "retired"].includes(activity.lifecycle)) {
    fail("lifecycle", `${activity.id} has an unknown lifecycle ${activity.lifecycle}`);
  }
  if (activity.lifecycle === "pilot" && activity.topicSlugs.length === 0) {
    fail("pilot-needs-topic", `${activity.id} is a pilot with no explicit topic`);
  }

  checkRenderer(activity);

  for (const slug of activity.topicSlugs) {
    const placement = topics.get(slug);
    if (!placement) {
      fail("topic-slug", `${activity.id} topic "${slug}" is not an exact syllabus slug`);
      continue;
    }
    const owner = seenTopics.get(slug);
    if (owner && owner !== activity.id) {
      fail("topic-collision", `topic "${slug}" is claimed by ${owner} and ${activity.id}`);
    }
    seenTopics.set(slug, activity.id);

    if (placement.classSlug !== activity.curriculum.classSlug) {
      fail("class-mismatch", `${activity.id} says ${activity.curriculum.classSlug} but "${slug}" is in ${placement.classSlug}`);
    }
    if (placement.subject !== activity.curriculum.subject) {
      fail("subject-mismatch", `${activity.id} says ${activity.curriculum.subject} but "${slug}" is in ${placement.subject}`);
    }
    if (activity.curriculum.unitId && placement.unitId !== activity.curriculum.unitId) {
      fail("unit-mismatch", `${activity.id} says unit ${activity.curriculum.unitId} but "${slug}" is in ${placement.unitId}`);
    }
  }

  for (const alias of activity.aliases ?? []) {
    if (!indexSlugSet.has(alias) && !unitIds.has(alias) && !topics.has(alias)) {
      fail("alias-unknown", `${activity.id} alias "${alias}" is not a real key or unit id`);
    }
  }
}

/* ── parity against the live sources ────────────────────────────────────── */

const visualActivities = ACTIVITY_MANIFEST.filter((a) => a.renderer.kind === "visual");
const registryActivities = ACTIVITY_MANIFEST.filter(
  (a) => a.renderer.kind === "registry" && !a.id.startsWith("catalog/"),
);
const catalogActivities = ACTIVITY_MANIFEST.filter((a) => a.id.startsWith("catalog/"));

// A single visual may back more than one activity (one per curriculum
// placement), so parity counts DISTINCT index entries, not manifest rows.
const representedVisualEntries = new Set(
  visualActivities.flatMap((activity) =>
    activity.renderer.kind === "visual" ? [activity.renderer.entry] : [],
  ),
);
const visualExempt = LAB_VISUAL_INDEX.filter(
  (entry) => !representedVisualEntries.has(entry),
).map((entry) => entry.slugs[0]);

const registryExempt = LAB_METADATA_LIST.filter(
  (lab) => !registryActivities.some((a) => a.renderer.kind === "registry" && a.renderer.labId === lab.id),
).map((lab) => `${lab.id}:${lab.category}`);

const catalogMissing = [...catalogIds].filter(
  (id) =>
    !catalogActivities.some(
      (a) => a.renderer.kind === "catalog" && a.renderer.entryId === id,
    ),
);

if (representedVisualEntries.size + visualExempt.length !== LAB_VISUAL_INDEX.length) {
  fail("parity-visuals", "visual index entries are neither represented nor exempt");
}
if (catalogMissing.length) {
  fail("parity-catalog", `${catalogMissing.length} catalog entries are not in the manifest`);
}
if (unexpectedOrphans.length) {
  fail(
    "orphan-visual-new",
    `${unexpectedOrphans.length} unreferenced 3D visual(s) not in lab-manifest-orphans.json: ${unexpectedOrphans.slice(0, 5).join(", ")}`,
  );
}
if (staleExemptions.length) {
  fail(
    "orphan-visual-stale",
    `${staleExemptions.length} approved exemption(s) no longer orphaned — remove them from lab-manifest-orphans.json`,
  );
}

/* ── coverage matrix ────────────────────────────────────────────────────── */

const coveredTopics = new Set<string>();
for (const activity of ACTIVITY_MANIFEST) {
  for (const slug of activity.topicSlugs) if (topics.has(slug)) coveredTopics.add(slug);
}

const bySubject: Record<string, { topics: number; covered: number }> = {};
for (const [slug, placement] of topics) {
  const row = (bySubject[placement.subject] ??= { topics: 0, covered: 0 });
  row.topics += 1;
  if (coveredTopics.has(slug)) row.covered += 1;
}

const report = {
  generatedAt: new Date().toISOString(),
  manifest: {
    activities: ACTIVITY_MANIFEST.length,
    pilots: PILOT_ACTIVITIES.length,
    byLifecycle: ACTIVITY_MANIFEST.reduce<Record<string, number>>((acc, a) => {
      acc[a.lifecycle] = (acc[a.lifecycle] ?? 0) + 1;
      return acc;
    }, {}),
    byRenderer: ACTIVITY_MANIFEST.reduce<Record<string, number>>((acc, a) => {
      acc[a.renderer.kind] = (acc[a.renderer.kind] ?? 0) + 1;
      return acc;
    }, {}),
    subjects: [...new Set(ACTIVITY_MANIFEST.map((a) => a.curriculum.subject))].sort(),
  },
  syllabus: {
    topicSlugs: topics.size,
    coveredTopics: coveredTopics.size,
    uncoveredTopics: topics.size - coveredTopics.size,
    bySubject,
  },
  sources: {
    visualIndexEntries: LAB_VISUAL_INDEX.length,
    labRegistryMetadataIds: LAB_METADATA_LIST.length,
    labCatalogEntries: Object.keys(LABS).length,
    resolvableSlugs: indexSlugSet.size,
    registryMetadataVerified: LAB_METADATA_LIST.length,
  },
  parity: {
    visualRepresented: representedVisualEntries.size,
    visualExempt: visualExempt.length,
    registryRepresented: registryActivities.length,
    registryExempt: registryExempt.length,
    catalogRepresented: catalogActivities.length,
    catalogMissing: catalogMissing.length,
  },
  exempt: {
    orphanVisualsApproved: orphanExemptions.approved.map((entry) => entry.path),
    orphanVisualsUnexpected: unexpectedOrphans,
    visualIndexWithoutSyllabusTopic: visualExempt,
    registryWithoutManifestEntry: registryExempt,
    orphanTopicVisuals: orphanVisuals,
  },
  violations,
  ok: violations.length === 0,
};

fs.mkdirSync(path.dirname(REPORT_FILE), { recursive: true });
fs.writeFileSync(REPORT_FILE, `${JSON.stringify(report, null, 2)}\n`);

console.log(
  [
    `manifest            : ${report.manifest.activities} activities (pilots ${report.manifest.pilots}, ${JSON.stringify(report.manifest.byRenderer)})`,
    `syllabus topics     : ${topics.size} (covered ${coveredTopics.size}, uncovered ${topics.size - coveredTopics.size})`,
    `visual index parity : ${report.parity.visualRepresented} represented / ${report.parity.visualExempt} exempt of ${LAB_VISUAL_INDEX.length}`,
    `registry parity     : ${report.parity.registryRepresented} represented / ${report.parity.registryExempt} exempt of ${LAB_METADATA_LIST.length}`,
    `catalog parity      : ${report.parity.catalogRepresented} represented, ${report.parity.catalogMissing} missing`,
    `resolvable slugs    : ${indexSlugSet.size} (topic + alias keys in the generated index)`,
    `orphan topic visuals: ${orphanVisuals.length} (${unexpectedOrphans.length} unreviewed)`,
    `report              : ${path.relative(REPO, REPORT_FILE)}`,
  ].join("\n"),
);

if (violations.length) {
  console.error(`\n${violations.length} violation(s):`);
  for (const violation of violations.slice(0, 40)) {
    console.error(`  [${violation.rule}] ${violation.detail}`);
  }
}

if (process.argv.includes("--check")) {
  if (violations.length) {
    console.error("\nGATE: FAIL — manifest is not consistent with the syllabus, the sources, or its renderers.");
    process.exit(1);
  }
  console.log("\nGATE: PASS — manifest consistent with the syllabus, its sources and its renderers.");
}
