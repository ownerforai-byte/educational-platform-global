/**
 * unit-rails-tables — add a "Classified table" row to every unit-level rail
 * card (<unit>.rail.json), built as a unit digest: one row per topic record in
 * the unit, each cell a verbatim slice of that record (topicTitle + summary /
 * first importantConcept / first keyPoint). Never paraphrases or invents.
 *
 * Idempotent: an existing "Classified table" row is replaced in place.
 * Deterministic: sorted topic files, stable slices.
 *
 * Usage (repo root):
 *   npx tsx frontend/scripts/content/unit-rails-tables.ts            # apply
 *   npx tsx frontend/scripts/content/unit-rails-tables.ts --check    # verify
 */
import fs from "node:fs";
import path from "node:path";

import { findCorpusRoot, HOME_RAIL_ROWS } from "../../lib/home-rails-corpus";

const CHECK = process.argv.includes("--check");
const corpusRoot = findCorpusRoot(process.cwd());
const railsRoot = path.join(corpusRoot, "content", "visuals", "rails");
const conceptsRoot = path.join(corpusRoot, "content", "notes", "concepts");

const TABLE_LABEL = "Classified table";
const MAX_TOPICS = 8;
const CELL_MAX = 90;

function clip(text: string, max: number): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
}

/** First sentence-ish slice of a topic record's own fields. */
function coreIdea(record: Record<string, unknown>): string {
  const summary = record.summary;
  if (typeof summary === "string" && summary.trim()) {
    const first = summary.split(/(?<=[.!?।])\s/)[0];
    return first.trim().length > 20 ? first.trim() : summary;
  }
  for (const field of ["importantConcepts", "keyPoints"] as const) {
    const v = record[field];
    if (Array.isArray(v) && typeof v[0] === "string" && v[0].trim()) return v[0];
  }
  const notes = record.notes;
  if (Array.isArray(notes) && typeof notes[0] === "string") {
    return notes[0].split("\n").find((l: string) => l.trim() && !l.startsWith("#")) || "";
  }
  return "";
}

function digestFor(unitDir: string): string {
  const files = fs
    .readdirSync(unitDir)
    .filter((f) => f.endsWith(".json"))
    .sort((a, b) => a.localeCompare(b));
  const seen = new Set<string>();
  const cells: string[] = [];
  for (const f of files) {
    if (cells.length >= MAX_TOPICS) break;
    let rec: Record<string, unknown>;
    try {
      rec = JSON.parse(fs.readFileSync(path.join(unitDir, f), "utf8"));
    } catch {
      continue;
    }
    const title = typeof rec.topicTitle === "string" && rec.topicTitle.trim() ? rec.topicTitle : f.replace(/\.json$/, "");
    const key = title.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 24);
    if (seen.has(key)) continue;
    seen.add(key);
    const idea = clip(coreIdea(rec), CELL_MAX);
    if (!idea) continue;
    cells.push(`${clip(title, 40)} — ${idea}`);
  }
  return cells.join("  ·  ");
}

let written = 0, kept = 0, missing = 0;
for (const cls of fs.readdirSync(railsRoot)) {
  const clsDir = path.join(railsRoot, cls);
  if (!fs.statSync(clsDir).isDirectory()) continue;
  for (const subject of fs.readdirSync(clsDir)) {
    const subjDir = path.join(clsDir, subject);
    if (!fs.statSync(subjDir).isDirectory()) continue;
    for (const unit of fs.readdirSync(subjDir)) {
      const unitRailsDir = path.join(subjDir, unit);
      if (!fs.statSync(unitRailsDir).isDirectory()) continue;
      const cardPath = path.join(unitRailsDir, `${unit}.rail.json`);
      if (!fs.existsSync(cardPath)) continue;
      const conceptsDir = path.join(conceptsRoot, cls, subject, unit);
      if (!fs.existsSync(conceptsDir)) { missing++; continue; }
      const card = JSON.parse(fs.readFileSync(cardPath, "utf8"));
      const rows: Array<{ label: string; text: string; kind?: string }> = Array.isArray(card.rows) ? card.rows : [];
      const text = digestFor(conceptsDir);
      if (!text) { missing++; continue; }
      const existing = rows.findIndex((r) => r.label === TABLE_LABEL);
      if (existing !== -1 && rows[existing].text === text) { kept++; continue; }
      if (CHECK) {
        if (existing === -1) { missing++; console.log("missing row:", cardPath); }
        continue;
      }
      const row = { label: TABLE_LABEL, text };
      if (existing !== -1) rows[existing] = row;
      else {
        // insert after the last canonical row so extras stay after it
        let insertAt = rows.length;
        for (let i = rows.length - 1; i >= 0; i--) {
          if (HOME_RAIL_ROWS.some((c) => c.label === rows[i].label)) { insertAt = i + 1; break; }
        }
        rows.splice(insertAt, 0, row);
      }
      card.rows = rows;
      fs.writeFileSync(cardPath, JSON.stringify(card, null, 2) + "\n", "utf8");
      written++;
    }
  }
}
console.log(`unit cards: written ${written}, already-current ${kept}, skipped ${missing}`);
