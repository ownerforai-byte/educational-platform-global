/**
 * DIAGRAM SEARCH — real, labelled figures fetched on purpose.
 *
 * Owner request (2026-09-30): "it can fetch images, diagrams related to context
 * for better understanding". The general web search already returns whatever
 * images a page happens to carry, which for a "diagram of X" question is often
 * a stock photo, a logo or a thumbnail of a page banner. This module asks the
 * one source that is *full* of school-level labelled figures — Wikimedia
 * Commons — for files whose NAME matches the concept being asked about, and
 * hands the tutor their direct file URLs.
 *
 * Why Commons and not another image API:
 *   · no key and no quota, so it works from any deployment;
 *   · the files are openly licensed, so crediting them is enough;
 *   · scientific diagrams dominate it (ray diagrams, circuits, cell structure,
 *     molecular geometry, cycles, apparatus) rather than photographs;
 *   · the file NAME is free text and therefore searchable, which is what makes
 *     "related to context" checkable rather than hoped for — see relevanceOf.
 *
 * Contract with the tutor: we only ever hand over URLs that exist, together
 * with the file identity and its licence, so a reply can embed a picture and
 * credit it truthfully, and can never mistake an invented URL for a real one.
 *
 * Everything here is best-effort: a slow or failing Wikimedia never delays or
 * fails a chat reply. Disable with DIAGRAM_SEARCH=off; tests are skipped
 * automatically (NODE_ENV=test) unless DIAGRAM_SEARCH=on forces them.
 */

export interface DiagramImage {
  /** Direct file URL (upload.wikimedia.org) — the only thing a reply may embed. */
  url: string;
  /** "File:Refraction through a prism.svg" — identity, used for relevance and credit. */
  file: string;
  /** Human-readable licence, e.g. "CC BY-SA 4.0". */
  license: string;
  width: number;
  height: number;
}

/** How many diagram files may be attached to one question. */
export const DIAGRAM_LIMIT = Number(process.env.DIAGRAM_LIMIT) || 3;

/** Per-request budget. Runs in parallel with the web search, so it is not additive. */
export const DIAGRAM_TIMEOUT_MS = Number(process.env.DIAGRAM_TIMEOUT_MS) || 6000;

const COMMONS_API = "https://commons.wikimedia.org/w/api.php";

/** Wikimedia asks for a descriptive agent; anonymous default agents get throttled. */
const USER_AGENT =
  "RavikisanEducationalPlatform/1.0 (NEB Class 11-12 tutor; diagram grounding)";

/** Question scaffolding that carries no subject meaning. */
const STOPWORDS = new Set([
  "what", "which", "who", "whom", "whose", "when", "where", "why", "how", "does",
  "did", "done", "explain", "explains", "explanation", "definition", "define",
  "describe", "described", "meaning", "mean", "means", "tell", "give", "show",
  "please", "help", "with", "without", "from", "into", "about", "this", "that",
  "through", "across", "inside", "along", "during", "versus", "state", "briefly",
  "these", "those", "there", "their", "them", "then", "than", "also", "using",
  "use", "used", "make", "made", "work", "works", "working", "class", "grade",
  "neb", "cbse", "board", "chapter", "topic", "concept", "concepts", "notes",
  "note", "question", "questions", "answer", "answers", "diagram", "diagrams",
  "label", "labelled", "labeled", "difference", "differences", "between",
  "full", "detail", "details", "complete", "everything", "write", "short",
  "long", "important", "basic", "basics", "study", "exam", "exams", "numerical",
  "solve", "problem", "problems", "example", "examples", "formula", "formulae",
]);

/**
 * The significant words of a question. Kept: subject nouns like "nephron",
 * "capacitor", "prism" — dropped: the scaffolding above, numbers and anything
 * shorter than four characters (a three-letter token matches half the Commons
 * filenames in existence).
 */
