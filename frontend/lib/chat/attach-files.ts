/**
 * Pure helpers for the single attach menu: classify a picked file and turn
 * text-like documents into a fenced context block. No Node builtins: this file
 * is imported by "use client" components.
 */

export type AttachKind = "image" | "text" | "unsupported";

export const MAX_TEXT_FILE_BYTES = 200_000;
export const MAX_TEXT_CHARS = 12_000;

const TEXT_EXTENSIONS = new Set(["txt", "md", "markdown", "csv", "tsv", "json", "log", "xml", "yml", "yaml"]);
const TEXT_MIME = new Set(["application/json", "text/csv", "application/xml"]);

function extensionOf(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot < 0 ? "" : name.slice(dot + 1).toLowerCase();
}

export function classifyAttachment(file: { name: string; type: string }): AttachKind {
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("text/") || TEXT_MIME.has(file.type)) return "text";
  if (TEXT_EXTENSIONS.has(extensionOf(file.name))) return "text";
  return "unsupported";
}

/** Human error for a file the chat cannot read, or null when it is fine. */
export function attachmentError(file: { name: string; type: string; size: number }): string | null {
  const kind = classifyAttachment(file);
  if (kind === "unsupported") {
    return `"${file.name}" can't be read here. Attach a photo, or a .txt, .md, .csv or .json file. For a PDF, photograph the page.`;
  }
  if (kind === "text" && file.size > MAX_TEXT_FILE_BYTES) {
    return `"${file.name}" is too large (limit ${Math.round(MAX_TEXT_FILE_BYTES / 1000)} KB). Paste the part you need instead.`;
  }
  return null;
}

/** Fenced context block appended to the draft; long files are trimmed with a note. */
export function formatDocumentContext(name: string, text: string): string {
  const clean = text.replace(/\u0000/g, "").trim();
  const clipped = clean.length > MAX_TEXT_CHARS;
  const body = clipped ? clean.slice(0, MAX_TEXT_CHARS) : clean;
  const safeName = name.replace(/[`\n\r]/g, "");
  return `[Attached file: ${safeName}${clipped ? " (trimmed to the first part)" : ""}]\n\`\`\`\n${body.replace(/```/g, "'''")}\n\`\`\``;
}

/** Fold a document block into the current draft. */
export function appendToDraft(draft: string, block: string): string {
  return draft.trim() ? `${draft.trim()}\n\n${block}` : block;
}
