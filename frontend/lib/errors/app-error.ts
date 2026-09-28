/**
 * lib/errors/app-error.ts — ADD-ONLY error-normalization layer.
 *
 * Nothing here replaces existing behaviour: every current call site keeps its
 * current code path. This module only *adds* one canonical way to classify,
 * inspect, report and retry the errors that already flow through
 * `lib/api-client.ts` (which hangs `status`, `code`, `errorId` and
 * `statusToken` off the thrown error via `Object.assign`), so call sites can
 * handle edge cases without `any`-casts.
 */

/** Stable machine-readable bucket for an error. */
export type ErrorKind =
  | "abort"
  | "client"
  | "forbidden"
  | "network"
  | "not-found"
  | "parse"
  | "rate-limit"
  | "server"
  | "timeout"
  | "unauthorized"
  | "unknown"
  | "validation";

/**
 * Extra fields the API layer already attaches to thrown errors. Declared as an
 * interface (not a class) so any plain `Error` produced elsewhere still fits.
 */
export interface ErrorShape {
  status?: number;
  code?: string;
  errorId?: string;
  statusToken?: string;
}

/** Constructor options for {@link AppError}. */
export interface AppErrorOptions extends ErrorShape {
  kind?: ErrorKind;
  retryable?: boolean;
  /** Original thrown value, kept for logging/telemetry correlation. */
  original?: unknown;
  /** Route or endpoint the failure came from (no secrets here). */
  path?: string;
}

/** HTTP statuses that are transient and therefore worth retrying. */
const RETRYABLE_STATUSES: ReadonlySet<number> = new Set([
  408, // Request Timeout
  425, // Too Early
  429, // Too Many Requests
  500, // Internal Server Error
  502, // Bad Gateway
  503, // Service Unavailable
  504, // Gateway Timeout
  522, // Cloudflare: connection timed out
  524, // Cloudflare: a timeout occurred
]);

/** Maps a status code onto an {@link ErrorKind}. */
export function classifyStatus(status: number | undefined): ErrorKind {
  if (typeof status !== "number" || !Number.isFinite(status)) return "unknown";
  if (status === 401) return "unauthorized";
  if (status === 403) return "forbidden";
  if (status === 404) return "not-found";
  if (status === 429) return "rate-limit";
  if (status >= 500) return "server";
  if (status >= 400) return "client";
  return "unknown";
}

/** True when a status is transient and therefore worth retrying. */
export function isRetryableStatus(status: number | undefined): boolean {
  return typeof status === "number" && RETRYABLE_STATUSES.has(status);
}

/**
 * Normalized error used by the additive perf/validation layers. Extends the
 * native `Error`, so `instanceof Error`, `error.message`, stack traces and
 * every existing `catch` block keep behaving exactly as before.
 */
export class AppError extends Error {
  readonly kind: ErrorKind;
  readonly status?: number;
  readonly code?: string;
  readonly errorId?: string;
  readonly statusToken?: string;
  readonly retryable: boolean;
  readonly path?: string;
  readonly occurredAt: string;
  /** The value originally thrown (may be anything, including non-errors). */
  readonly original: unknown;

  constructor(message: string, options: AppErrorOptions = {}) {
    super(
      message,
      options.original === undefined ? undefined : { cause: options.original },
    );
    this.name = "AppError";
    this.kind = options.kind ?? classifyStatus(options.status);
    if (typeof options.status === "number") this.status = options.status;
    if (typeof options.code === "string") this.code = options.code;
    if (typeof options.errorId === "string") this.errorId = options.errorId;
    if (typeof options.statusToken === "string") this.statusToken = options.statusToken;
    if (typeof options.path === "string") this.path = options.path;
    this.retryable = options.retryable ?? isRetryableStatus(options.status);
    this.occurredAt = new Date().toISOString();
    this.original = options.original;
  }
}

/** Narrowing helper — true only for errors built by this layer. */
export function isAppError(value: unknown): value is AppError {
  return value instanceof AppError;
}

/** Reads the (already existing) `status` field off any error-shaped value. */
export function getErrorStatus(error: unknown): number | undefined {
  const status = (error as ErrorShape | undefined)?.status;
  return typeof status === "number" ? status : undefined;
}

/** Reads the (already existing) machine `code` field. */
export function getErrorCode(error: unknown): string | undefined {
  const code = (error as ErrorShape | undefined)?.code;
  return typeof code === "string" && code.length > 0 ? code : undefined;
}

/** Reads the backend correlation id used by the `x-error-id` logging flow. */
export function getErrorId(error: unknown): string | undefined {
  if (isAppError(error)) return error.errorId;
  const errorId = (error as ErrorShape | undefined)?.errorId;
  return typeof errorId === "string" && errorId.length > 0 ? errorId : undefined;
}

/** Reads the signed `statusToken` some auth flows return (pending approval). */
export function getStatusToken(error: unknown): string | undefined {
  if (isAppError(error)) return error.statusToken;
  const token = (error as ErrorShape | undefined)?.statusToken;
  return typeof token === "string" && token.length > 0 ? token : undefined;
}

