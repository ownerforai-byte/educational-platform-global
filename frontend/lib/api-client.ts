const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

/**
 * Auth model:
 *  - The backend sets an **httpOnly** `sb-access-token` cookie on
 *    login / signup / refresh. Because it is httpOnly, JS never reads it;
 *    the browser attaches it automatically on same-site requests
 *    (`credentials: "include"`).
 *  - A bearer header is added opportunistically when a readable token
 *    cookie is present, but it is not required for auth to work.
 *
 * 401 handling:
 *  - A 401 on a *resource* endpoint may mean the token expired → attempt a
 *    single `/api/auth/refresh`, then retry once.
 *  - A 401 on the auth endpoints themselves (`/api/auth/me`, `/login`, …)
 *    just means "logged out" → surface it immediately (no refresh loop).
 */

function getBearerCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|; )sb-access-token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function buildHeaders(init?: RequestInit): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init?.headers as Record<string, string> | undefined),
  };
  const token = getBearerCookie();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

/** Auth endpoints that should NOT trigger a refresh loop. */
function isAuthPath(path: string): boolean {
  return (
    path.startsWith("/api/auth/") &&
    !path.startsWith("/api/auth/refresh") &&
    path !== "/api/auth/refresh"
  );
}

function unauthorizedError(): Error {
  return Object.assign(new Error("Unauthorized"), { status: 401, code: "UNAUTHORIZED" });
}

async function request<T>(path: string, init?: RequestInit, isRetry = false): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: buildHeaders(init),
    credentials: "include",
  });

  // Refresh-and-retry only for resource endpoints, and only once.
  if (response.status === 401 && !isRetry && !isAuthPath(path)) {
    const refreshed = await fetch(`${API_BASE}/api/auth/refresh`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    if (refreshed.ok) {
      return request<T>(path, init, true);
    }
    throw unauthorizedError();
  }

  if (!response.ok) {
    const error = (await response.json().catch(() => ({ error: response.statusText }))) as {
      error?: string;
    };
    const err = new Error(error.error || `Request failed: ${response.status}`);
    (err as unknown as { status?: number }).status = response.status;
    throw err;
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  return request<T>(path, init);
}
