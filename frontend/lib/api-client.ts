import type { ApiError } from "../types/api";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

const TOKEN_KEY = "neb_access_token";

/** Store the Supabase access token so subsequent requests can authenticate cross-origin. */
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
  if (!API_BASE) {
    // No base URL — relative path works through Next.js proxy (/api/* → backend)
    let url = path;
    if (params) {
      const qs = Object.entries(params)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
        .join("&");
      if (qs) url += `?${qs}`;
    }
    return url;
  }
  const url = new URL(path, API_BASE);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

export async function apiFetch<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options;
  const url = buildUrl(path, params);

  // Attach the stored Bearer token for cross-origin auth.
  const token = getAccessToken();
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  const response = await fetch(url, {
    ...fetchOptions,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...authHeader,
      ...(fetchOptions.headers || {}),
    },
  });

  if (!response.ok) {
    const error = (await response.json().catch(() => ({
      error: response.statusText,
    })) as ApiError);
    throw new Error(error.error || response.statusText);
  }

  return response.json() as Promise<T>;
}
