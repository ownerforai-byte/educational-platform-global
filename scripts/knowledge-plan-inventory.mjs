#!/usr/bin/env node
/**
 * knowledge-plan-inventory.mjs — regenerate the per-topic coverage checklist
 * inside KNOWLEDGE-PLAN.md (the Knowledge Validity Plan) from the single source
 * of truth for curriculum ordering: frontend/lib/syllabus.ts.
 *
 * Usage:
 *   node scripts/knowledge-plan-inventory.mjs            # inject checklist into KNOWLEDGE-PLAN.md
 *   node scripts/knowledge-plan-inventory.mjs --summary  # print counts only
 *
 * The checklist is written between the markers:
 *   <!-- KNOWLEDGE-PLAN:INVENTORY:START -->  ...  <!-- KNOWLEDGE-PLAN:INVENTORY:END -->
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SYLLABUS = path.join(ROOT, "frontend", "lib", "syllabus.ts");
const PLAN = path.join(ROOT, "KNOWLEDGE-PLAN.md");
const START = "<!-- KNOWLEDGE-PLAN:INVENTORY:START -->";
const END = "<!-- KNOWLEDGE-PLAN:INVENTORY:END -->";

/** Execution order mandated by the plan: Biology first, then Chemistry, Physics, Math, English, Nepali. */
const SUBJECT_ORDER = ["biology", "chemistry", "physics", "mathematics", "english", "nepali"];
const SUBJECT_LABEL = {
  biology: "Biology",
  chemistry: "Chemistry",
  physics: "Physics",
  mathematics: "Mathematics (Math)",
  english: "English",
  nepali: "Nepali",
};
const CLASS_LABEL = {
  "class-11-notes": "Class 11",
  "class-12-notes": "Class 12",
};

/** Line-based parse of the SYLLABUS literal: classes -> subjects -> units -> topics. */
function parseSyllabus(text) {
  const stack = [];
  const data = [];
  let curClass = null;
  let curSubj = null;
  let curUnit = null;

  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();

    if (/^subjects:\s*\[/.test(line)) {
      stack.push("subjects");
      continue;
    }
    if (/^units:\s*\[/.test(line)) {
      stack.push("units");
      continue;
    }
    if (/^topics:\s*\[/.test(line)) {
      const inline = line.match(/^topics:\s*\[([\s\S]*?)\]\s*,?$/);
      if (line.endsWith("[")) {
        stack.push("topics");
      } else if (inline && curUnit) {
        for (const m of inline[1].matchAll(/"((?:[^"\\]|\\.)*)"/g)) curUnit.topics.push(m[1]);
      }
      continue;
    }

    const top = stack[stack.length - 1];

    if (top === "topics") {
      if (line === "]," || line === "]") {
        stack.pop();
        continue;
      }
      const m = line.match(/^"((?:[^"\\]|\\.)*)"\s*,?$/);
      if (m && curUnit) curUnit.topics.push(m[1]);
      continue;
    }

    if (line === "]," || line === "]") {
      if (stack.length) stack.pop();
      continue;
    }

    if (top === "subjects" || top === undefined) {
      const s = line.match(/^slug:\s*"([^"]+)"/);
      if (s) {
        if (top === "subjects" && curClass) {
          curSubj = { slug: s[1], name: null, units: [] };
          curClass.subjects.push(curSubj);
        } else {
          curClass = { slug: s[1], subjects: [] };
          data.push(curClass);
        }
      }
      const n = line.match(/^name:\s*"([^"]+)"/);
      if (n && top === "subjects" && curSubj && curSubj.name == null) curSubj.name = n[1];
    }

    if (top === "units" && curSubj) {
      const id = line.match(/^id:\s*"([^"]+)"/);
      if (id) {
        curUnit = { id: id[1], title: null, hours: null, introducedIn: null, topics: [] };
        curSubj.units.push(curUnit);
        continue;
      }
      const t = line.match(/^title:\s*"([^"]+)"/);
      if (t && curUnit && curUnit.title == null) curUnit.title = t[1];
      const h = line.match(/^hours:\s*(\d+)/);
      if (h && curUnit && curUnit.hours == null) curUnit.hours = Number(h[1]);
      const y = line.match(/^introducedIn:\s*(\d+)/);
      if (y && curUnit && curUnit.introducedIn == null) curUnit.introducedIn = Number(y[1]);
    }
  }
  return data;
}

