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

export type ErrorPageAction = "retry" | "login" | "home" | "back";

export interface ErrorPageDefinition {
  readonly statusLabel: string;
  readonly displayCode: string;
  readonly title: string;
  readonly description: string;
  readonly detail: string;
  readonly icon: ErrorPageIcon;
  readonly treatment: ErrorPageTreatment;
  readonly primaryAction: ErrorPageAction;
  readonly primaryLabel: string;
  readonly secondaryAction?: Exclude<ErrorPageAction, "retry" | "login">;
  readonly secondaryLabel?: string;
}

/**
 * Safe learner-facing content only. Raw thrown messages never belong here:
 * production RSC errors may contain only a generic message and a digest.
 */
export const ERROR_PAGE_REGISTRY = {
  "400": {
    statusLabel: "HTTP 400 · BAD REQUEST",
    displayCode: "400",
    title: "That request needs a correction",
    description: "The address or request was not understood.",
    detail: "Check the link you used, go back to the previous page, or return home and try a different route.",
    icon: "alert",
    treatment: "amber",
    primaryAction: "back",
    primaryLabel: "Go back",
    secondaryAction: "home",
    secondaryLabel: "Go home",
  },
  "401": {
    statusLabel: "HTTP 401 · UNAUTHORIZED",
    displayCode: "401",
    title: "Sign in to continue",
    description: "Your account needs to be verified for this page.",
    detail: "Sign in with your usual account. If your session expired, signing in again will refresh it securely.",
    icon: "lock",
    treatment: "indigo",
    primaryAction: "login",
    primaryLabel: "Sign in",
    secondaryAction: "home",
    secondaryLabel: "Go home",
  },
  "403": {
    statusLabel: "HTTP 403 · FORBIDDEN",
    displayCode: "403",
    title: "This area is restricted",
    description: "Your current account does not have access here.",
    detail: "Return to an available section or go back. Account permissions will not be changed by retrying this page.",
    icon: "shield",
    treatment: "rose",
    primaryAction: "home",
    primaryLabel: "Go home",
    secondaryAction: "back",
    secondaryLabel: "Go back",
  },
  "404": {
    statusLabel: "HTTP 404 · NOT FOUND",
    displayCode: "404",
    title: "We cannot find that page",
    description: "The page may have moved, or the address may be incomplete.",
    detail: "Use the homepage to find your study section, or go back and check the link that brought you here.",
    icon: "search",
    treatment: "violet",
    primaryAction: "home",
    primaryLabel: "Go home",
    secondaryAction: "back",
    secondaryLabel: "Go back",
  },
  "408": {
    statusLabel: "HTTP 408 · REQUEST TIMEOUT",
    displayCode: "408",
    title: "The request took too long",
    description: "The connection did not finish in time.",
    detail: "Try again when your connection is steady. Your previous study activity and saved work are not affected.",
    icon: "clock",
    treatment: "orange",
    primaryAction: "retry",
    primaryLabel: "Try again",
    secondaryAction: "home",
    secondaryLabel: "Go home",
  },
  "429": {
    statusLabel: "HTTP 429 · TOO MANY REQUESTS",
    displayCode: "429",
    title: "A little too quickly",
    description: "The service received too many requests in a short period.",
    detail: "Pause for a moment before trying again. Repeated immediate retries may keep the temporary limit in place.",
    icon: "rate-limit",
    treatment: "yellow",
    primaryAction: "retry",
    primaryLabel: "Try again",
    secondaryAction: "home",
    secondaryLabel: "Go home",
  },
  "500": {
    statusLabel: "HTTP 500 · INTERNAL ERROR",
    displayCode: "500",
    title: "Something broke on our side",
    description: "The page could not finish rendering your request.",
    detail: "Try this section again or return home. Technical details stay in our logs rather than on this screen.",
    icon: "server",
    treatment: "red",
    primaryAction: "retry",
    primaryLabel: "Try again",
    secondaryAction: "home",
    secondaryLabel: "Go home",
  },
  "502": {
    statusLabel: "HTTP 502 · BAD GATEWAY",
    displayCode: "502",
    title: "The server connection stumbled",
    description: "One service received an invalid response from another.",
    detail: "This is usually temporary. Retry the page, or return home while the connection between services recovers.",
    icon: "gateway",
    treatment: "cyan",
    primaryAction: "retry",
    primaryLabel: "Try again",
    secondaryAction: "home",
    secondaryLabel: "Go home",
  },
  "503": {
    statusLabel: "HTTP 503 · SERVICE UNAVAILABLE",
    displayCode: "503",
    title: "The service is taking a break",
    description: "The platform is temporarily unavailable or starting up.",
    detail: "Wait briefly and try again. Cached pages may still be available from the sections you visited earlier.",
    icon: "maintenance",
    treatment: "teal",
    primaryAction: "retry",
    primaryLabel: "Try again",
    secondaryAction: "home",
    secondaryLabel: "Go home",
  },
  "504": {
    statusLabel: "HTTP 504 · GATEWAY TIMEOUT",
    displayCode: "504",
    title: "The upstream server timed out",
    description: "A service waited too long for another service to answer.",
    detail: "Try again in a moment. If the problem continues, return home and come back to this section later.",
    icon: "hourglass",
    treatment: "blue",
    primaryAction: "retry",
    primaryLabel: "Try again",
    secondaryAction: "home",
    secondaryLabel: "Go home",
  },
  network: {
    statusLabel: "CONNECTION · NETWORK FAILURE",
    displayCode: "NET",
    title: "We cannot reach the platform",
    description: "Your device appears online, but the request could not connect.",
    detail: "Check your connection, VPN, or DNS and retry. This is different from a confirmed server error or offline state.",
    icon: "network",
    treatment: "sky",
    primaryAction: "retry",
    primaryLabel: "Retry connection",
    secondaryAction: "home",
    secondaryLabel: "Go home",
  },
  offline: {
    statusLabel: "DEVICE · OFFLINE",
    displayCode: "OFF",
    title: "You're offline",
    description: "There is no internet connection right now.",
    detail: "Pages you visited before may still open from cache. Reconnect and reload to fetch the latest version.",
    icon: "offline",
    treatment: "slate",
    primaryAction: "retry",
    primaryLabel: "Reload page",
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
