#!/usr/bin/env node
/**
 * subject-plan-inventory.mjs — regenerate the per-topic interface/fill checklists
 * inside the per-subject notes-rebuild plans from the single source of truth for
 * curriculum ordering: frontend/lib/syllabus.ts.
 *
 * Usage:
 *   node scripts/subject-plan-inventory.mjs <subject>            # inject checklist into that subject's plan
 *   node scripts/subject-plan-inventory.mjs <subject> --summary  # print counts only
 *   node scripts/subject-plan-inventory.mjs <subject> --units    # print unit inventory (authors' map)
 *   node scripts/subject-plan-inventory.mjs --all --summary      # counts for every subject
 *
 * Subjects and their plans:
 *   biology      -> biology-plan.md      <!-- BIOLOGY-PLAN:TOPICS:START/END -->
 *   chemistry    -> chemistry-plan.md    <!-- CHEMISTRY-PLAN:TOPICS:START/END -->
 *   physics      -> physics-plan.md      <!-- PHYSICS-PLAN:TOPICS:START/END -->
 *   mathematics  -> math-plan.md         <!-- MATH-PLAN:TOPICS:START/END -->
 *   english      -> english-plan.md      <!-- ENGLISH-PLAN:TOPICS:START/END -->
 *   nepali       -> nepali-plan.md       <!-- NEPALI-PLAN:TOPICS:START/END -->
 *
 * Row legend (see each plan's tracking section):
 *   I = interface skeleton created · N = notes filled to the Book-Grade Bar
 *   D = diagrams placed & license-recorded · P = polished (existing content upgraded)
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SYLLABUS = path.join(ROOT, "frontend", "lib", "syllabus.ts");

const SUBJECTS = {
  biology: { label: "Biology", plan: "biology-plan.md", start: "<!-- BIOLOGY-PLAN:TOPICS:START -->", end: "<!-- BIOLOGY-PLAN:TOPICS:END -->" },
  chemistry: { label: "Chemistry", plan: "chemistry-plan.md", start: "<!-- CHEMISTRY-PLAN:TOPICS:START -->", end: "<!-- CHEMISTRY-PLAN:TOPICS:END -->" },
  physics: { label: "Physics", plan: "physics-plan.md", start: "<!-- PHYSICS-PLAN:TOPICS:START -->", end: "<!-- PHYSICS-PLAN:TOPICS:END -->" },
  mathematics: { label: "Mathematics", plan: "math-plan.md", start: "<!-- MATH-PLAN:TOPICS:START -->", end: "<!-- MATH-PLAN:TOPICS:END -->" },
  english: { label: "English", plan: "english-plan.md", start: "<!-- ENGLISH-PLAN:TOPICS:START -->", end: "<!-- ENGLISH-PLAN:TOPICS:END -->" },
  nepali: { label: "Nepali", plan: "nepali-plan.md", start: "<!-- NEPALI-PLAN:TOPICS:START -->", end: "<!-- NEPALI-PLAN:TOPICS:END -->" },
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
    }

    if (top === "units" && curSubj) {
      const id = line.match(/^id:\s*"([^"]+)"/);
      if (id) {
        curUnit = { id: id[1], title: null, hours: null, topics: [] };
        curSubj.units.push(curUnit);
        continue;
      }
      const t = line.match(/^title:\s*"([^"]+)"/);
      if (t && curUnit && curUnit.title == null) curUnit.title = t[1];
      const h = line.match(/^hours:\s*(\d+)/);
      if (h && curUnit && curUnit.hours == null) curUnit.hours = Number(h[1]);
    }
  }
  return data;
}

function buildChecklist(data, subjectSlug) {
  const classSlugs = data.map((c) => c.slug);
  const sections = [];
  const summaryLines = [];
  let totalUnits = 0;
  let totalTopics = 0;

  for (const classSlug of classSlugs) {
    const cls = data.find((c) => c.slug === classSlug);
    const sec = [`## ${CLASS_LABEL[classSlug] ?? classSlug}`, ""];
    let cUnits = 0;
    let cTopics = 0;

    for (const subj of cls.subjects) {
      if (subj.slug !== subjectSlug) continue;
      for (const u of subj.units) {
        cUnits += 1;
        cTopics += u.topics.length;
        const meta = [
          `${u.topics.length} topic${u.topics.length === 1 ? "" : "s"}`,
          u.hours != null ? `${u.hours}h` : null,
        ]
          .filter(Boolean)
          .join(" · ");
        sec.push(`### \`${u.id}\` — ${u.title ?? u.id} (${meta})`);
        sec.push("");
        for (const t of u.topics) {
          sec.push(`- [ ] I · [ ] N · [ ] D · [ ] P — **${t.replace(/\\/g, "")}**`);
        }
        sec.push("");
      }
    }

    if (cUnits > 0) {
      sections.push(sec.join("\n"));
      summaryLines.push(`${CLASS_LABEL[classSlug] ?? classSlug}: ${cUnits} units, ${cTopics} topics`);
      totalUnits += cUnits;
      totalTopics += cTopics;
    }
  }

  const md = [
    `> Regenerated by \`node scripts/subject-plan-inventory.mjs ${subjectSlug}\` from \`frontend/lib/syllabus.ts\`.`,
    `> Coverage: **${totalUnits} units · ${totalTopics} topics** (${summaryLines.join("; ")}).`,
    "",
    sections.join("\n"),
  ].join("\n");

  return {
    md,
    summary: `${SUBJECTS[subjectSlug].label}: ` + summaryLines.join("; ") + ` — TOTAL ${totalUnits} units, ${totalTopics} topics`,
  };
}

function printUnits(data, subjectSlug) {
  for (const cls of data) {
    for (const subj of cls.subjects) {
      if (subj.slug !== subjectSlug) continue;
      console.log(`== ${CLASS_LABEL[cls.slug] ?? cls.slug} / ${subj.slug} ==`);
      for (const u of subj.units) {
        console.log(`${u.id} :: ${u.title ?? u.id} :: ${u.topics.length} topics${u.hours != null ? ` :: ${u.hours}h` : ""}`);
      }
    }
  }
}

function inject(subjectSlug) {
  const cfg = SUBJECTS[subjectSlug];
  const data = parseSyllabus(fs.readFileSync(SYLLABUS, "utf8"));
  const { md, summary } = buildChecklist(data, subjectSlug);

  const planPath = path.join(ROOT, cfg.plan);
  const plan = fs.readFileSync(planPath, "utf8");
  const i = plan.indexOf(cfg.start);
  const j = plan.indexOf(cfg.end);
  if (i < 0 || j < 0 || j < i) {
    console.error(`${cfg.plan}: inventory markers not found — cannot inject.`);
    process.exit(1);
  }
  const next = plan.slice(0, i + cfg.start.length) + "\n\n" + md + "\n" + plan.slice(j);
  fs.writeFileSync(planPath, next);
  console.log(`${cfg.plan} checklist injected.\n${summary}`);
}

function main() {
  const args = process.argv.slice(2);
  const all = args.includes("--all");
  const summaryOnly = args.includes("--summary");
  const unitsOnly = args.includes("--units");
  const slugs = all ? Object.keys(SUBJECTS) : args.filter((a) => SUBJECTS[a]);

  if (slugs.length === 0) {
    console.error("usage: node scripts/subject-plan-inventory.mjs <subject|--all> [--summary|--units]");
    process.exit(1);
  }

  const data = parseSyllabus(fs.readFileSync(SYLLABUS, "utf8"));

  for (const slug of slugs) {
    if (unitsOnly) {
      printUnits(data, slug);
    } else if (summaryOnly) {
      console.log(buildChecklist(data, slug).summary);
    } else {
      inject(slug);
    }
  }
}

main();