/** True when an error carries a specific machine-readable code. */
export function hasErrorCode(error: unknown, code: string): boolean {
  return getErrorCode(error) === code;
}

/** True for user-initiated aborts (route change, React Query cancellation). */
export function isAbortError(error: unknown): boolean {
  if (isAppError(error)) return error.kind === "abort";
  const name = (error as { name?: string } | undefined)?.name;
  return name === "AbortError" || name === "TimeoutError";
}

/** True for `fetch` transport failures (offline, cold start, DNS, CORS). */
export function isNetworkError(error: unknown): boolean {
  if (isAppError(error)) return error.kind === "network";
  if (error instanceof TypeError) return true;
  const message = getErrorMessage(error).toLowerCase();
  return (
    message.includes("failed to fetch") ||
    message.includes("networkerror") ||
    message.includes("unable to connect")
  );
}

/** True for `AbortSignal.timeout()` or {@link createTimeoutSignal} aborts. */
export function isTimeoutError(error: unknown): boolean {
  if (isAppError(error)) return error.kind === "timeout";
  return (error as { name?: string } | undefined)?.name === "TimeoutError";
}

/** Safe message extraction that never throws and never returns an empty string. */
export function getErrorMessage(
  error: unknown,
  fallback = "Something went wrong",
): string {
  if (error instanceof Error && error.message.trim().length > 0) return error.message;
  if (typeof error === "string" && error.trim().length > 0) return error;
  return fallback;
}

/** Decides whether retrying a failed operation could plausibly succeed. */
export function isRetryableError(error: unknown): boolean {
  if (isAbortError(error)) return false;
  if (isAppError(error)) {
    return error.retryable || error.kind === "network" || error.kind === "timeout";
  }
  if (isNetworkError(error) || isTimeoutError(error)) return true;
  const status = getErrorStatus(error);
  if (typeof status === "number") return isRetryableStatus(status);
  return false;
}

/**
 * Converts any thrown value into an {@link AppError} without losing
 * information. Never throws, so it is safe inside `catch` blocks, effect
 * cleanups and error boundaries.
 */
export function asAppError(error: unknown, context: { path?: string } = {}): AppError {
  if (isAppError(error)) return error;
  const status = getErrorStatus(error);
  const options: AppErrorOptions = {
    status,
    kind: isAbortError(error)
      ? "abort"
      : isTimeoutError(error)
        ? "timeout"
        : isNetworkError(error)
          ? "network"
          : classifyStatus(status),
    errorId: getErrorId(error),
    code: getErrorCode(error),
    statusToken: getStatusToken(error),
    original: error,
  };
  if (context.path) options.path = context.path;
  return new AppError(getErrorMessage(error), options);
}

/** `JSON.parse` that returns a result tuple instead of throwing. */
export function safeJsonParse<T>(
  raw: unknown,
): { ok: true; value: T } | { ok: false; error: AppError } {
  if (typeof raw !== "string") {
    return {
      ok: false,
      error: new AppError("safeJsonParse: expected a string", {
        kind: "parse",
        original: raw,
      }),
    };
  }
  try {
    return { ok: true, value: JSON.parse(raw) as T };
  } catch (error) {
    return {
      ok: false,
      error: new AppError("safeJsonParse: invalid JSON payload", {
        kind: "parse",
        original: error,
      }),
    };
  }
}

/** Result tuple produced by {@link runSafely} / {@link runSafelyAsync}. */
export type SafeResult<T> = { ok: true; value: T } | { ok: false; error: AppError };

/**
 * Runs a synchronous task and captures failures as a normalized error instead
 * of throwing — intended for optional enhancements (perf probes, prefetch)
 * that must never break the feature they decorate.
 */
export function runSafely<T>(task: () => T, context: { path?: string } = {}): SafeResult<T> {
  try {
    return { ok: true, value: task() };
  } catch (error) {
    return { ok: false, error: asAppError(error, context) };
  }
}

/** Promise variant of {@link runSafely}. */
export async function runSafelyAsync<T>(
  task: () => Promise<T>,
  context: { path?: string } = {},
): Promise<SafeResult<T>> {
  try {
    return { ok: true, value: await task() };
  } catch (error) {
    return { ok: false, error: asAppError(error, context) };
  }
}

/* ------------------------------------------------------------------ *
 * Retry + timeout helpers (used by the additive cached GET layer).
 * ------------------------------------------------------------------ */

/** Options accepted by {@link retryWithBackoff}. */
export interface RetryOptions {
  /** Total attempts including the first one. Defaults to 3. */
  attempts?: number;
  /** First backoff delay in ms (doubles per attempt). Defaults to 250. */
  baseDelayMs?: number;
  /** Upper bound for a single delay. Defaults to 4000. */
  maxDelayMs?: number;
  /** Override the "is this worth retrying?" decision. */
  shouldRetry?: (error: AppError, attempt: number) => boolean;
  /** Called before each retry (`attempt` starts at 1). */
  onRetry?: (error: AppError, attempt: number) => void;
  /** Abort the retry loop (unmount, route change, request cancellation). */
  signal?: AbortSignal;
}

