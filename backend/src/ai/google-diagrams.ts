/**
 * GOOGLE IMAGE DIAGRAMS — an optional second, owner-configured diagram source.
 *
 * Owner request (2026-10-02): "you can code it to take ideas and knowledge from
 * google images". Google's Programmable Search (Custom Search JSON API) is the
 * only sanctioned way to read Google Images from a server, so this module is
 * OPTIONAL and KEY-GATED exactly like the other engines: it activates only when
 * GOOGLE_CSE_API_KEY and GOOGLE_CSE_CX are set, and is silent otherwise. The
 * platform therefore keeps working with no key (Wikimedia Commons is the
 * default) while the owner can add Google's far larger index of labelled school
 * diagrams when a key exists.
 *
 * ROLE — VISUAL REFERENCE, NOT A SOURCE OF FACTS. The strict official
 * allowlist (CDC / NEB / dictionaries) still governs every FACT for NEB,
 * academic and diagram questions. Google results are handed to the model only
 * as "here is what this figure looks like", so it can draw an ACCURATE labelled
 * figure of its own — never as syllabus truth. The block below says so plainly.
 *
 * Best-effort: a missing key, quota error or network failure resolves to [] so
 * a dead Google never delays or breaks a chat reply.
 */

export interface GoogleDiagram {
  /** The image file itself (Google's `link`). */
  url: string;
  /** The page that hosts it (for credit) — may be empty. */
  page: string;
  /** The result title, used as the human label. */
  title: string;
  width: number;
  height: number;
}

const GOOGLE_ENDPOINT = "https://www.googleapis.com/customsearch/v1";

/** How many Google images may be referenced for one question. */
export const GOOGLE_DIAGRAM_LIMIT = Number(process.env.GOOGLE_DIAGRAM_LIMIT) || 2;

/** Per-request budget, run alongside the other sources so it is not additive. */
export const GOOGLE_TIMEOUT_MS = Number(process.env.GOOGLE_DIAGRAM_TIMEOUT_MS) || 6000;

/**
 * True only when the owner has supplied both credentials AND has not switched
 * the source off. GOOGLE_DIAGRAMS=off forces it off even with keys present.
 */
export function googleDiagramsEnabled(): boolean {
  const flag = (process.env.GOOGLE_DIAGRAMS ?? "").trim().toLowerCase();
  if (flag === "off" || flag === "false" || flag === "0") return false;
  return !!process.env.GOOGLE_CSE_API_KEY?.trim() && !!process.env.GOOGLE_CSE_CX?.trim();
}

/** The search string — the diagram query plus Google's image-biased helper. */
export function buildGoogleImageQuery(diagramQuery: string): string {
  return diagramQuery.trim();
}

/** Does any question term appear in this result's text? (3+ chars, substring.) */
export function googleRelevanceOf(text: string, terms: string[]): boolean {
  if (!terms.length) return false;
  const hay = text.toLowerCase();
  return terms.some((t) => t.length >= 3 && hay.includes(t));
}

/** Hostname of a URL for a short credit line. */
export function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

/**
 * Read a Custom Search JSON response. Pure, so the shape handling is testable
 * offline. Keeps only real, image-typed, reasonably large, context-relevant
 * results; drops everything else.
 */
export function parseGoogleImages(payload: unknown, terms: string[]): GoogleDiagram[] {
  const items = (payload as { items?: unknown })?.items;
  if (!Array.isArray(items)) return [];

  const out: GoogleDiagram[] = [];
  const seen = new Set<string>();

  for (const raw of items) {
    const item = raw as Record<string, unknown>;
    const url = String(item.link ?? "").trim();
    if (!/^https?:\/\//.test(url) || seen.has(url.toLowerCase())) continue;

    const mime = String(item.mime ?? "");
    if (mime && !/^image\//i.test(mime)) continue;

    const image = (item.image ?? {}) as Record<string, unknown>;
    const width = Number(image.width) || 0;
    const height = Number(image.height) || 0;
    // Icons, logos and sprites teach nothing at this size.
    if (width && width < 250) continue;

    const title = String(item.title ?? "").trim();
    const snippet = String(item.snippet ?? "");
    const page = String(image.contextLink ?? "").trim();
    if (!googleRelevanceOf(`${title} ${snippet} ${url}`, terms)) continue;

    seen.add(url.toLowerCase());
    out.push({ url, page, title: title || "diagram", width, height });
  }

  return out;
}

/**
 * Fetch reference images for a question. Throws on a failed request so the
 * caller can degrade to "no Google block"; returns [] when not configured.
 */
export async function fetchGoogleDiagrams(
  diagramQuery: string,
  terms: string[],
  limit = GOOGLE_DIAGRAM_LIMIT,
): Promise<GoogleDiagram[]> {
  const key = process.env.GOOGLE_CSE_API_KEY?.trim();
  const cx = process.env.GOOGLE_CSE_CX?.trim();
  const query = buildGoogleImageQuery(diagramQuery);
  if (!key || !cx || !query) return [];

  const url =
    `${GOOGLE_ENDPOINT}?key=${encodeURIComponent(key)}&cx=${encodeURIComponent(cx)}` +
    `&searchType=image&safe=active&num=${Math.min(Math.max(limit * 3, 3), 10)}` +
    `&q=${encodeURIComponent(query)}`;

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(GOOGLE_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Google CSE ${res.status}`);
  const payload = await res.json();
  return parseGoogleImages(payload, terms).slice(0, limit);
}

/**
 * The `[REFERENCE IMAGES …]` block. Framed as visual reference ONLY: the model
 * uses it to draw an accurate figure of its own, and is told the strict
 * official allowlist still owns every fact. Pure and exported so the wording is
 * asserted in tests.
 */
export function formatGoogleDiagramBlock(google: GoogleDiagram[]): string {
  if (!google.length) return "";
  const lines = [
    "[REFERENCE IMAGES ATTACHED — GOOGLE IMAGES · VISUAL REFERENCE ONLY]",
    "These are external reference pictures of what this figure looks like.",
    "Use them ONLY to understand the structure to draw — they are NOT a source of facts:",
    "every fact must still come from the official allowlist (CDC / NEB textbooks / dictionaries).",
    "Draw your own accurate, fully-labelled figure from what they show; never embed these URLs,",
    "never treat them as syllabus truth, and never copy a wrong or unlabelled detail.",
  ];
  for (const image of google) {
    const host = image.page ? hostOf(image.page) : hostOf(image.url);
    lines.push(`   • ${image.title}${host ? ` — via ${host}` : ""}`);
  }
  lines.push("[END OF REFERENCE IMAGES]", "");
  return lines.join("\n");
}