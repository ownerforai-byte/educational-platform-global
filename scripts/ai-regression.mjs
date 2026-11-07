#!/usr/bin/env node
/**
 * ai-regression — keep Veer's answers grounded in the platform's own PYQs.
 *
 *   node scripts/ai-regression.mjs --build-set   # sample 120 solved Q&A -> golden set
 *   node scripts/ai-regression.mjs --check       # offline CI gate (no keys, no network)
 *   node scripts/ai-regression.mjs --live        # score real answers against a running backend
 *   node scripts/ai-regression.mjs --self-test   # unit-check the scorer + drift logic
 *
 * The golden set is a stratified, deterministic sample of content/practice/questions.
 * Scoring is a keyword-coverage PROXY for grounding, not a correctness judge:
 * a high score means the answer used the same subject vocabulary as the
 * reference solution. Graded exam marking belongs to /api/ai/evaluate-answers.
 *
 * --check is the CI gate. It verifies set integrity, that every sampled item
 * still exists unchanged in the corpus (drift), and that the scorer behaves.
 * --live is deliberately opt-in: it spends AI credits and needs an owner token.
 * Never put tokens in this repo — use AI_REGRESSION_TOKEN in the environment.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CORPUS = path.join(ROOT, "content", "practice", "questions");
const SET_FILE = path.join(ROOT, "reports", "ai-regression-golden-set.json");
const RESULTS_FILE = path.join(ROOT, "reports", "ai-regression-results.json");
const TARGET = 120;

const ARGS = process.argv.slice(2);
const has = (flag) => ARGS.includes(flag);
const argValue = (flag, fallback) => {
  const i = ARGS.indexOf(flag);
  return i >= 0 && ARGS[i + 1] ? ARGS[i + 1] : fallback;
};

const STOP = new Set([
  "the", "and", "for", "are", "with", "that", "this", "from", "into", "each",
  "one", "two", "can", "has", "have", "was", "were", "its", "not", "but",
  "also", "such", "when", "which", "their", "they", "them", "then", "than",
  "because", "called", "given", "used", "using", "example", "examples",
  "answer", "question", "following", "between", "basis", "give", "show",
  "class", "unit", "marks", "solution", "note", "source", "more", "less",
]);

function tokens(text) {
  // Unicode letters: Nepali (Devanagari) solutions are as common as English
  // ones in this corpus, and a Latin-only tokenizer silently drops them.
  // \p{M} keeps Devanagari vowel signs attached to their base consonant;
  // without it every Nepali word shatters into 1-2 character fragments.
  return (String(text).toLowerCase().match(/[\p{L}\p{N}][\p{L}\p{N}\p{M}'-]{2,}/gu) ?? []).filter(
    (t) => !STOP.has(t) && !/^\d+$/.test(t),
  );
}

/** Stem lightly so "proteins" matches "protein" without a morphology library. */
function stem(t) {
  return t.replace(/(ies)$/, "y").replace(/(sses)$/, "ss").replace(/(s)$/, "");
}

