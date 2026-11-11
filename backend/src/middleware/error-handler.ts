import type { NextFunction, Request, Response } from "express";
import { randomUUID } from "node:crypto";
import { logger } from "../lib/logger.js";

/**
 * Error handling — security policy (2026-09-25)
 *
 * Rule: an error response to the client NEVER contains a stack trace, a
 * database/PostgREST message, a file path, an upstream provider payload, or any
 * other internal detail.
 */

/** Response header carrying the correlation id, for support + log lookup. */
export const ERROR_ID_HEADER = "x-error-id";

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

export function logServerError(err: unknown, errorId: string, context: string): void {
  const detail = err instanceof Error ? (err.stack ?? err.message) : err;
  logger.error(`[error ${errorId}] ${context}`, { detail });
}

export function serverError(
  res: Response,
  err: unknown,
  context?: string,
  publicMessage = "Internal server error",
): void {
  const errorId = newErrorId();
  logServerError(err, errorId, describeContext(res, context));

  if (res.headersSent) return;

  res.setHeader(ERROR_ID_HEADER, errorId);
  res.status(500).json({ error: publicMessage, errorId });
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
    respondKnownError(res, err.status, {
      error: err.message,
      ...(err.code ? { code: err.code } : {}),
    });
    return;
  }

  if (isSharedAppError(err)) {
    respondKnownError(res, err.statusCode, {
      error: err.message,
      code: err.code,
      ...(err.details !== undefined ? { details: err.details } : {}),
    });
    return;
  }

  const errorId = newErrorId();
  const status = (err as { status?: number })?.status;
  logServerError(err, errorId, `${req.method} ${req.originalUrl ?? req.url}`);

  res.setHeader(ERROR_ID_HEADER, errorId);
  if (typeof status === "number" && status >= 400 && status < 500) {
    respondKnownError(res, status, { error: "Bad request", errorId });
    return;
  }
  respondKnownError(res, 500, { error: "Internal server error", errorId });
}
