#!/usr/bin/env node
/**
 * Build the Physics XI Academic Companion dataset.
 *
 * The dataset (`frontend/public/data/physics-xi-academic/units.json`) is the
 * single source of truth for the companion: the reading surface at
 * `/resources/physics-xi` and the published HTML/Word document pair per unit
 * are both rendered from it.
 *
 * Three layers feed it:
 *
 *   1. the unit-level layer (summary, facts, conditions, mysteries, prompts,
 *      key numbers, further reading) — authored directly in the JSON;
 *   2. the exam-anchored layer (misconceptions, workbook, next steps) —
 *      authored in `scripts/physics-xi-academic-content-*.ts`;
 *   3. the syllabus layer (the exact NEB topic titles of each unit) — read
 *      from `frontend/lib/syllabus.ts`, never invented here.
 *
 * The script splices layers 2 and 3 into the JSON without reformatting layer
 * 1, so the committed diff stays reviewable and re-running it is idempotent.
 *
 * Usage:
 *   node node_modules/tsx/dist/cli.mjs scripts/build-physics-xi-academic.ts
 *   node node_modules/tsx/dist/cli.mjs scripts/build-physics-xi-academic.ts --check
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getSubjectSyllabus } from "../frontend/lib/syllabus";
import {
  PHYSICS_XI_ENRICHMENT_01_13,
  type PhysicsXiUnitEnrichment,
} from "./physics-xi-academic-content-01-13";
import { PHYSICS_XI_ENRICHMENT_14_26 } from "./physics-xi-academic-content-14-26";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATASET_PATH = path.join(
  ROOT,
  "frontend",
  "public",
  "data",
  "physics-xi-academic",
  "units.json",
);

const CLASS_SLUG = "class-11-notes";
const SUBJECT_SLUG = "physics";

/** Keys this script owns. Everything else in the dataset is hand-authored. */
const GENERATED_KEYS = [
  "syllabusTopics",
  "misconceptions",
  "workbook",
  "nextSteps",
] as const;

type GeneratedKey = (typeof GENERATED_KEYS)[number];

type DatasetUnit = {
  unitNo: number;
  unitId: string;
  unitName: string;
  contentArea: string;
  slug: string;
  summary: string;
  facts: string[];
  conditions: string[];
  mysteries: { question: string; status: string; note: string }[];
  prompts: string[];
  keyNumbers: { label: string; value: string }[];
  sources: { label: string; url: string }[];
} & Partial<Record<GeneratedKey, unknown>>;

type Dataset = {
  title: string;
  subtitle: string;
  course: string;
  units: DatasetUnit[];
};

function fail(message: string): never {
  throw new Error(message);
}

// ── load ────────────────────────────────────────────────────────────────────

const syllabus = getSubjectSyllabus(CLASS_SLUG, SUBJECT_SLUG);
if (!syllabus) {
  fail(`No ${SUBJECT_SLUG} syllabus under ${CLASS_SLUG} in frontend/lib/syllabus.ts`);
}

const enrichment: Record<string, PhysicsXiUnitEnrichment> = {
  ...PHYSICS_XI_ENRICHMENT_01_13,
  ...PHYSICS_XI_ENRICHMENT_14_26,
};

const source = fs.readFileSync(DATASET_PATH, "utf8");
const dataset = JSON.parse(source) as Dataset;
if (!Array.isArray(dataset.units) || dataset.units.length === 0) {
  fail("The Physics XI academic dataset has no units");
}

// ── validate the inputs against each other ─────────────────────────────────

const datasetIds = new Set(dataset.units.map((unit) => unit.unitId));
const syllabusIds = new Set(syllabus.units.map((unit) => unit.id));

for (const id of datasetIds) {
  if (!syllabusIds.has(id)) {
    fail(`Dataset unit "${id}" has no matching syllabus unit`);
  }
}
for (const id of syllabusIds) {
  if (!datasetIds.has(id)) {
    fail(`Syllabus unit "${id}" has no matching companion brief`);
  }
}

const mergedUnits: DatasetUnit[] = dataset.units.map((unit) => {
  const syllabusUnit = syllabus.units.find((candidate) => candidate.id === unit.unitId);
  if (!syllabusUnit) fail(`No syllabus unit for ${unit.unitId}`);

  const authored = enrichment[unit.unitId];
  if (!authored) fail(`No authored enrichment for ${unit.unitId}`);

  if (authored.misconceptions.length !== 3) {
    fail(`${unit.unitId} must carry exactly 3 misconceptions`);
  }
  if (authored.workbook.length !== 3) {
    fail(`${unit.unitId} must carry exactly 3 workbook items`);
  }
  if (authored.nextSteps.length < 1) {
    fail(`${unit.unitId} must carry at least one next step`);
  }
  if (syllabusUnit.topics.length < 1) {
    fail(`Syllabus unit ${unit.unitId} has no topics`);
  }

  return {
    ...unit,
    syllabusTopics: [...syllabusUnit.topics],
    misconceptions: authored.misconceptions,
    workbook: authored.workbook,
    nextSteps: authored.nextSteps,
  };
});

const topicTotal = mergedUnits.reduce(
  (sum, unit) => sum + (unit.syllabusTopics?.length ?? 0),
  0,
);

// ── serialise the generated layer into the existing file layout ────────────

