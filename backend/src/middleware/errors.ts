import type { NextFunction, Request, Response } from "express";
import { randomUUID } from "node:crypto";

/**
 * Error handling — security policy (2026-09-25)
 *
 * Rule: an error response to the client NEVER contains a stack trace, a
 * database/PostgREST message, a file path, an upstream provider payload, or any
 * other internal detail. The client gets a generic message plus a correlation
 * id; the full error goes to the server log tagged with that same id, so an
 * operator can join the two without exposing anything.
 *
 * Route handlers therefore must not write `{ error: err.message }` directly —
 * use `serverError(res, err)` for unexpected failures, or `AppError` for a
 * failure the user is allowed to see.
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

/** Human-readable "where" for the log line: explicit context, else the route. */
function describeContext(res: Response, context?: string): string {
  if (context) return context;
  const req = res.req as Request | undefined;
  if (!req) return "unknown";
  const route = req.route?.path
    ? `${req.baseUrl ?? ""}${req.route.path}`
    : (req.originalUrl ?? req.url ?? "unknown");
  return `${req.method ?? "?"} ${route}`;
}

/**
 * Full-detail server-side log. `err` is only ever written to the process log
 * (stdout/stderr), never serialized into a response.
 */
export function logServerError(err: unknown, errorId: string, context: string): void {
  const detail = err instanceof Error ? (err.stack ?? err.message) : err;
  console.error(`[error ${errorId}] ${context} →`, detail);
}

/**
 * Respond 500 without leaking internals: generic message + correlation id.
 *
 *   } catch (err) {
 *     serverError(res, err);
 *   }
 */
export function serverError(
  res: Response,
  err: unknown,
  context?: string,
  publicMessage = "Internal server error",
): void {
  const errorId = newErrorId();
  logServerError(err, errorId, describeContext(res, context));

  // A streaming (SSE) response may already have sent headers — the caller owns
  // that stream and must sanitize its own payload.
  if (res.headersSent) return;

  res.setHeader(ERROR_ID_HEADER, errorId);
  res.status(500).json({ error: publicMessage, errorId });
}

/** 404 fallback: never echo the requested path back (reflection hygiene). */
export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({ error: "Not found" });
}

/**
 * Express terminal error handler. Catches anything a route threw or passed to
 * `next(err)` — including async handlers that forward their failures — and
 * applies the same "generic out, detailed in" rule.
 *
 * Must keep the 4-argument signature or Express treats it as normal middleware.
 */
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
    res.status(err.status).json({
      error: err.message,
      ...(err.code ? { code: err.code } : {}),
    });
    return;
  }

  const errorId = newErrorId();
  const status = (err as { status?: number })?.status;
  logServerError(err, errorId, `${req.method} ${req.originalUrl ?? req.url}`);

  res.setHeader(ERROR_ID_HEADER, errorId);
  // Only a client-error status is echoed; everything else is a flat 500 so we
  // never surface an upstream status code (provider/gateway internals).
  if (typeof status === "number" && status >= 400 && status < 500) {
    res.status(status).json({ error: "Bad request", errorId });
    return;
  }
  res.status(500).json({ error: "Internal server error", errorId });
}
