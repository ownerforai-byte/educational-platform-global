// In browser, route requests through Next.js proxy rewrite ("") to guarantee
// same-origin cookies, zero CORS blocks, and zero SSL/mixed-content failures.
// In SSR (server-side), call NEXT_PUBLIC_API_URL or localhost directly.
const API_BASE =
  typeof window === "undefined"
    ? (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001")
    : "";

/**
 * Auth model:
 *  - Both localStorage token and httpOnly `sb-access-token` cookie are supported.
 *  - `Authorization: Bearer <token>` is sent automatically on every request.
 */

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("sb-access-token") || getBearerCookie();
}

export function setStoredToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("sb-access-token", token);
  }
}

export function clearStoredToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("sb-access-token");
  }
}

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
  const token = getStoredToken();
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
  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: buildHeaders(init),
      credentials: "include",
    });
  } catch (err: any) {
    if (err?.name === "TypeError" && err?.message?.includes("fetch")) {
      throw new Error(
        "Unable to connect to server. The backend may be spinning up (Render cold start) or offline. Please retry in 10-15 seconds."
      );
    }
    throw err;
  }

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