export function keyTerms(solution, question) {
  const questionTerms = new Set(tokens(question).map(stem));
  const freq = new Map();
  for (const raw of tokens(solution)) {
    const t = stem(raw);
    if (questionTerms.has(t) || t.length < 4) continue;
    freq.set(t, (freq.get(t) ?? 0) + 1);
  }
  const ranked = [...freq.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const picked = ranked.filter(([t]) => t.length >= 4).slice(0, 12);
  // Short/symbolic solutions (numericals, one-line definitions) still need a
  // measurable vocabulary. Fall back to shorter tokens before giving up.
  if (picked.length < 3) {
    return ranked.slice(0, 12).map(([t]) => t);
  }
  return picked.map(([t]) => t);
}

export function scoreAnswer(item, answer) {
  const text = String(answer ?? "").trim();
  const flags = [];
  if (text.length < 30) flags.push("empty");
  if (/^(i (can't|cannot|don't know)|as an ai|sorry,? i (can't|cannot))/i.test(text)) {
    flags.push("refusal");
  }
  const answerTerms = new Set(tokens(text).map(stem));
  const matched = item.keyTerms.filter((t) => answerTerms.has(t));
  const coverage = item.keyTerms.length ? matched.length / item.keyTerms.length : 0;
  if (!flags.length && coverage === 0) flags.push("off-topic");
  const score = flags.some((f) => f === "empty" || f === "refusal") ? 0 : coverage;
  return { score: Number(score.toFixed(3)), coverage: Number(coverage.toFixed(3)), matched, flags, words: tokens(text).length };
}

function hashItem(question, solution) {
  return crypto.createHash("sha256").update(`${question}\n${solution}`, "utf8").digest("hex").slice(0, 16);
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith(".json")) out.push(full);
  }
  return out;
}

function collect() {
  const items = [];
  for (const file of walk(CORPUS).sort()) {
    const rel = path.relative(ROOT, file).replace(/\\/g, "/");
    let bank;
    try {
      bank = JSON.parse(fs.readFileSync(file, "utf8"));
    } catch {
      console.warn(`ai-regression: skipping unreadable ${rel}`);
      continue;
    }
    if (!Array.isArray(bank.questions)) continue;
    const parts = rel.split("/");
    const classIndex = parts.findIndex((p) => /^class-\d+$/.test(p));
    const classSlug = classIndex >= 0 ? parts[classIndex] : "unknown";
    // A few older banks omit `subject`; the corpus path is authoritative there.
    const subject = String(bank.subject ?? parts[classIndex + 1] ?? "unknown").toLowerCase();
    bank.questions.forEach((q, index) => {
      if (!q?.question || !q?.solution) return;
      const question = String(q.question).trim();
      const reference = String(q.solution).trim();
      const knowledgeNote = String(q.knowledgeNote ?? "").trim();
      items.push({
        id: `${rel}#${index}`,
        source: rel,
        classSlug,
        subject,
        unitSlug: String(bank.unitSlug ?? ""),
        year: bank.year ?? null,
        marks: q.marks ?? null,
        question,
        reference,
        knowledgeNote,
        keyTerms: keyTerms(`${reference}\n${knowledgeNote}`, question),
        hash: hashItem(question, reference),
      });
    });
  }
  return items;
}

/** Round-robin by subject, then by class, so every subject is represented. */
function stratified(items, target) {
  const buckets = new Map();
  for (const item of items) {
    const key = `${item.classSlug}/${item.subject}`;
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(item);
  }
  const keys = [...buckets.keys()].sort();
  const chosen = [];
  const seen = new Set();
  for (let round = 0; chosen.length < target; round++) {
    let added = 0;
    for (const key of keys) {
      const bucket = buckets.get(key);
      const item = bucket[round];
      if (!item) continue;
      chosen.push(item);
      seen.add(item.id);
      added++;
      if (chosen.length >= target) break;
    }
    if (!added) break;
  }
  return chosen;
}

function loadSet() {
  if (!fs.existsSync(SET_FILE)) return null;
  try {
    return JSON.parse(fs.readFileSync(SET_FILE, "utf8"));
  } catch {
    return null;
  }
}

function checkDrift(set) {
  const bySource = new Map();
  for (const file of walk(CORPUS)) {
    const rel = path.relative(ROOT, file).replace(/\\/g, "/");
    bySource.set(rel, file);
  }
  const problems = [];
  for (const item of set.items) {
    const file = bySource.get(item.source);
    if (!file) {
      problems.push(`${item.source}: source file missing`);
      continue;
    }
    let bank;
    try {
      bank = JSON.parse(fs.readFileSync(file, "utf8"));
    } catch {
      problems.push(`${item.source}: source file no longer parses`);
      continue;
    }
    const index = Number(item.id.split("#").pop());
    const q = bank.questions?.[index];
    if (!q || hashItem(String(q.question ?? "").trim(), String(q.solution ?? "").trim()) !== item.hash) {
      problems.push(`${item.id}: question/solution changed — rebuild the golden set`);
    }
  }
  return problems;
}

function selfTest() {
  const item = { keyTerms: ["protein", "enzyme", "carbohydrate", "lipid"] };
  assert.equal(scoreAnswer(item, "Proteins act as enzymes; carbohydrates and lipids provide energy storage.").score, 1);
  assert.equal(scoreAnswer(item, "").score, 0);
  assert.equal(scoreAnswer(item, "I cannot answer that.").score, 0);
  const partial = scoreAnswer(item, "Proteins are polymers of amino acids.");
  assert.ok(partial.score > 0 && partial.score < 1, "partial answers must score between 0 and 1");
  assert.ok(scoreAnswer(item, "Completely unrelated prose about the weather.").flags.includes("off-topic"));
  assert.ok(keyTerms("DNA has deoxyribose and thymine. DNA is stable and double stranded.", "What is DNA?").includes("deoxyribose"));
  console.log("ai-regression: self-test PASS (exact / empty / refusal / partial / off-topic / key terms)");
}

function check() {
  selfTest();
  const set = loadSet();
  if (!set) {
    console.error("ai-regression: no golden set. Run `node scripts/ai-regression.mjs --build-set`.");
    process.exit(1);
  }
  const problems = [];
  if (!Array.isArray(set.items) || set.items.length < 100) {
    problems.push(`golden set has ${set.items?.length ?? 0} items (need >= 100)`);
  }
  const ids = new Set();
  for (const item of set.items ?? []) {
    if (ids.has(item.id)) problems.push(`duplicate id ${item.id}`);
    ids.add(item.id);
    if (!item.question || !item.reference) problems.push(`${item.id}: missing question/reference`);
    if (!Array.isArray(item.keyTerms) || item.keyTerms.length < 3) problems.push(`${item.id}: too few key terms`);
  }
  const subjects = new Set((set.items ?? []).map((i) => i.subject));
  if (subjects.size < 4) problems.push(`only ${subjects.size} subjects represented`);
  problems.push(...checkDrift(set));
  if (problems.length) {
    console.error(`ai-regression: GATE FAIL — ${problems.length} problem(s):`);
    for (const p of problems.slice(0, 25)) console.error(`  - ${p}`);
    if (problems.length > 25) console.error(`  ...and ${problems.length - 25} more`);
    process.exit(1);
  }
  console.log(`ai-regression: GATE PASS — ${set.items.length} items, ${subjects.size} subjects, no corpus drift.`);
}

function buildSet() {
  const items = collect();
  const chosen = stratified(items, TARGET);
  const set = {
    note: "Deterministic stratified sample of solved PYQs. Rebuild with scripts/ai-regression.mjs --build-set when sources change.",
    generatedAt: new Date().toISOString().slice(0, 10),
    corpusItems: items.length,
    items: chosen,
  };
  fs.mkdirSync(path.dirname(SET_FILE), { recursive: true });
  fs.writeFileSync(SET_FILE, JSON.stringify(set, null, 2) + "\n", "utf8");
  const subjects = [...new Set(chosen.map((i) => i.subject))].sort();
  console.log(`ai-regression: golden set written — ${chosen.length}/${items.length} items, subjects: ${subjects.join(", ")}`);
}

function extractReply(data) {
  if (typeof data === "string") return data;
  if (!data || typeof data !== "object") return "";
  return String(
    data.response ?? data.reply ?? data.answer ?? data.text ??
      data.choices?.[0]?.message?.content ?? data.output?.text ?? "",
  );
}

async function live() {
  const set = loadSet();
  if (!set) {
    console.error("ai-regression: build the golden set first (--build-set).");
    process.exit(1);
  }
  const url = process.env.AI_REGRESSION_URL ?? "http://localhost:3000/api/ai";
  const token = process.env.AI_REGRESSION_TOKEN ?? "";
  const limit = Math.max(1, Math.min(Number(argValue("--limit", "20")) || 20, set.items.length));
  const minScore = Number(process.env.AI_REGRESSION_MIN_SCORE ?? 0.45);
  const items = set.items.slice(0, limit);
  console.log(`ai-regression: scoring ${items.length} questions against ${url} (spends AI credits).`);
  const results = [];
  for (const item of items) {
    let reply = "";
    let error = "";
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ messages: [{ role: "user", content: item.question }] }),
        signal: AbortSignal.timeout(90_000),
      });
      const data = await res.json();
      if (!res.ok) error = `HTTP ${res.status}: ${String(data.error ?? "").slice(0, 120)}`;
      else reply = extractReply(data);
    } catch (err) {
      error = String(err?.message ?? err).slice(0, 160);
    }
    results.push({ id: item.id, subject: item.subject, ...scoreAnswer(item, reply), error });
  }
  const bySubject = new Map();
  for (const r of results) {
    if (!bySubject.has(r.subject)) bySubject.set(r.subject, []);
    bySubject.get(r.subject).push(r.score);
  }
  const mean = results.reduce((s, r) => s + r.score, 0) / results.length;
  const floorSubjects = [...bySubject.entries()]
    .map(([subject, scores]) => ({ subject, mean: scores.reduce((a, b) => a + b, 0) / scores.length }))
    .filter((s) => s.mean < minScore);
  fs.writeFileSync(
    RESULTS_FILE,
    JSON.stringify({ generatedAt: new Date().toISOString(), url, mean, bySubject: Object.fromEntries(bySubject), results }, null, 2) + "\n",
    "utf8",
  );
  console.log(`ai-regression: mean grounding coverage ${mean.toFixed(3)} (threshold ${minScore}). Results -> reports/ai-regression-results.json`);
  for (const [subject, scores] of bySubject) {
    console.log(`  ${subject}: ${(scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(3)} over ${scores.length}`);
  }
  const failures = results.filter((r) => r.error || r.flags.includes("empty") || r.flags.includes("refusal"));
  if (failures.length) {
    console.error(`ai-regression: ${failures.length} answer(s) failed or were refusals — see results file.`);
  }
  if (mean < minScore || floorSubjects.length || failures.length) process.exit(1);
}

if (has("--self-test")) selfTest();
else if (has("--build-set")) buildSet();
else if (has("--live")) await live();
else check();
