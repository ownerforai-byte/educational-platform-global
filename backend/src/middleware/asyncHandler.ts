import type { NextFunction, Request, RequestHandler, Response } from "express";

/**
 * asyncHandler — the missing async-error bridge (Express 4).
 *
 * Express 4 does NOT catch a rejected promise returned by an async route
 * handler: the rejection becomes an unhandled rejection and the request hangs
 * (no response, no `errorHandler`). Wrapping every async handler here forwards
 * any rejection to `next(err)`, so `middleware/errors.ts#errorHandler` applies
 * the "generic out, detailed in" rule exactly as it does for sync throws.
 *
 * Usage:
 *   router.get("/", asyncHandler(async (req, res) => { ... }));
 *
 * A handler that already try/catches its own errors is safe to wrap too — the
 * wrapper only acts on a rejection that escapes the handler.
 */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>,
): RequestHandler {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export default asyncHandler;
