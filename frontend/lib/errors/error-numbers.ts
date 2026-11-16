/**
 * Public error type numbers — stable catalog, safe to show users.
 * Keep in sync with backend/src/lib/error-numbers.ts.
 */
export const ErrorNumbers = {
  UNKNOWN: 1000,
  NETWORK: 1001,
  TIMEOUT: 1002,
  UNAUTHORIZED: 2101,
  FORBIDDEN: 2102,
  NOT_FOUND: 2103,
  RATE_LIMIT: 2104,
  CONFLICT: 2105,
  VALIDATION: 3001,
  INTERNAL: 5000,
  BAD_GATEWAY: 5020,
  SERVICE_UNAVAILABLE: 5030,
  GATEWAY_TIMEOUT: 5040,
  COMMUNITY_FEED: 5100,
  COMMUNITY_AI: 5101,
  COMMUNITY_BOT: 5102,
  PROFILE: 5200,
  AI_CHAT: 5300,
  STORAGE: 5400,
} as const;

export type ErrorNumber = (typeof ErrorNumbers)[keyof typeof ErrorNumbers];

const CODE_TO_NUMBER: Record<string, ErrorNumber> = {
  UNAUTHENTICATED: ErrorNumbers.UNAUTHORIZED,
  FORBIDDEN: ErrorNumbers.FORBIDDEN,
  NOT_FOUND: ErrorNumbers.NOT_FOUND,
  RATE_LIMITED: ErrorNumbers.RATE_LIMIT,
  VALIDATION_ERROR: ErrorNumbers.VALIDATION,
  service_unreachable: ErrorNumbers.SERVICE_UNAVAILABLE,
};

export function resolveClientErrorNumber(input: {
  status?: number;
  code?: string;
  message?: string;
}): ErrorNumber {
  if (input.code && CODE_TO_NUMBER[input.code]) return CODE_TO_NUMBER[input.code];
  const message = (input.message ?? "").toLowerCase();
  if (message.includes("service_unreachable") || message.includes("failed to fetch")) {
    return ErrorNumbers.NETWORK;
  }
  if (message.includes("timeout") || message.includes("timed out")) {
    return ErrorNumbers.TIMEOUT;
  }
  const status = input.status;
  if (status === 401) return ErrorNumbers.UNAUTHORIZED;
  if (status === 403) return ErrorNumbers.FORBIDDEN;
  if (status === 404) return ErrorNumbers.NOT_FOUND;
  if (status === 409) return ErrorNumbers.CONFLICT;
  if (status === 429) return ErrorNumbers.RATE_LIMIT;
  if (status === 502) return ErrorNumbers.BAD_GATEWAY;
  if (status === 503) return ErrorNumbers.SERVICE_UNAVAILABLE;
  if (status === 504) return ErrorNumbers.GATEWAY_TIMEOUT;
  if (status === 0) return ErrorNumbers.NETWORK;
  if (typeof status === "number" && status >= 500) return ErrorNumbers.INTERNAL;
  return ErrorNumbers.UNKNOWN;
}

export function formatPublicErrorRef(errorNo: number, errorId?: string): string {
  const suffix = errorId?.replace(/-/g, "").slice(0, 4).toUpperCase();
  return suffix ? `${errorNo}-${suffix}` : String(errorNo);
}