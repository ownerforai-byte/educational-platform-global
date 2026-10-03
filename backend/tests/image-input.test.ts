import { describe, expect, test } from "vitest";

import {
  MAX_CHAT_IMAGES,
  MAX_IMAGE_BYTES,
  imageInstruction,
  parseDataUrl,
  sanitizeChatImages,
  toOpenAIContent,
} from "../src/ai/image-input";

/**
 * Contract suite for photo (camera / gallery) chat input. Pins:
 *
 *  1. data-URL parsing — image mime types only, junk rejected;
 *  2. the request-body guard — count cap, per-image size cap, never throws;
 *  3. provider mapping — OpenAI-compatible parts (Agnes);
 *  4. the prompt instruction — read the photo, never invent its content,
 *     keep the 150-word floor.
 */

/** A data URL whose base64 payload decodes to approximately `bytes`. */
function makeImage(bytes: number, mime = "image/png"): string {
  return `data:${mime};base64,${"A".repeat(Math.ceil((bytes * 4) / 3))}`;
}

const SMALL = makeImage(1024);

describe("parseDataUrl", () => {
  test("accepts real image data URLs (case-insensitive mime)", () => {
    expect(parseDataUrl(SMALL)?.mimeType).toBe("image/png");
    expect(parseDataUrl(makeImage(64, "image/jpeg"))?.mimeType).toBe("image/jpeg");
    expect(parseDataUrl(makeImage(64, "image/webp"))?.mimeType).toBe("image/webp");
    expect(parseDataUrl(SMALL)?.data.startsWith("AAAA")).toBe(true);
  });

  test("rejects non-image and non-data inputs", () => {
    expect(parseDataUrl("https://example.com/x.png")).toBeNull();
    expect(parseDataUrl("data:text/plain;base64,SGVsbG8=")).toBeNull();
    expect(parseDataUrl("data:image/svg+xml;base64,PHN2Zz4=")).toBeNull();
    expect(parseDataUrl("data:image/png,notbase64")).toBeNull();
    expect(parseDataUrl(undefined)).toBeNull();
    expect(parseDataUrl(42)).toBeNull();
  });

  test("tolerates whitespace inside the payload (copied/pasted data URLs)", () => {
    const spaced = `data:image/png;base64,${"A".repeat(100).replace(/(.{20})/g, "$1\n")}`;
    expect(parseDataUrl(spaced)?.data).toBe("A".repeat(100));
  });
});

describe("sanitizeChatImages", () => {
  test("keeps valid images and caps the count", () => {
    const five = Array.from({ length: 5 }, () => SMALL);
    const out = sanitizeChatImages(five);
    expect(out.images).toHaveLength(MAX_CHAT_IMAGES);
    expect(out.rejected).toBe(2);
  });

  test("drops invalid and oversized entries without throwing", () => {
    const oversized = makeImage(MAX_IMAGE_BYTES + 1024 * 1024);
    const out = sanitizeChatImages([SMALL, "nonsense", oversized, null, { url: SMALL }]);
    expect(out.images).toHaveLength(1);
    expect(out.rejected).toBe(4);
  });

  test("non-array or empty input yields no images", () => {
    expect(sanitizeChatImages(undefined)).toEqual({ images: [], rejected: 0 });
    expect(sanitizeChatImages("data:image/png;base64,AAAA")).toEqual({ images: [], rejected: 0 });
    expect(sanitizeChatImages([])).toEqual({ images: [], rejected: 0 });
  });
});

describe("provider mapping", () => {
  test("text-only messages keep the plain string content (no behavior change)", () => {
    expect(toOpenAIContent("hello", undefined)).toBe("hello");
    expect(toOpenAIContent("hello", [])).toBe("hello");
    // Invalid images are ignored, so the message stays a simple string.
    expect(toOpenAIContent("hello", ["not-an-image"])).toBe("hello");
  });

  test("image messages become OpenAI-compatible text + image_url parts", () => {
    const content = toOpenAIContent("solve this", [SMALL, makeImage(64, "image/jpeg")]);
    expect(Array.isArray(content)).toBe(true);
    const parts = content as Array<{ type: string; text?: string; image_url?: { url: string } }>;
    expect(parts[0]).toMatchObject({ type: "text", text: "solve this" });
    expect(parts[1].type).toBe("image_url");
    expect(parts[1].image_url?.url).toBe(SMALL);
    expect(parts).toHaveLength(3);
  });

  test("image with empty text gets a placeholder text part", () => {
    const parts = toOpenAIContent("", [SMALL]) as Array<{ type: string; text?: string }>;
    expect(parts[0].type).toBe("text");
    expect(parts[0].text?.length).toBeGreaterThan(0);
  });
});

describe("imageInstruction", () => {
  test("demands reading the photo, forbids invention, keeps the floor", () => {
    const text = imageInstruction(2);
    expect(text).toContain("2 photos");
    expect(text).toContain("NEVER invent");
    expect(text).toContain("150-word minimum");
    expect(imageInstruction(1)).toContain("1 photo.");
  });
});
