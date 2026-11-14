import type { IncomingMessage } from "node:http";
import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

export class PayloadTooLargeError extends Error {
  readonly code = "PAYLOAD_TOO_LARGE";
  constructor(public readonly maxBytes: number) {
    super(`Request body exceeds ${maxBytes} bytes`);
    this.name = "PayloadTooLargeError";
  }
}

/**
 * Stream the request body into a buffer with a hard byte ceiling.
 * Chunks are accumulated only up to `maxBytes` (PROFILE_IMAGE_INPUT_MAX_BYTES).
 */
export async function readBoundedRequestBody(
  req: IncomingMessage,
  maxBytes: number,
): Promise<Buffer> {
  const chunks: Buffer[] = [];
  let total = 0;

  const limiter = new Transform({
    transform(chunk: Buffer, _enc, cb) {
      total += chunk.length;
      if (total > maxBytes) {
        cb(new PayloadTooLargeError(maxBytes));
        return;
      }
      chunks.push(chunk);
      cb();
    },
  });

  await pipeline(req, limiter);
  if (total === 0) return Buffer.alloc(0);
  return Buffer.concat(chunks, total);
}