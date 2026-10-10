import { apiFetch } from "@/lib/api-client";

/**
 * GOOGLE IMAGE SEARCH CLIENT — the Diagram Hub's "present directly from Google"
 * mode (owner request 2026-10-04: "the image produced are too low, so direct
 * presenting from google is best … create the details interface").
 *
 * GET /api/ai/image-search answers `configured: false` when the backend has
 * no GOOGLE_CSE key yet, so this client normalises that into a typed shape the
 * hub can render honestly (a direct Google Images link instead of an empty
 * grid) rather than pretending the search simply found nothing.
 *
 * The facts half (POST /api/ai/image-facts) resolves to null on ANY failure —
 * the details interface degrades to its metadata-only state, never an error.
 */

/** One Google result, shaped for the details interface. */
export type GoogleImageResult = {
  /** Full-size image file (Google's `link`). */
  url: string;
  /** The page that hosts it, for credit — may be empty. */
  page?: string;
  /** Short host for the credit chip, e.g. "class11notes.example". */
  host?: string;
  title: string;
  /** Google's description line — the details "Description" field. */
  snippet?: string;
  width?: number;
  height?: number;
  /** Grid preview thumbnail; the grid falls back to the full-size url. */
  thumb?: string;
};

export type ImageSearchResponse = {
  /** false → the backend has no Google credentials yet. */
  configured: boolean;
  results: GoogleImageResult[];
};

/** The plain Google Images search URL (the no-key fallback link). */
export function googleImagesLink(query: string): string {
  return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query.trim())}`;
}

/** Search Google Images through the backend; never throws for an empty query. */
export async function searchGoogleImages(
  query: string,
  limit = 12,
): Promise<ImageSearchResponse> {
  const q = query.trim();
  if (!q) return { configured: true, results: [] };
  const res = await apiFetch<ImageSearchResponse>(
    `/api/ai/image-search?q=${encodeURIComponent(q)}&limit=${limit}`,
  );
  return {
    configured: res?.configured !== false,
    results: Array.isArray(res?.results) ? res.results : [],
  };
}

/**
 * Veer's facts card for whatever the picture shows — official syllabus truth
 * only (the backend prompt pins that). Resolves to null whenever the provider
 * chain has no LLM, so the panel just shows "facts unavailable".
 */
export async function fetchImageFacts(subject: string): Promise<string[] | null> {
  const q = subject.trim();
  if (!q) return null;
  try {
    const res = await apiFetch<{ facts?: string[] }>("/api/ai/image-facts", {
      method: "POST",
      body: JSON.stringify({ q: q.slice(0, 300) }),
    });
    return Array.isArray(res?.facts) && res.facts.length > 0 ? res.facts : null;
  } catch {
    return null;
  }
}
