import type { Request, Response, NextFunction } from "express";
import {
  COMMUNITY_ATTACHMENT_MAX_BYTES,
  UPLOAD_FILENAME_HEADER,
} from "../storage/binary-upload-policy.js";
import { PayloadTooLargeError, readBoundedRequestBody } from "./bounded-body.js";

export interface CommunityAttachmentUpload {
  filename: string;
  contentType: string;
  buffer: Buffer;
}

export type RequestWithCommunityAttachment = Request & {
  communityAttachmentUpload?: CommunityAttachmentUpload;
};

function headerOne(req: Request, name: string): string {
  const raw = req.headers[name];
  if (typeof raw === "string") return raw.trim();
  if (Array.isArray(raw) && raw[0]) return raw[0].trim();
  return "";
}

/**
 * JSON base64 uploads use express.json(); raw uploads stream the file body here.
 */
export function ingestCommunityAttachment(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const contentType = headerOne(req, "content-type").split(";")[0]?.trim().toLowerCase() ?? "";
  if (contentType === "application/json" || contentType.endsWith("+json")) {
    next();
    return;
  }
  if (!contentType) {
    res.status(415).json({ error: "Content-Type is required for file uploads." });
    return;
  }
  const filenameRaw = headerOne(req, UPLOAD_FILENAME_HEADER);
  if (!filenameRaw) {
    res.status(400).json({
      error: `Missing ${UPLOAD_FILENAME_HEADER} header with the original filename.`,
    });
    return;
  }
  let filename = filenameRaw;
  try {
    filename = decodeURIComponent(filenameRaw);
  } catch {
    filename = filenameRaw;
  }
  void readBoundedRequestBody(req, COMMUNITY_ATTACHMENT_MAX_BYTES)
    .then((buffer) => {
      (req as RequestWithCommunityAttachment).communityAttachmentUpload = {
        filename,
        contentType,
        buffer,
      };
      next();
    })
    .catch((err: unknown) => {
      if (err instanceof PayloadTooLargeError) {
        res.status(413).json({ error: "Each file must be 3 MB or smaller" });
        return;
      }
      res.status(400).json({ error: "Invalid file payload" });
    });
}