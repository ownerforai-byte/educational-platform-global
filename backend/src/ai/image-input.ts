/**
 * IMAGE INPUT (camera / gallery) for the Veer chat.
 *
 * Students can attach a photo of a question, a diagram, a chart or a
 * hand-written derivation; the model must READ it and then teach the thing it
 * shows — never guess. This module holds the pure, provider-agnostic plumbing:
 *
 *   - validation/limits for incoming data URLs (size + count + mime type),
 *   - mapping to OpenAI-compatible content parts (Agnes),
 *   - mapping to Gemini inlineData parts,
 *   - the prompt instruction that turns a photo into a grounded answer.
 *
 * Kept separate from service.ts so the rules are unit-testable without any
 * network or provider fixtures.
 */

/** At most this many photos per message. */
export const MAX_CHAT_IMAGES = 3;
/** Per-image decoded-size ceiling (base64 is ~4/3 of the binary size). */
export const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
/** Total base64 payload ceiling across all images in one message. */
export const MAX_TOTAL_IMAGE_CHARS = 12 * 1024 * 1024;

const DATA_URL_RE = /^data:(image\/(?:png|jpe?g|webp|gif));base64,([A-Za-z0-9+/=\s]+)$/;

export interface ParsedImage {
  mimeType: string;
  /** base64 payload without the data-URL prefix. */
  data: string;
}

/** Parse a `data:image/...;base64,...` URL. null when it is not one. */
export function parseDataUrl(url: unknown): ParsedImage | null {
  if (typeof url !== "string") return null;
  const match = DATA_URL_RE.exec(url.trim());
  if (!match) return null;
  const data = match[2].replace(/\s+/g, "");
  if (!data) return null;
  return { mimeType: match[1].toLowerCase(), data };
}

/** Approximate decoded byte size of a base64 payload. */
function base64Bytes(data: string): number {
  return Math.floor((data.length * 3) / 4);
}

export interface SanitizeImagesResult {
  /** Valid data URLs, capped at MAX_CHAT_IMAGES. */
  images: string[];
  /** Count of inputs dropped for being invalid, oversized or excessive. */
  rejected: number;
}

/**
 * Validate and cap an untrusted `images` payload from the request body.
 * Never throws: invalid input simply yields fewer images (and a `rejected`
 * count the route can surface), so a bad photo can never break a chat.
 */
export function sanitizeChatImages(input: unknown): SanitizeImagesResult {
  if (!Array.isArray(input) || input.length === 0) return { images: [], rejected: 0 };

  let rejected = 0;
  let totalChars = 0;
  const images: string[] = [];

  for (const entry of input) {
    if (images.length >= MAX_CHAT_IMAGES) {
      rejected += 1;
      continue;
    }
    const parsed = parseDataUrl(entry);
    if (!parsed) {
      rejected += 1;
      continue;
    }
    if (base64Bytes(parsed.data) > MAX_IMAGE_BYTES) {
      rejected += 1;
      continue;
    }
    if (totalChars + parsed.data.length > MAX_TOTAL_IMAGE_CHARS) {
      rejected += 1;
      continue;
    }
    totalChars += parsed.data.length;
    images.push((entry as string).trim().replace(/\s+/g, ""));
  }

  return { images, rejected };
}

/** OpenAI-compatible content part. */
export interface OpenAITextPart {
  type: "text";
  text: string;
}
export interface OpenAIImagePart {
  type: "image_url";
  image_url: { url: string };
}

/**
 * Map a message's text + images to the OpenAI-compatible `content` shape used
 * by Agnes. Plain text stays a string so nothing changes for
 * the (overwhelmingly common) text-only case.
 */
export function toOpenAIContent(
  text: string,
  images: string[] | undefined,
): string | Array<OpenAITextPart | OpenAIImagePart> {
  const valid = (images ?? []).map((url) => parseDataUrl(url)).filter(Boolean) as ParsedImage[];
  if (!valid.length) return text;
  const parts: Array<OpenAITextPart | OpenAIImagePart> = [
    { type: "text", text: text.trim() || "(The student attached a photo — see the image.)" },
  ];
  for (let i = 0; i < valid.length; i++) {
    const original = (images ?? []).filter((url) => parseDataUrl(url))[i];
    parts.push({ type: "image_url", image_url: { url: original } });
  }
  return parts;
}

/** Gemini's inlineData part. */
export interface GeminiInlineDataPart {
  inlineData: { mimeType: string; data: string };
}

/** Map images to Gemini inlineData parts (malformed entries are skipped). */
export function toGeminiImageParts(images: string[] | undefined): GeminiInlineDataPart[] {
  return (images ?? [])
    .map((url) => parseDataUrl(url))
    .filter((p): p is ParsedImage => !!p)
    .slice(0, MAX_CHAT_IMAGES)
    .map((p) => ({ inlineData: { mimeType: p.mimeType, data: p.data } }));
}

/**
 * The prompt instruction appended whenever photos are attached. It forces the
 * anti-random behaviour on image questions: read the photo, identify the exact
 * problem, teach the syllabus core of whatever it shows, and admit an
 * unreadable photo instead of inventing content.
 */
export function imageInstruction(count: number): string {
  return [
    `[IMAGE INPUT] The student attached ${count} photo${count === 1 ? "" : "s"}.`,
    "Read the image(s) FIRST and work only from what is actually visible:",
    "1. identify precisely what is shown (question text, diagram, graph, apparatus, handwriting, textbook page);",
    "2. restate the problem in one line so the student knows you read it correctly;",
    "3. then teach it fully — the syllabus concept it belongs to, the mechanism or derivation, and the complete step-by-step solution with units where relevant;",
    "4. if any part is unreadable or ambiguous, say exactly which part and ask for a clearer photo — NEVER invent what cannot be read.",
    "The 150-word minimum and the syllabus-anchor rule apply to image answers exactly as to typed ones.",
  ].join(" ");
}
