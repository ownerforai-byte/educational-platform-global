// ADDITIVE (perf pass, 2026-09-27): cached GET entry points used by the
// `*Cached` variants appended at the bottom of this file.
import {
  apiFetch,
  apiGet,
  invalidateApiGetWhere,
  type ApiGetOptions,
} from "../api-client";
import type {
  AIChatMessage,
  AIChatRequest,
  AIChatResponse,
  RavikishanNotesResponse,
  RNotesResponse,
  SearchResponse,
} from "../../types/api";

/**
 * Get R-Notes manifest (subjects and chapters).
 */
export async function getRNotes(): Promise<RNotesResponse> {
  return apiFetch<RNotesResponse>("/api/r-notes");
}

/**
 * Get Ravikishan notes data by path.
 */
export async function getRavikishanNotes(
  path: string
): Promise<RavikishanNotesResponse> {
  return apiFetch<RavikishanNotesResponse>(
    `/api/ravikishan-notes?path=${encodeURIComponent(path)}`,
  );
}

/**
 * Search across the syllabus and resources.
 */
export async function searchContent(
  query: string,
  provider?: string
): Promise<SearchResponse> {
  return apiFetch<SearchResponse>("/api/search", {
    method: "POST",
    body: JSON.stringify({ query, provider }),
  });
}

/**
 * Send a chat message to the AI assistant.
 */
export async function chatWithAI(
  messages: AIChatMessage[],
  provider?: string
): Promise<AIChatResponse> {
  const body: AIChatRequest = { messages };
  if (provider) {
    body.provider = provider;
  }
  return apiFetch<AIChatResponse>("/api/ai", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/* ------------------------------------------------------------------ *
 * ADDITIVE (perf pass, 2026-09-27): cached read variants.
 *
 * The three functions above are untouched and keep calling `apiFetch`.
 * These variants hit the *same* endpoints with the *same* response types and
 * add the shared TTL / stale-while-revalidate / in-flight-dedupe cache. They
 * are only offered for public GETs whose payload is identical for every
 * visitor — no user-scoped data is cached here.
 * ------------------------------------------------------------------ */

/** Fresh window for content manifests (10 minutes). */
const CONTENT_FRESH_MS = 1000 * 60 * 10;
/** Window in which a stale manifest may still be served (60 minutes). */
const CONTENT_STALE_MS = 1000 * 60 * 60;

/** `getRNotes` with the additive GET cache. */
export async function getRNotesCached(
  options: ApiGetOptions = {},
): Promise<RNotesResponse> {
  return apiGet<RNotesResponse>("/api/r-notes", {
    freshMs: CONTENT_FRESH_MS,
    staleMs: CONTENT_STALE_MS,
    scope: "r-notes",
    ...options,
  });
}

/**
 * `getRavikishanNotes` with the additive GET cache. The asset path is part of
 * the cache key (`variant`), so two different note paths never collide.
 */
export async function getRavikishanNotesCached(
  path: string,
  options: ApiGetOptions = {},
): Promise<RavikishanNotesResponse> {
  return apiGet<RavikishanNotesResponse>(
    `/api/ravikishan-notes?path=${encodeURIComponent(path)}`,
    {
      freshMs: CONTENT_FRESH_MS,
      staleMs: CONTENT_STALE_MS,
      scope: "ravikishan-notes",
      variant: path,
      ...options,
    },
  );
}

/**
 * Background-warms a note path (safe from a hover/focus/idle handler).
 * Never throws.
 */
export function prefetchRavikishanNotes(path: string, options: ApiGetOptions = {}): void {
  void getRavikishanNotesCached(path, options).catch(() => undefined);
}

/** Drops every cached notes manifest (run after a content deploy). */
export function invalidateNotesCache(): number {
  return invalidateApiGetWhere(
    (key) => key.startsWith("/api/r-notes") || key.startsWith("/api/ravikishan-notes"),
  );
}

