/**
 * SOURCE REGISTRY — the answer to "how do I give the source to it?"
 *
 * Owner question (2026-09-30): *"how should i give the source to it — tell me,
 * i have [sources]"*. This file is the contract: every source the tutor reads,
 * in the trust order it is allowed to use them, and the drop-in path where new
 * material goes.
 *
 * HOW TO GIVE THE TUTOR A SOURCE — drop a file. No code change needed: the
 * corpus is re-read on a 5-minute TTL (or on the next deploy).
 *
 *   1. backend/kb/<folder>/<name>.json     ← FASTEST PATH
 *      Any JSON whose top-level values are strings or arrays of strings is
 *      read as knowledge, in whichever key order it is written:
 *
 *        { "class": "12", "subject": "physics", "unit": "semiconductors",
 *          "notes": ["…"],       ← becomes a "Notes" section
 *          "examTraps": ["…"],   ← becomes an "Exam traps" section
 *          "formulas": ["…"] }   ← becomes a "Formulas" section
 *
 *      Descriptive keys (class, unit, slug, relevance) index the record; every
 *      other string / string[] key becomes a labelled section injected VERBATIM.
 *
 *   2. content/ravikishan/<class>/<subject>/<unit>/concepts/*.json
 *      the schema-validated authored corpus — the tier-1 source.
 *      `npm run check:schema` then `npm run content:build`.
 *
 *   3. frontend/public/data/syllabus-notes/ — built payloads (read-only).
 *
 * LARGER SOURCES (a whole textbook, a PYQ bank) → put JSON in backend/kb/;
 * split by unit rather than shipping one enormous file.
 *
 * LIVE WEB (Tavily) is a SUPPLEMENT, never a replacement: consulted only for
 * facts that may have changed (current affairs, exam dates, recent science),
 * cited by source name, never as syllabus truth.
 */

/** Where a source physically lives, or the keyword that activates it. */
export type SourceKind = "drop-in" | "corpus" | "built" | "syllabus" | "web" | "model";

export interface SourceDescriptor {
  /** Stable id used in prompts and in the owner console. */
  id: string;
  /** Human name for citation ("as per the NEB Class 12 corpus…"). */
  name: string;
  kind: SourceKind;
  /**
   * Trust rank — 1 is highest. On any conflict the lower number wins and the
   * answer follows it, naming the source out loud.
   */
  tier: 1 | 2 | 3;
  /** Scope this source is authoritative FOR. */
  scope: string;
  /** Repo path, or a route/template for the source. */
  path: string;
  /** How to hand the owner's own material in, in one line. */
  howToSupply: string;
  /** Whether the tutor reads it automatically on every request. */
  automatic: boolean;
}

/** The ordered source registry. Read order = trust order. */
export const SOURCE_REGISTRY: SourceDescriptor[] = [
  {
    id: "drop-in",
    name: "Owner drop-in source",
    kind: "drop-in",
    tier: 1,
    scope: "Anything the owner explicitly supplies — preferred on ties.",
    path: "backend/kb/**/*.json",
    howToSupply: "Drop a JSON file in backend/kb/ — keys become sections automatically.",
    automatic: true,
  },
  {
    id: "corpus",
    name: "NEB Class 11/12 authored corpus",
    kind: "corpus",
    tier: 1,
    scope: "NEB +2 Science Class 11 & 12 — the spine of every academic answer.",
    path: "content/ravikishan/<class>/<subject>/<unit>/concepts/*.json",
    howToSupply: "Author a ConceptNote JSON, then npm run check:schema + npm run content:build.",
    automatic: true,
  },
  {
    id: "built",
    name: "Built syllabus notes",
    kind: "built",
    tier: 2,
    scope: "Browser-shipped note payloads — cross-check and extra detail.",
    path: "frontend/public/data/syllabus-notes/**/*.json",
    howToSupply: "Produced by npm run content:build — never edit by hand.",
    automatic: true,
  },
  {
    id: "syllabus",
    name: "NEB syllabus anchor",
    kind: "syllabus",
    tier: 2,
    scope: "Subject → unit → topic structure; proves whether a topic is in the syllabus.",
    path: "subjects / chapters / topics tables (Supabase)",
    howToSupply: "Seeded through the owner console.",
    automatic: true,
  },
  {
    id: "web",
    name: "Live web search",
    kind: "web",
    tier: 3,
    scope: "Fast-changing facts only: current affairs, exam dates, recent science.",
    path: "Tavily API (TAVILY_API_KEY)",
    howToSupply: "Set TAVILY_API_KEY in backend/.env to enable; omit it to disable.",
    automatic: true,
  },
  {
    id: "model",
    name: "Model prior knowledge",
    kind: "model",
    tier: 3,
    scope: "Reasoning, derivations and analogy — used only where no source reaches.",
    path: "agnes → internal chain",
    howToSupply: "n/a",
    automatic: true,
  },
];