export function questionTerms(question: string): string[] {
  const words = (question || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const terms: string[] = [];
  for (const word of words) {
    const term = word.replace(/^-+|-+$/g, "");
    if (term.length < 4) continue;
    if (STOPWORDS.has(term)) continue;
    if (!terms.includes(term)) terms.push(term);
  }
  return terms.slice(0, 8);
}

/** The Commons search string: the concept's own nouns, biased to drawn figures. */
export function buildDiagramQuery(question: string): string {
  const terms = questionTerms(question);
  if (!terms.length) return "";
  return `${terms.join(" ")} diagram`;
}

/** Title → comparable words ("File:Ray_diagram_of_a_prism.svg" → ray/prism/…). */
function titleTerms(file: string): string[] {
  return file
    .replace(/^file:/i, "")
    .replace(/\.[a-z0-9]+$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .split(/\s+/)
    .filter((t) => t.length >= 3);
}

/**
 * How many of the question's terms the file name actually carries. A file with
 * zero is NOT attached: "related to context" is the whole point, and an
 * unrelated picture is worse than none — it teaches the wrong thing.
 */
export function relevanceOf(file: string, terms: string[]): number {
  if (!terms.length) return 0;
  const words = titleTerms(file);
  let score = 0;
  for (const term of terms) {
    if (words.some((w) => w === term || w.startsWith(term) || term.startsWith(w))) score += 1;
  }
  return score;
}

/** Tags out of an extmetadata string value (they arrive as small HTML fragments). */
export function plainText(value: string): string {
  return String(value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#0?39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

const ACCEPTED_MIME = /^image\/(svg\+xml|png|jpeg|gif)$/i;

/**
 * Read the Commons query response. Pure, so the shape handling is testable
 * offline: `formatversion=2` returns an array of pages, an older server
 * returns an object keyed by page id, and both must work.
 */
export function parseCommonsImages(payload: unknown, question: string): DiagramImage[] {
  const pagesRaw = (payload as { query?: { pages?: unknown } })?.query?.pages;
  const pages: Array<Record<string, unknown>> = Array.isArray(pagesRaw)
    ? (pagesRaw as Array<Record<string, unknown>>)
    : pagesRaw && typeof pagesRaw === "object"
      ? Object.values(pagesRaw as Record<string, Record<string, unknown>>)
      : [];

  const terms = questionTerms(question);
  const seen = new Set<string>();
  const found: Array<{ image: DiagramImage; relevance: number; index: number }> = [];

  for (const page of pages) {
    const title = String(page.title ?? "");
    if (!title || seen.has(title.toLowerCase())) continue;

    const info = Array.isArray(page.imageinfo)
      ? (page.imageinfo as Array<Record<string, unknown>>)[0]
      : undefined;
    if (!info) continue;

    const mime = String(info.mime ?? "");
    if (!ACCEPTED_MIME.test(mime)) continue;

    const width = Number(info.width) || 0;
    const height = Number(info.height) || 0;
    // Icons, flags and logos carry no teaching value at this size.
    if (width && width < 250) continue;

    const url = String(info.thumburl || info.url || "");
    if (!/^https?:\/\//.test(url)) continue;

    const meta = (info.extmetadata ?? {}) as Record<string, { value?: unknown }>;
    const license = plainText(String(meta.LicenseShortName?.value ?? "")) || "see Commons file page";

    const relevance = relevanceOf(title, terms);
    if (relevance === 0) continue;

    seen.add(title.toLowerCase());
    found.push({
      image: { url, file: title, license, width, height },
      relevance,
      index: Number(page.index) || Number.MAX_SAFE_INTEGER,
    });
  }

  return found
    .sort((a, b) => b.relevance - a.relevance || a.index - b.index)
    .map((entry) => entry.image);
}

/**
 * Fetch `limit` diagram files for this question. `drawingOnly` uses Commons'
 * filetype filter, which restricts the search to vector/line-drawn files — the
 * ones that are actually diagrams rather than photographs.
 */
export async function fetchDiagrams(
  question: string,
  limit = DIAGRAM_LIMIT,
  opts: { drawingOnly?: boolean } = {},
): Promise<DiagramImage[]> {
  const query = buildDiagramQuery(question);
  if (!query) return [];

  const search = opts.drawingOnly ? `${query} filetype:drawing` : query;
  const url =
    `${COMMONS_API}?action=query&format=json&formatversion=2` +
    `&generator=search&gsrnamespace=6&gsrlimit=${Math.min(Math.max(limit * 4, 4), 16)}` +
    `&gsrsearch=${encodeURIComponent(search)}` +
    `&prop=imageinfo&iiprop=url%7Cmime%7Csize%7Cextmetadata&iiurlwidth=900`;

  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
    signal: AbortSignal.timeout(DIAGRAM_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Commons ${res.status}`);
  const payload = await res.json();
  return parseCommonsImages(payload, question).slice(0, limit);
}

/** True unless the operator turned it off (or a test run did not ask for it). */
export function diagramSearchEnabled(): boolean {
  const flag = (process.env.DIAGRAM_SEARCH ?? "").trim().toLowerCase();
  if (flag === "off" || flag === "false" || flag === "0") return false;
  if (flag === "on" || flag === "true" || flag === "1") return true;
  return process.env.NODE_ENV !== "test";
}

/**
 * The `[REAL DIAGRAM FILES ATTACHED]` block, shaped like the search engine's
 * image block on purpose: by the time the model reads it, "here are real image
 * URLs, embed the relevant ones, never invent one" is already a rule it knows.
 * Pure and exported — the wording is a contract, so it is asserted in tests.
 */
export function formatDiagramBlock(images: DiagramImage[]): string {
  if (!images.length) return "";
  const lines = [
    "[REAL DIAGRAM FILES ATTACHED — WIKIMEDIA COMMONS]",
    "These are real, openly licensed diagram files whose file names match this concept.",
    "Embed the 1-3 that genuinely show what your explanation describes, as",
    "![short description of what is visible](url) directly after that paragraph,",
    "and credit them once in plain words at the end. Only these URLs may be embedded —",
    "never invent an image URL, and never attach a picture that does not match the concept.",
  ];
  for (const image of images) {
    lines.push(`   • ${image.url}   (${image.file} — ${image.license})`);
  }
  lines.push("[END OF DIAGRAM FILES]", "");
  return lines.join("\n");
}

/**
 * The whole step, best-effort: a drawing-filtered search first, then a plain
 * one if the filter found nothing (some perfectly good figures are saved as
 * bitmaps). Any failure degrades to "no diagram block", never to an error.
 */
export async function fetchDiagramContext(question: string, limit = DIAGRAM_LIMIT): Promise<string> {
  if (!diagramSearchEnabled() || !question.trim()) return "";
  try {
    let images = await fetchDiagrams(question, limit, { drawingOnly: true });
    if (!images.length) images = await fetchDiagrams(question, limit);
    if (!images.length) return "";
    console.log(
      `[DiagramSearch] "${question.slice(0, 50)}" → ${images.length} diagram file(s): ` +
        images.map((i) => i.file.replace(/^file:/i, "")).join(", "),
    );
    return formatDiagramBlock(images);
  } catch (err) {
    console.warn("[DiagramSearch] unavailable:", err instanceof Error ? err.message : err);
    return "";
  }
}
