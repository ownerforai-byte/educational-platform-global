import type { NextFunction, Request, Response } from "express";
import { logger } from "../lib/logger.js";
import { getRequestId } from "./request-id.js";

/**
 * Structured request log (method, path, status, duration, requestId).
 * Replaces morgan — single JSON line per request.
 */
export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();

  res.on("finish", () => {
    logger.info("HTTP request", {
      method: req.method,
      path: req.originalUrl ?? req.url,
      status: res.statusCode,
      durationMs: Date.now() - start,
      requestId: getRequestId(res),
    });
  });

  next();
}
