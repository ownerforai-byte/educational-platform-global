import type { NextFunction, Request, Response } from "express";
import { randomUUID } from "node:crypto";
import { logger } from "../lib/logger.js";
import { getRequestId } from "./request-id.js";
import { formatPublicErrorRef, resolveErrorNumber } from "../lib/error-numbers.js";

/**
 * Error handling — security policy (2026-09-25)
 *
 * Rule: an error response to the client NEVER contains a stack trace, a
 * database/PostgREST message, a file path, an upstream provider payload, or any
 * other internal detail.
 */

/** Response header carrying the correlation id, for support + log lookup. */
export const ERROR_ID_HEADER = "x-error-id";
/** Stable public error type number (catalog; pairs with errorId for a unique ref). */
export const ERROR_NO_HEADER = "x-error-no";

/**
 * An error that is safe to show the user verbatim (validation, "already
 * exists", …). Anything else is treated as internal and reported generically.
 */
export class AppError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status = 400, code?: string) {
    super(message);
    this.name = "AppError";
    this.status = status;
    this.code = code;
  }
}

/** Short, log-joinable correlation id (not a secret; safe to show a user). */
export function newErrorId(): string {
  return randomUUID().slice(0, 8);
}

function describeContext(res: Response, context?: string): string {
  if (context) return context;
  const req = res.req as Request | undefined;
  if (!req) return "unknown";
  const route = req.route?.path
    ? `${req.baseUrl ?? ""}${req.route.path}`
    : (req.originalUrl ?? req.url ?? "unknown");
  return `${req.method ?? "?"} ${route}`;
}

export function logServerError(
  err: unknown,
  errorId: string,
  context: string,
  errorNo?: number,
): void {
  const detail = err instanceof Error ? (err.stack ?? err.message) : err;
  const ref = errorNo != null ? formatPublicErrorRef(errorNo, errorId) : errorId;
  logger.error(`[error #${ref}] ${context}`, { detail, errorId, errorNo });
}

export function serverError(
  res: Response,
  err: unknown,
  context?: string,
  publicMessage = "Internal server error",
): void {
  const errorId = newErrorId();
  const errorNo = resolveErrorNumber({ context, status: 500 });
  logServerError(err, errorId, describeContext(res, context), errorNo);

  if (res.headersSent) return;

  res.setHeader(ERROR_ID_HEADER, errorId);
  res.setHeader(ERROR_NO_HEADER, String(errorNo));
  res.status(500).json({ error: publicMessage, errorId, errorNo });
}

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({ error: "Not found" });
}

/** Matches `@rn/shared` AppError subclasses without importing outside `rootDir`. */
interface SharedPackageError extends Error {
  statusCode: number;
  code: string;
  details?: unknown;
}

function isSharedAppError(err: unknown): err is SharedPackageError {
  return (
    err instanceof Error &&
    err.name !== "AppError" &&
    typeof (err as SharedPackageError).statusCode === "number" &&
    typeof (err as SharedPackageError).code === "string"
  );
}

function respondKnownError(res: Response, status: number, body: Record<string, unknown>): void {
  res.status(status).json(body);
}

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (err instanceof AppError) {
    const errorNo = resolveErrorNumber({ status: err.status, code: err.code });
    respondKnownError(res, err.status, {
      error: err.message,
      ...(err.code ? { code: err.code } : {}),
      errorNo,
    });
    return;
  }

  if (isSharedAppError(err)) {
    const errorNo = resolveErrorNumber({ status: err.statusCode, code: err.code });
    respondKnownError(res, err.statusCode, {
      error: err.message,
      code: err.code,
      errorNo,
      ...(err.details !== undefined ? { details: err.details } : {}),
    });
    return;
  }

  const errorId = newErrorId();
  const requestId = getRequestId(res);
  const status = (err as { status?: number })?.status;
  const errorNo = resolveErrorNumber({ status: typeof status === "number" ? status : 500 });
  logServerError(
    err,
    errorId,
    `${req.method} ${req.originalUrl ?? req.url}${requestId ? ` req=${requestId}` : ""}`,
    errorNo,
  );

  res.setHeader(ERROR_ID_HEADER, errorId);
  res.setHeader(ERROR_NO_HEADER, String(errorNo));
  if (typeof status === "number" && status >= 400 && status < 500) {
    respondKnownError(res, status, {
      error: "Something went wrong.",
      errorId,
      errorNo,
      ...(requestId ? { requestId } : {}),
    });
    return;
  }
  respondKnownError(res, 500, {
    error: "Something went wrong.",
    errorId,
    errorNo,
    ...(requestId ? { requestId } : {}),
  });
}
