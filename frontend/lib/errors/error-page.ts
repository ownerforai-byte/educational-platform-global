import {
  getErrorStatus,
  isNetworkError,
  isTimeoutError,
} from "@/lib/errors/app-error";

/** Every error experience that has its own curated, directly renderable page. */
export const ERROR_PAGE_VARIANTS = [
  "400",
  "401",
  "403",
  "404",
  "408",
  "429",
  "500",
  "502",
  "503",
  "504",
  "network",
  "offline",
] as const;

export type ErrorPageVariant = (typeof ERROR_PAGE_VARIANTS)[number];

export type ErrorPageIcon =
  | "alert"
  | "lock"
  | "shield"
  | "search"
  | "clock"
  | "rate-limit"
  | "server"
  | "gateway"
  | "maintenance"
  | "hourglass"
  | "network"
  | "offline";

export type ErrorPageTreatment =
  | "amber"
  | "indigo"
  | "rose"
  | "violet"
  | "orange"
  | "yellow"
  | "red"
  | "cyan"
  | "teal"
  | "blue"
  | "sky"
  | "slate";

export type ErrorPageAction = "retry" | "login" | "home" | "back" | "plans";

export interface ErrorPageDefinition {
  /** Big watermark number — the only technical reference left on screen. */
  readonly displayCode: string;
  /** One short sentence: what happened. */
  readonly title: string;
  /** One short instruction: what to do about it. */
  readonly hint: string;
  readonly icon: ErrorPageIcon;
  readonly treatment: ErrorPageTreatment;
  readonly primaryAction: ErrorPageAction;
  readonly primaryLabel: string;
  readonly secondaryAction?: Exclude<ErrorPageAction, "retry" | "login">;
  readonly secondaryLabel?: string;
}

/**
 * Safe learner-facing content only, and deliberately SHORT (owner 2026-11-11:
 * "on every error page just show like; check internet connection, plan, refresh
 * the page and remove all those description … remove all confidential info").
 *
 * So each variant is exactly one sentence of what happened plus one sentence of
 * what to do. No HTTP status prose, no internal error digest, no explanation of
 * which service talked to which — nothing a student cannot act on.
 *
 * Raw thrown messages still never belong here: production RSC errors may carry
 * only a generic message and a digest.
 */
export const ERROR_PAGE_REGISTRY = {
  "400": {
    displayCode: "400",
    title: "That link did not work",
    hint: "Go back and open the page again.",
    icon: "alert",
    treatment: "amber",
    primaryAction: "back",
    primaryLabel: "Go back",
    secondaryAction: "home",
    secondaryLabel: "Go home",
  },
  "401": {
    displayCode: "401",
    title: "Sign in again",
    hint: "Your session ended. Sign in to continue.",
    icon: "lock",
    treatment: "indigo",
    primaryAction: "login",
    primaryLabel: "Sign in",
    secondaryAction: "home",
    secondaryLabel: "Go home",
  },
  "403": {
    displayCode: "403",
    title: "Your plan does not include this",
    hint: "Check the plans, or go home.",
    icon: "shield",
    treatment: "rose",
    primaryAction: "plans",
    primaryLabel: "See plans",
    secondaryAction: "home",
    secondaryLabel: "Go home",
  },
  "404": {
    displayCode: "404",
    title: "Page not found",
    hint: "Check the address, or go home.",
    icon: "search",
    treatment: "violet",
    primaryAction: "home",
    primaryLabel: "Go home",
    secondaryAction: "back",
    secondaryLabel: "Go back",
  },
  "408": {
    displayCode: "408",
    title: "The page took too long",
    hint: "Refresh the page.",
    icon: "clock",
    treatment: "orange",
    primaryAction: "retry",
    primaryLabel: "Refresh",
    secondaryAction: "home",
    secondaryLabel: "Go home",
  },
  "429": {
    displayCode: "429",
    title: "Too many requests",
    hint: "Wait a moment, then refresh the page.",
    icon: "rate-limit",
    treatment: "yellow",
    primaryAction: "retry",
    primaryLabel: "Refresh",
    secondaryAction: "home",
    secondaryLabel: "Go home",
  },
  "500": {
    displayCode: "500",
    title: "Something broke",
    hint: "Refresh the page.",
    icon: "server",
    treatment: "red",
    primaryAction: "retry",
    primaryLabel: "Refresh",
    secondaryAction: "home",
    secondaryLabel: "Go home",
  },
  "502": {
    displayCode: "502",
    title: "Connection stumbled",
    hint: "Check your internet connection, then refresh the page.",
    icon: "gateway",
    treatment: "cyan",
    primaryAction: "retry",
    primaryLabel: "Refresh",
    secondaryAction: "home",
    secondaryLabel: "Go home",
  },
  "503": {
    displayCode: "503",
    title: "The platform is starting",
    hint: "Wait a few seconds, then refresh the page.",
    icon: "maintenance",
    treatment: "teal",
    primaryAction: "retry",
    primaryLabel: "Refresh",
    secondaryAction: "home",
    secondaryLabel: "Go home",
  },
  "504": {
    displayCode: "504",
    title: "The server timed out",
    hint: "Refresh the page.",
    icon: "hourglass",
    treatment: "blue",
    primaryAction: "retry",
    primaryLabel: "Refresh",
    secondaryAction: "home",
    secondaryLabel: "Go home",
  },
  network: {
    displayCode: "NET",
    title: "Cannot reach the platform",
    hint: "Check your internet connection, then refresh the page.",
    icon: "network",
    treatment: "sky",
    primaryAction: "retry",
    primaryLabel: "Refresh",
    secondaryAction: "home",
    secondaryLabel: "Go home",
  },
  offline: {
    displayCode: "OFF",
    title: "You're offline",
    hint: "Check your internet connection, then refresh the page.",
    icon: "offline",
    treatment: "slate",
    primaryAction: "retry",
    primaryLabel: "Refresh",
    secondaryAction: "home",
    secondaryLabel: "Go home",
  },
} as const satisfies Record<ErrorPageVariant, ErrorPageDefinition>;

export interface ResolveErrorPageOptions {
  /** Browser connectivity. Only an explicit false proves the offline case. */
  isOnline?: boolean;
  /** Used by direct static pages when no thrown error is supplied. */
  fallback?: ErrorPageVariant;
}

function variantForStatus(status: number | undefined): ErrorPageVariant | undefined {
  switch (status) {
    case 400:
    case 401:
    case 403:
    case 404:
    case 408:
    case 429:
    case 500:
    case 502:
    case 503:
    case 504:
      return String(status) as ErrorPageVariant;
    default:
      return undefined;
  }
}

/**
 * Resolve in deliberate precedence order. In particular, never relabel a real
 * HTTP response as offline, and do not infer a status hidden by production RSC.
 */
export function resolveErrorPageVariant(
  error?: unknown,
  options: ResolveErrorPageOptions = {},
): ErrorPageVariant {
  if (options.isOnline === false) return "offline";

  const statusVariant = variantForStatus(getErrorStatus(error));
  if (statusVariant) return statusVariant;
  if (isTimeoutError(error)) return "408";
  if (isNetworkError(error)) return "network";
  if (error !== undefined && error !== null) return "500";
  return options.fallback ?? "500";
}
