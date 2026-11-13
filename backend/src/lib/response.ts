import type { Response } from "express";

export interface ApiResponseEnvelope<T = unknown> {
  ok: boolean;
  data?: T;
  /**
   * Legacy clients read `error` as a string. Envelope-aware clients may also
   * see structured fields via `code` / `details` siblings (additive).
   */
  error?: string | {
    message: string;
    code?: string;
    details?: unknown;
  };
  message?: string;
  code?: string;
  details?: unknown;
  meta?: Record<string, unknown>;
}

export function sendSuccess<T>(
  res: Response,
  data: T,
  statusCode = 200,
  meta?: Record<string, unknown>,
): Response {
  const body: ApiResponseEnvelope<T> = {
    ok: true,
    data,
    ...(meta ? { meta } : {}),
  };
  return res.status(statusCode).json(body);
}

/**
 * Failure envelope — additive for legacy clients:
 * `{ ok: false, error: "<string>", message, code?, details? }`.
 */
export function sendError(
  res: Response,
  message: string,
  statusCode = 500,
  code?: string,
  details?: unknown,
): Response {
  const body: ApiResponseEnvelope = {
    ok: false,
    error: message,
    message,
    ...(code ? { code } : {}),
    ...(details !== undefined ? { details } : {}),
  };
  return res.status(statusCode).json(body);
}

export function sendPaginated<T>(
  res: Response,
  items: T[],
  total: number,
  page: number,
  pageSize: number,
): Response {
  return sendSuccess(res, items, 200, {
    total,
    page,
    pageSize,
    hasMore: page * pageSize < total,
  });
}
