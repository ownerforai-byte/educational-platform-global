import { randomUUID } from "node:crypto";
import type { NextFunction, Request, Response } from "express";

export const REQUEST_ID_HEADER = "x-request-id";

/**
 * Accept an inbound `x-request-id` or mint one; expose on `res.locals.requestId`
 * and echo back on the response for client correlation.
 */
export function requestId(req: Request, res: Response, next: NextFunction): void {
  const incoming = req.header(REQUEST_ID_HEADER)?.trim();
  const id =
    incoming && incoming.length > 0 && incoming.length <= 128
      ? incoming
      : randomUUID();
  res.locals.requestId = id;
  res.setHeader(REQUEST_ID_HEADER, id);
  next();
}

export function getRequestId(res: Response): string | undefined {
  const value = res.locals?.requestId;
  return typeof value === "string" ? value : undefined;
}