/**
 * OFFICIAL SOURCE ALLOWLIST (owner 2026-10-02) — the ONLY sources the tutor may
 * treat as TRUTH. Anything outside this list is rejected: ignore it, never cite
 * it. The textbooks/dictionaries carry the subject facts; the board site carries
 * exam rules and official notices.
 */
export const OFFICIAL_SOURCE_ALLOWLIST: ReadonlyArray<{
  name: string;
  role: string;
  domains: string[];
}> = [
  {
    name: "CDC e-library + official NEB (CDC) Class 11/12 textbooks",
    role: "syllabus facts, definitions, derivations, diagrams",
    domains: ["moecdc.gov.np", "elearning.moecdc.gov.np", "cdc.gov.np"],
  },
  {
    name: "NEB (National Examinations Board) Nepal",
    role: "exam rules, syllabus changes, results, official notices",
    domains: ["neb.gov.np"],
  },
  {
    name: "Oxford/Cambridge dictionaries (English) · नेपाली बृहत् शब्दकोश (Nepali)",
    role: "word meanings and definitions only — never science facts",
    domains: ["dictionary.cambridge.org", "oxfordlearnersdictionaries.com", "oed.com"],
  },
];

/**
 * The always-on source contract appended to every system prompt: which sources
 * exist, what they are trusted for, and the citation discipline between them.
 */
export const SOURCE_REGISTRY_RULES = `[SOURCE HIERARCHY — WHAT TO TRUST, AND HOW TO SAY IT]

STRICT OFFICIAL ALLOWLIST — applies to NEB, ACADEMIC and DIAGRAM questions only:
1. CDC e-library + official NEB (CDC) Class 11/12 textbooks — the factual spine for every syllabus answer.
2. neb.gov.np (National Examinations Board) — the only authority for exam rules, syllabus changes, results and official notices.
3. Standard dictionaries for WORD meanings only — Oxford/Cambridge (English) and नेपाली बृहत् शब्दकोश (Nepali). They define words; they never decide science facts.
When the question is about NEB, an academic subject (Physics, Chemistry, Biology, Mathematics, English, Nepali), or a diagram/figure, every other website is FORBIDDEN as a source of truth — Wikipedia, blogs, Khan Academy, news sites, forums, etc. Ignore it and never cite it. If that kind of fact cannot be traced to the allowlist, say so plainly instead of citing a non-official site.

OUTSIDE THE ALLOWLIST ZONE — every other question (career, motivation, emotions, current affairs, general knowledge, world events, entertainment, life advice): answer freely and draw on any reliable source — news, encyclopedias, official government pages, reputable publications — cited by name. The strict allowlist does not apply here.

In order of authority — on any conflict, the higher one wins and you follow it:
1. Owner drop-in source (${SOURCE_REGISTRY[0].path}) — material the owner handed you directly. Preferred on ties.
2. Official NEB (CDC) Class 11/12 textbook + authored corpus (${SOURCE_REGISTRY[1].path}) — the SPINE of every academic answer. Its facts, order and exam framing come first.
3. Built syllabus notes (${SOURCE_REGISTRY[2].path}) — extra detail and a cross-check.
4. NEB syllabus anchor — tells you whether a topic is genuinely in the syllabus.
5. Live web search — ONLY when it lands inside the official allowlist (CDC e-library, neb.gov.np), and ONLY for facts that may have changed (exam dates, syllabus updates, official notices). Cite the source by name in plain words ("as per neb.gov.np"). Never treat any non-official web result as truth, and never let it contradict 1–4 silently: say what differs and which you are following.
6. Your own prior knowledge — reasoning, derivations, analogy, and whatever none of the allowlisted sources covers. Never present it as the official textbook.

CITE BY NAME, NEVER BY URL: say which source carried the fact. Never invent a source, a statistic, a quotation or a curriculum rule. If you did not receive a curriculum record for this topic, say the answer is from general knowledge rather than implying the platform supplied it.`;

/** Compact registry line for the owner console / diagnostics endpoint. */
export function registrySummary(): Array<Pick<SourceDescriptor, "id" | "name" | "kind" | "tier" | "scope">> {
  return SOURCE_REGISTRY.map(({ id, name, kind, tier, scope }) => ({ id, name, kind, tier, scope }));
}

