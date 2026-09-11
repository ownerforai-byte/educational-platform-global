import type { ApiError } from "../types/api";

/**
 * API base URL strategy:
 *  – Browser: empty string → relative paths → Next.js rewrite proxy handles /api/* → backend.
 *    This avoids CORS entirely because the browser sees same-origin requests.
 *  – Server (SSR / Node): absolute URL → direct server-to-server, no CORS needed.
 */
const API_BASE =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_API_URL || ""
    : "";

const TOKEN_KEY = "neb_access_token";

/** Persist the Supabase access token so subsequent requests can attach it as a Bearer header. */
export function setAccessToken(token: string | null): void {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

/** Read the stored access token (returns undefined on the server). */
export function getAccessToken(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return localStorage.getItem(TOKEN_KEY) ?? undefined;
}

export type RequestOptions = RequestInit & {
  params?: Record<string, string | number>;
};

function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (API_BASE) {
    // Server-side: construct absolute URL for direct backend calls.
    url = new URL(path, API_BASE).toString();
  }
  if (params) {
    const qs = Object.entries(params)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
      .join("&");
    if (qs) url += (url.includes("?") ? "&" : "?") + qs;
  }
  return url;
}

export async function apiFetch<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options;
  const url = buildUrl(path, params);

  // Attach the stored Bearer token for authenticated requests.
  const token = getAccessToken();

  // Build headers explicitly to avoid TS union-type spread issues.
  const mergedHeaders: Record<string, string> = {};
  if (token) {
    mergedHeaders["Authorization"] = `Bearer ${token}`;
  }
  // Only set Content-Type for request bodies (GET/HEAD have no body).
  const method = (fetchOptions.method ?? "GET").toUpperCase();
  if (method !== "GET" && method !== "HEAD") {
    mergedHeaders["Content-Type"] = "application/json";
  }
  if (fetchOptions.headers) {
    const h = fetchOptions.headers;
    if (h instanceof Headers) {
      h.forEach((v, k) => { mergedHeaders[k] = v; });
    } else if (Array.isArray(h)) {
      h.forEach(([k, v]) => { mergedHeaders[k] = v; });
    } else {
      Object.assign(mergedHeaders, h);
    }
  }

  const response = await fetch(url, {
    ...fetchOptions,
    credentials: "include",
    headers: mergedHeaders,
  });

  if (!response.ok) {
    const error = (await response.json().catch(() => ({
      error: response.statusText,
    })) as ApiError);
    throw new Error(error.error || response.statusText);
  }

  return response.json() as Promise<T>;
}
