/**
 * Content repair rules — pure, deterministic, side-effect-free.
 *
 * The Phase 1 schema gate (`scripts/content/validate.ts --strict`) baselined 51
 * concept files that `ConceptNoteSchema` rejects. All 51 turned out to be FOUR
 * migration defects, not 51 bespoke authoring mistakes:
 *
 *   1. lift-embedded-fields  (39 files) — the body was written INTO
 *        `enrichedContent` / `originalContent` and never lifted, so the note has
 *        no top-level `notes` at all. Same failure mode as biology, which
 *        `content-tools/lift-bio-fields.cjs` already fixed there.
 *   2. prune-blank-entries    (2 files) — `notes` carries `""` separators left by
 *        a markdown-to-list conversion; `MdString` is `.trim().min(1)`.
 *   3. mcq-answer-letter      (6 files) — `mcs[].answer` holds the worked answer
 *        ("C (h ∝ t²)") where the schema wants the option letter.
 *   4. visual-key-identifier  (4 files) — prose was pasted into `animation3D`,
 *        which the UI uses as an animation KEY (`lib/legend.ts`, the "3D" badge
 *        on the legend page), not as display text.
 *
 * Every rule is a no-op on already-valid data, so running the repair twice
 * changes nothing the second time. Nothing here deletes a source block:
 * `enrichedContent` / `originalContent` stay on disk (the schema declares them)
 * so a lift is reversible. Stripping the snapshots from the payload is a build
 * concern (Phase 3), not a repair.
 *
 * Kept free of `node:fs` and of zod so it is importable from a vitest worker,
 * from a tsx CLI, and (later) from the build pipeline.
 */

/** Fields typed `MdList` in `schema/concept.ts` — arrays of authored strings. */
export const MD_LIST_FIELDS = [
  "notes",
  "confusion",
  "practice",
  "universalFacts",
  "examples",
  "practiceQuestions",
  "formulas",
  "keyPoints",
  "specialNotes",
  "importantStatements",
  "importantNotes",
  "examShortTricks",
  "examNotes",
  "importantConcepts",
  "importantTasks",
  "numericals",
] as const;

/**
 * Authored fields that may be lifted out of an embedded snapshot, in the order
 * the reader expects. Mirrors `content-tools/lift-bio-fields.cjs` so physics
 * ends up shaped exactly like the biology notes that script already fixed.
 */
export const LIFTABLE_FIELDS = [
  ...MD_LIST_FIELDS.filter((f) => f !== "numericals"),
  "summary",
  "mcs",
  "mcqs",
  "exercises",
] as const;

/** Presentation keys — an identifier the UI looks up, not prose. */
export const VISUAL_KEY_FIELDS = ["animation3D", "motionGraphics", "visualType"] as const;

/** Bound declared by `AuthoredFields` in `schema/concept.ts`. */
export const VISUAL_KEY_MAX = 200;

export interface RepairChange {
  rule: string;
  detail: string;
}

export interface RepairResult {
  note: Record<string, unknown>;
  changes: RepairChange[];
}

type Json = Record<string, unknown>;

const isObj = (v: unknown): v is Json => typeof v === "object" && v !== null && !Array.isArray(v);

/** Is there anything here a reader would actually see? */
function isMeaningful(v: unknown): boolean {
  if (v === undefined || v === null) return false;
  if (typeof v === "string") return v.trim() !== "";
  if (Array.isArray(v)) return v.length > 0;
  if (isObj(v)) return Object.keys(v).length > 0;
  return true;
}

const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v)) as T;

/**
 * `mcs` / `mcqs` must be arrays of MCQ objects. A previous enrichment run wrote
 * `["Added new rich content for mcs."]` into two snapshots — lifting that would
 * swap one violation for another, so a junk array is treated as absent.
 */
function isMcqArray(v: unknown): boolean {
  return Array.isArray(v) && v.some((m) => isObj(m) && typeof m.question === "string" && Array.isArray(m.options));
}

/** 1 — lift the body out of the embedded snapshot when it never reached the top level. */
export function liftEmbeddedFields(note: Json, changes: RepairChange[]): void {
  for (const blockKey of ["enrichedContent", "originalContent"]) {
    const block = note[blockKey];
    if (!isObj(block)) continue;

    for (const field of LIFTABLE_FIELDS) {
      if (isMeaningful(note[field])) continue; // never overwrite authored top-level data
      const src = block[field];
      if (!isMeaningful(src)) continue;
      if ((field === "mcs" || field === "mcqs") && !isMcqArray(src)) continue;

      note[field] = clone(src);
      const size = Array.isArray(src)
        ? `${src.length} items`
        : typeof src === "string"
          ? `${src.length} chars`
          : "value";
      changes.push({ rule: "lift-embedded-fields", detail: `${blockKey}.${field} → ${field} (${size})` });
    }
  }
}

