import type { NextFunction, Request, Response } from "express";
import { logger } from "../lib/logger.js";

/**
 * Structured request log (method, path, status, duration). Complements morgan
 * with JSON-friendly fields for production log aggregation.
 */
export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();

  res.on("finish", () => {
    logger.info("HTTP request", {
      method: req.method,
      path: req.originalUrl ?? req.url,
      status: res.statusCode,
      durationMs: Date.now() - start,
    });
  });

  next();
}