/** Sleeps, but rejects immediately when the signal aborts. */
function delay(ms: number, signal?: AbortSignal): Promise<void> {
  if (signal?.aborted) return Promise.reject(asAppError(signal.reason, { path: "retry-delay" }));
  return new Promise<void>((resolve, reject) => {
    const onAbort = () => {
      clearTimeout(timer);
      reject(asAppError(signal?.reason, { path: "retry-delay" }));
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

/**
 * Exponential-backoff retry for transient failures only. Aborts, 4xx (except
 * 408/425/429) and unknown errors propagate on the first attempt, so callers
 * that hit a permanent failure keep today's behaviour exactly.
 */
export async function retryWithBackoff<T>(
  task: (attempt: number) => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const attempts = Math.max(1, options.attempts ?? 3);
  const baseDelayMs = Math.max(0, options.baseDelayMs ?? 250);
  const maxDelayMs = Math.max(baseDelayMs, options.maxDelayMs ?? 4000);

  let lastError: AppError = new AppError("retryWithBackoff: no attempt was made");

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await task(attempt);
    } catch (raw) {
      lastError = asAppError(raw);
      const shouldRetry =
        options.shouldRetry?.(lastError, attempt) ??
        (isRetryableError(lastError) && attempt < attempts);
      if (!shouldRetry || attempt >= attempts) throw lastError;
      if (options.signal?.aborted) throw asAppError(options.signal.reason);
      options.onRetry?.(lastError, attempt);
      const backoff = Math.min(maxDelayMs, baseDelayMs * 2 ** (attempt - 1));
      // Half-jitter keeps parallel cold-start retries from synchronizing.
      const jittered = Math.round(backoff / 2 + Math.random() * (backoff / 2));
      await delay(jittered, options.signal);
    }
  }

  throw lastError;
}

/** Handle returned by {@link createTimeoutSignal}. */
export interface TimeoutSignal {
  signal: AbortSignal;
  /** True when the timeout (not the caller) triggered the abort. */
  timedOut: () => boolean;
  /** Clears the pending timer — call it in `finally`. */
  clear: () => void;
}

/**
 * Timeout-aware `AbortController`. Safe in browsers, jsdom and Node: it uses a
 * plain timer instead of relying on `AbortSignal.timeout`, and links an
 * optional parent signal (route change / React Query cancellation) to it.
 */
export function createTimeoutSignal(
  timeoutMs: number,
  parent?: AbortSignal | null,
): TimeoutSignal {
  const controller = new AbortController();
  let timedOut = false;

  const onParentAbort = () => controller.abort(parent?.reason);
  if (parent) {
    if (parent.aborted) onParentAbort();
    else parent.addEventListener("abort", onParentAbort, { once: true });
  }

  const timer = setTimeout(() => {
    timedOut = true;
    const reason = new AppError(`Request timed out after ${timeoutMs}ms`, { kind: "timeout" });
    try {
      controller.abort(reason);
    } catch {
      controller.abort();
    }
  }, Math.max(0, timeoutMs));

  return {
    signal: controller.signal,
    timedOut: () => timedOut,
    clear: () => {
      clearTimeout(timer);
      parent?.removeEventListener("abort", onParentAbort);
    },
  };
}

/* ------------------------------------------------------------------ *
 * Logging funnel.
 * ------------------------------------------------------------------ */

/** Prefix used for every additive log line so greps stay trivial. */
export const ERROR_LOG_PREFIX = "[app-error]";

/**
 * Single funnel for client-side error logging.
 *
 * - Development: full normalized detail (kind, status, code, errorId, error).
 * - Production: one short line carrying only kind + correlation id, matching
 *   the "generic error bodies only" rule — no user message or payload leaks.
 *
 * Never throws, works on the server, safe to call repeatedly.
 */
export function reportClientError(
  scope: string,
  error: unknown,
  extra: Record<string, unknown> = {},
): AppError {
  const normalized = asAppError(error);
  const details = {
    scope,
    kind: normalized.kind,
    status: normalized.status,
    code: normalized.code,
    errorId: normalized.errorId,
    path: normalized.path,
    retryable: normalized.retryable,
    ...extra,
  };

  try {
    if (process.env.NODE_ENV === "production") {
      console.warn(`${ERROR_LOG_PREFIX} ${scope} failed`, {
        kind: normalized.kind,
        errorId: normalized.errorId,
      });
    } else {
      console.error(`${ERROR_LOG_PREFIX} ${scope}`, details, normalized.original ?? normalized);
    }
  } catch {
    // Logging must never become the source of a second failure.
  }

  return normalized;
}