/** Expanded block: a key whose value is an array of objects or strings. */
function expandedBlock(key: GeneratedKey, value: unknown): string[] {
  const json = JSON.stringify(value, null, 2).split("\n");
  // The first line opens the array and carries the key; every later line is
  // re-indented from the JSON root (column 0) to the dataset's own nesting.
  const body = json.map((line, index) => (index === 0 ? line : `      ${line}`));
  return [`      "${key}": ${body[0]}`, ...body.slice(1)];
}

/** Inline block: short label/href pairs, matching the keyNumbers style. */
function inlineBlock(key: GeneratedKey, value: unknown): string[] {
  const items = value as { label: string; href: string }[];
  return [
    `      "${key}": [`,
    ...items.map(
      (item, index) =>
        `        { "label": ${JSON.stringify(item.label)}, "href": ${JSON.stringify(item.href)} }${
          index < items.length - 1 ? "," : ""
        }`,
    ),
    `      ]`,
  ];
}

function generatedBlocks(unit: DatasetUnit): string[] {
  const blocks = [
    expandedBlock("syllabusTopics", unit.syllabusTopics ?? []),
    expandedBlock("misconceptions", unit.misconceptions ?? []),
    expandedBlock("workbook", unit.workbook ?? []),
    inlineBlock("nextSteps", unit.nextSteps ?? []),
  ];
  const out: string[] = [];
  blocks.forEach((block, index) => {
    out.push(...block);
    if (index < blocks.length - 1) {
      out[out.length - 1] = `${out[out.length - 1]},`;
    }
  });
  return out;
}

/** Remove a previously generated block so the build stays idempotent. */
function stripGeneratedBlock(block: string[], index: number): number[] {
  const kept: number[] = [];
  let k = 0;
  while (k < block.length) {
    const isGenerated = new RegExp(`^ {6}"(${GENERATED_KEYS.join("|")})": \\[$`).test(
      block[k],
    );
    if (!isGenerated) {
      kept.push(k);
      k += 1;
      continue;
    }
    let end = k + 1;
    while (end < block.length && block[end] !== "      ]") end += 1;
    if (end >= block.length) {
      fail(`Unterminated "${block[k].trim()}" block in the dataset`);
    }
    k = end + 1;
  }
  return kept;
}

function spliceDataset(text: string, units: DatasetUnit[]): string {
  const lines = text.split("\n");
  const out: string[] = [];
  let i = 0;
  let unitIndex = 0;

  while (i < lines.length) {
    const idMatch = /^ {6}"unitId": "([^"]+)",$/.exec(lines[i]);
    if (!idMatch) {
      out.push(lines[i]);
      i += 1;
      continue;
    }

    const unitId = idMatch[1];
    const unit = units[unitIndex];
    if (!unit || unit.unitId !== unitId) {
      fail(`Dataset order changed: expected ${unit?.unitId ?? "end of list"}, found ${unitId}`);
    }
    unitIndex += 1;

    let end = i;
    while (end < lines.length && !/^ {4}\}[,]?$/.test(lines[end])) end += 1;
    if (end >= lines.length) {
      fail(`Could not find the end of unit "${unitId}" in the dataset`);
    }

    const block = lines.slice(i, end);
    const kept = stripGeneratedBlock(block, i);
    for (const index of kept) out.push(block[index]);
    // The hand-authored block ends with the unit's last array, which carried
    // no comma because it was the final key. The generated keys come after it,
    // so that line now needs one.
    const last = out[out.length - 1];
    if (last !== undefined && !last.trimEnd().endsWith(",")) {
      out[out.length - 1] = `${last},`;
    }
    out.push(...generatedBlocks(unit));
    out.push(lines[end]);

    i = end + 1;
  }

  if (unitIndex !== units.length) {
    fail(`Merged ${unitIndex} units but the dataset holds ${units.length}`);
  }

  return out.join("\n");
}

const built = spliceDataset(source, mergedUnits);

// ── guard: the file must say exactly what the merge says ───────────────────

function stable(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).sort(([a], [b]) =>
      a < b ? -1 : a > b ? 1 : 0,
    );
    return Object.fromEntries(entries.map(([key, item]) => [key, stable(item)]));
  }
  return value;
}

const rebuilt = JSON.parse(built) as Dataset;
for (const [index, unit] of mergedUnits.entries()) {
  const a = JSON.stringify(stable(rebuilt.units[index]));
  const b = JSON.stringify(stable(unit));
  if (a !== b) {
    fail(`The rendered unit "${unit.unitId}" does not match the merged data`);
  }
}

// ── write or check ─────────────────────────────────────────────────────────

const checkOnly = process.argv.includes("--check");
const relative = path.relative(ROOT, DATASET_PATH);

if (checkOnly) {
  if (built !== source) {
    console.error(
      `${relative} is out of date with the authored content and the syllabus.\n` +
        `Run: node node_modules/tsx/dist/cli.mjs scripts/build-physics-xi-academic.ts`,
    );
    process.exit(1);
  }
  console.log(
    `Physics XI academic dataset is in step: ${mergedUnits.length} units, ${topicTotal} syllabus topics.`,
  );
} else {
  fs.writeFileSync(DATASET_PATH, built, "utf8");
  console.log(
    `Built ${relative}: ${mergedUnits.length} units, ${topicTotal} syllabus topics, ` +
      `${mergedUnits.length * 3} misconceptions, ${mergedUnits.length * 3} workbook items.`,
  );
}