/** 2 — drop blank / non-string entries from every authored list field. */
export function pruneBlankEntries(note: Json, changes: RepairChange[]): void {
  for (const field of MD_LIST_FIELDS) {
    const list = note[field];
    if (!Array.isArray(list)) continue;
    const kept = list.filter((x) => typeof x === "string" && x.trim() !== "");
    if (kept.length === list.length) continue;
    note[field] = kept;
    const dropped = list.length - kept.length;
    changes.push({
      rule: "prune-blank-entries",
      detail: `${field}: dropped ${dropped} blank/non-string entr${dropped === 1 ? "y" : "ies"} of ${list.length}`,
    });
  }
}

/**
 * 3 — resolve an MCQ answer to the option LETTER the schema demands.
 *
 * Accepted shapes (measured in the corpus): `"C"`, `"(b)"`, `"A."`,
 * `"B — the velocity is zero"`, `"C (h ∝ t²)"`. Anything else — a bare `2`,
 * `"all of the above"`, `null` — is returned as null instead of guessed: a
 * silently wrong answer key is worse than a failing gate.
 */
export function normalizeMcqAnswer(
  raw: unknown,
  optionCount: number,
): { answer: string; note?: string } | null {
  if (typeof raw !== "string") return null;
  const text = raw.trim();
  const m = /^[([]?\s*([A-Ha-h])\s*[)\].]?\s*(?:(?:—|–|-|:)\s*(.+)|\((.+)\))?$/.exec(text);
  if (!m) return null;

  const letter = m[1].toUpperCase();
  const index = letter.charCodeAt(0) - 64; // A → 1
  if (index < 1 || index > optionCount) return null; // letter beyond the options offered

  const note = (m[2] ?? m[3] ?? "").trim();
  return note ? { answer: letter, note } : { answer: letter };
}

/** Merge a worked note rescued from the answer field into `explanation`. */
function attachExplanation(item: Json, rescued?: string): void {
  const existing = typeof item.explanation === "string" ? item.explanation.trim() : "";
  const merged = rescued ? (existing ? `${existing} — ${rescued}` : rescued) : existing;
  // `explanation` is `MdString.optional()` on a `.strict()` object: an empty
  // string fails validation, so an empty value must remove the key.
  if (merged) item.explanation = merged;
  else delete item.explanation;
}

/** 3 — apply `normalizeMcqAnswer` across `mcs`. */
export function normalizeMcqAnswers(note: Json, changes: RepairChange[]): void {
  for (const field of ["mcs", "mcqs"]) {
    const list = note[field];
    if (!Array.isArray(list)) continue;

    list.forEach((item, i) => {
      if (!isObj(item) || !Array.isArray(item.options)) return;
      if (typeof item.answer === "string" && /^[A-H]$/.test(item.answer.trim())) return; // already canonical
      const fixed = normalizeMcqAnswer(item.answer, item.options.length);
      if (!fixed) return;

      const before = JSON.stringify(item.answer);
      item.answer = fixed.answer;
      attachExplanation(item, fixed.note);
      changes.push({
        rule: "mcq-answer-letter",
        detail: `${field}[${i}].answer: ${before} → "${fixed.answer}"${fixed.note ? " (worked note moved to explanation)" : ""}`,
      });
    });
  }
}

/** 4 — restore presentation keys to the identifier form the UI looks up. */
export function normalizeVisualKeys(note: Json, changes: RepairChange[]): void {
  const fallback = typeof note.unitSlug === "string" && note.unitSlug ? note.unitSlug : undefined;
  if (!fallback) return;

  for (const field of VISUAL_KEY_FIELDS) {
    const value = note[field];
    if (typeof value !== "string" || value.length <= VISUAL_KEY_MAX) continue;
    changes.push({
      rule: "visual-key-identifier",
      detail: `${field}: ${value.length}-char prose → "${fallback}" (animation key, not display text)`,
    });
    note[field] = fallback;
  }
}

/**
 * Apply every rule to one parsed concept note. Returns a NEW object; the input
 * is never mutated, so a caller can compare against the schema before deciding
 * to write anything.
 */
export function repairNote(input: unknown): RepairResult {
  const changes: RepairChange[] = [];
  if (!isObj(input)) return { note: {}, changes };

  const note = clone(input);
  liftEmbeddedFields(note, changes); // first: later rules act on lifted data
  pruneBlankEntries(note, changes);
  normalizeMcqAnswers(note, changes);
  normalizeVisualKeys(note, changes);
  return { note, changes };
}
