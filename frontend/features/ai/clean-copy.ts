/**
 * Strip link targets from an AI reply before it lands on the clipboard.
 *
 * The chat renders `[label](url)` as a working anchor on screen, but a raw
 * copy used to hand the student the markdown WITH the URL — owner rule
 * 2026-09-27: links must WORK but their URLs must stay hidden, so the copy
 * keeps the labels and drops every URL (markdown targets, angle-wrapped and
 * bare).
 */
export function stripLinksForCopy(text: string): string {
  return text
    // images → alt text (the markdown image target is a URL too)
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    // links → visible label only, target dropped
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    // bare URLs (markdown-free) → removed entirely
    .replace(/https?:\/\/[^\s<>()]+/g, "")
    // tidy the holes left behind without touching paragraph breaks
    .replace(/[^\S\r\n]{2,}/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
