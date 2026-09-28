/**
 * lib/validation/guards.ts — ADD-ONLY runtime validation layer.
 *
 * Pure, dependency-free predicates and coercions used by the additive
 * perf/caching layer and available to any existing call site. Nothing here
 * mutates or replaces current validation; the guards simply give new code a
 * typed, fail-safe way to touch untyped JSON (API bodies, `/public/data`
 * payloads, search params).
 */

/** `kebab-case` / `snake_case` slug accepted by every content route. */
export const SLUG_PATTERN = /^[a-z0-9]+(?:[-_][a-z0-9]+)*$/;

/** RFC-4122 UUID (v1–v5). */
export const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** ISO-8601 timestamp, e.g. `2026-09-27T10:15:30.000Z`. */
export const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?$/;

/** Deliberately simple email shape check (server is the real authority). */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** True for non-null, non-array objects. */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** True for arrays (including empty ones). */
export function isPlainArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

/** True for a string containing at least one non-whitespace character. */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/** True for a value accepted by {@link SLUG_PATTERN} (max 120 chars). */
export function isSlug(value: unknown): value is string {
  return typeof value === "string" && value.length <= 120 && SLUG_PATTERN.test(value);
}

/** True for a UUID string. */
export function isUuid(value: unknown): value is string {
  return typeof value === "string" && UUID_PATTERN.test(value);
}

/** True for a finite number (rejects `NaN` and `Infinity`). */
export function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

/** True for an integer >= 0. */
export function isNonNegativeInteger(value: unknown): value is number {
  return isFiniteNumber(value) && Number.isInteger(value) && value >= 0;
}

/** True for a strict boolean. */
export function isBoolean(value: unknown): value is boolean {
  return value === true || value === false;
}

/** True for a parseable ISO-8601 date string. */
export function isIsoDateString(value: unknown): value is string {
  return (
    typeof value === "string" &&
    ISO_DATE_PATTERN.test(value) &&
    !Number.isNaN(Date.parse(value))
  );
}

/**
 * True for a relative path that is safe to hand to `fetch`/`loadData`:
 * no backslashes, no `..` traversal, no protocol, no control characters.
 */
export function isSafeRelativePath(value: unknown): value is string {
  if (typeof value !== "string" || value.length === 0 || value.length > 2048) return false;
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001f\u007f]/.test(value)) return false;
  if (value.includes("\\")) return false;
  if (value.includes("://")) return false;
  return !value.split("/").some((segment) => segment === "..");
}

/** Email-shape check (client-side pre-validation only). */
export function isEmail(value: unknown): value is string {
  return typeof value === "string" && value.length <= 254 && EMAIL_PATTERN.test(value);
}

/** Literal-union narrowing helper: `if (oneOf(x, ["a","b"])) { … }`. */
export function oneOf<const T extends readonly string[]>(
  value: unknown,
  allowed: T,
): value is T[number] {
  return typeof value === "string" && (allowed as readonly string[]).includes(value);
}

/* ------------------------------------------------------------------ *
 * Coercions — total functions used when reading untrusted JSON.
 * ------------------------------------------------------------------ */

/** Always returns an array; wraps a single value, drops `null`/`undefined`. */
export function asArray<T = unknown>(value: unknown): T[] {
  if (value === null || value === undefined) return [];
  if (Array.isArray(value)) return value as T[];
  return [value as T];
}

/** Always returns a record; returns `{}` for anything else. */
export function asRecord(value: unknown): Record<string, unknown> {
  return isRecord(value) ? value : {};
}

/** Always returns a string; uses `fallback` for non-strings/blank strings. */
export function asString(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return fallback;
}

/** Returns a trimmed, non-empty string or `undefined`. */
export function asOptionalString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

/** Always returns a finite number; uses `fallback` for anything unusable. */
export function asNumber(value: unknown, fallback = 0): number {
  if (isFiniteNumber(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

/** Accepts `true`/`false`, `"true"`/`"false"` and `1`/`0`. */
export function asBoolean(value: unknown, fallback = false): boolean {
  if (isBoolean(value)) return value;
  if (value === 1 || value === "1" || value === "true") return true;
  if (value === 0 || value === "0" || value === "false") return false;
  return fallback;
}

/** Clamps a number into `[min, max]`, returning `min` for non-numbers. */
export function clampNumber(value: unknown, min: number, max: number): number {
  const numeric = asNumber(value, min);
  if (numeric < min) return min;
  if (numeric > max) return max;
  return numeric;
}

/** Picks only the listed keys that are present; never returns `undefined` keys. */
export function pickDefined<T extends object, K extends keyof T>(
  source: T | null | undefined,
  keys: readonly K[],
): Partial<Pick<T, K>> {
  const out: Partial<Pick<T, K>> = {};
  if (!source) return out;
  for (const key of keys) {
    const value = source[key];
    if (value !== undefined) out[key] = value;
  }
  return out;
}

/**
 * Strips control characters and clamps length — used before placing untrusted
 * text into a query string or a log line.
 */
export function sanitizeSearchTerm(term: unknown, maxLength = 200): string {
  if (typeof term !== "string") return "";
  const cleaned = term
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned.length > maxLength ? cleaned.slice(0, maxLength) : cleaned;
}

/* ------------------------------------------------------------------ *
 * Fail-fast requirements — for call sites that cannot continue without
 * a valid value (route params, cache keys). Messages are generic and
 * carry no user data, matching the "generic error bodies only" rule.
 * ------------------------------------------------------------------ */

/** Thrown (or returned by the `require*` helpers) when input is invalid. */
export class ValidationError extends Error {
  readonly field: string;

  constructor(field: string, message: string) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

/** Returns the trimmed string or throws {@link ValidationError}. */
export function requireNonEmptyString(value: unknown, field = "value"): string {
  if (!isNonEmptyString(value)) {
    throw new ValidationError(field, `${field} must be a non-empty string`);
  }
  return value.trim();
}

/** Returns the slug or throws {@link ValidationError}. */
export function requireSlug(value: unknown, field = "slug"): string {
  if (!isSlug(value)) {
    throw new ValidationError(field, `${field} must be a lowercase slug`);
  }
  return value;
}

/** Returns the safe relative path or throws {@link ValidationError}. */
export function requireSafeRelativePath(value: unknown, field = "path"): string {
  if (!isSafeRelativePath(value)) {
    throw new ValidationError(field, `${field} must be a safe relative path`);
  }
  return value;
}

/**
 * Exhaustiveness check for `switch` statements over union types: the compiler
 * errors if a case is missing, and this throws only if a bad value escapes at
 * runtime (e.g. from an untyped API payload).
 */
export function assertNever(value: never, label = "value"): never {
  throw new ValidationError(label, `${label} has an unexpected variant`);
}