function buildInventory(data) {
  const classSlugs = data.map((c) => c.slug);
  const known = new Set(SUBJECT_ORDER);
  const extras = [];
  const bySubject = new Map(SUBJECT_ORDER.map((s) => [s, []]));
  let units = 0;
  let topics = 0;

  for (const cls of data) {
    for (const subj of cls.subjects) {
      if (!bySubject.has(subj.slug)) {
        if (!extras.some((e) => e.slug === subj.slug)) extras.push({ slug: subj.slug, name: subj.name, entries: [] });
      }
      const entry = { classSlug: cls.slug, subj };
      const bucket = bySubject.get(subj.slug);
      if (bucket) bucket.push(entry);
      else extras.find((e) => e.slug === subj.slug).entries.push(entry);
    }
  }

  const order = SUBJECT_ORDER.concat(extras.map((e) => e.slug));
  const sections = [];
  const summaryLines = [];

  for (const slug of order) {
    const entries = bySubject.get(slug) ?? extras.find((e) => e.slug === slug).entries;
    const label = SUBJECT_LABEL[slug] ?? extras.find((e) => e.slug === slug)?.name ?? slug;
    const sec = [`## ${label}`, ""];
    let sUnits = 0;
    let sTopics = 0;

    for (const classSlug of classSlugs) {
      const entry = entries.find((e) => e.classSlug === classSlug);
      if (!entry) continue;
      sec.push(`### ${CLASS_LABEL[classSlug] ?? classSlug}`, "");
      for (const u of entry.subj.units) {
        sUnits += 1;
        sTopics += u.topics.length;
        const meta = [
          `${u.topics.length} topic${u.topics.length === 1 ? "" : "s"}`,
          u.hours != null ? `${u.hours}h` : null,
          u.introducedIn != null ? `since ${u.introducedIn} BS` : null,
        ]
          .filter(Boolean)
          .join(" · ");
        sec.push(`#### \`${u.id}\` — ${u.title ?? u.id} (${meta})`);
        sec.push("");
        for (const t of u.topics) sec.push(`- [ ] ${t.replace(/\\/g, "")}`);
        sec.push("");
      }
    }
    if (!known.has(slug)) sec.push("> ⚠️ Subject not in the plan's execution order — added for completeness.", "");
    units += sUnits;
    topics += sTopics;
    summaryLines.push(`${label}: ${sUnits} units, ${sTopics} topics`);
    sections.push(sec.join("\n"));
  }

  const md = [
    `> Regenerated by \`node scripts/knowledge-plan-inventory.mjs\` from \`frontend/lib/syllabus.ts\`.`,
    `> Coverage: **${units} units · ${topics} topics** across ${order.length} subjects (${classSlugs.join(", ")}).`,
    "",
    sections.join("\n"),
  ].join("\n");

  return { md, summary: summaryLines.join("\n") + `\nTOTAL: ${units} units, ${topics} topics` };
}

function main() {
  const data = parseSyllabus(fs.readFileSync(SYLLABUS, "utf8"));
  const { md, summary } = buildInventory(data);

  if (process.argv.includes("--summary")) {
    console.log(summary);
    return;
  }

  const plan = fs.readFileSync(PLAN, "utf8");
  const i = plan.indexOf(START);
  const j = plan.indexOf(END);
  if (i < 0 || j < 0 || j < i) {
    console.error("KNOWLEDGE-PLAN.md: inventory markers not found — cannot inject.");
    process.exit(1);
  }
  const next = plan.slice(0, i + START.length) + "\n\n" + md + "\n" + plan.slice(j);
  fs.writeFileSync(PLAN, next);
  console.log("KNOWLEDGE-PLAN.md inventory injected.\n" + summary);
}

main();
