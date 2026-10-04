/**
 * Shared document open + download helpers (PDF / HTML study material).
 *
 * Two rules the portal follows everywhere:
 *
 *  1. **Opening never hands a raw file URL to the browser.** Documents open
 *     through the in-app viewer route (`/pdfs/read?src=…`), which renders the
 *     file inside our own shell — sidebar, header, credits gate — in its own
 *     tab, instead of the browser's chrome-less native PDF page.
 *  2. **Opening and downloading never share one click.** Every surface gets an
 *     explicit *Open* control and a separate *Download* control; downloading
 *     goes through `downloadDoc`, which fetches a blob so a cross-origin file
 *     saves to disk rather than opening in a viewer.
 *
 * `isViewableSrc` mirrors the `frame-src` allowlist in `frontend/proxy.ts` —
 * keep the two in sync, otherwise the iframe renders blank.
 */

/** Route that renders one document inside the app shell. */
export const PDF_VIEWER_PATH = "/pdfs/read";

/** Document roots served from `frontend/public`. */
const LOCAL_DOC_ROOTS = ["/pdfs/", "/materials/"] as const;

/** Hosts the CSP `frame-src` allowlist lets us embed (see `frontend/proxy.ts`). */
const FRAME_HOSTS = new Set([
  "tsvbksfegvdjwczzfdcx.supabase.co",
  "drive.google.com",
  "docs.google.com",
  "www.youtube.com",
  "youtube.com",
  "player.vimeo.com",
]);

/** Google Drive `/file/d/{id}/…` → the URL that renders inside an iframe. */
export function drivePreviewUrl(url: string): string | null {
  const match = url.match(/drive\.google\.com\/file\/d\/([A-Za-z0-9_-]+)/);
  if (match) return `https://drive.google.com/file/d/${match[1]}/preview`;
  return null;
}

export function isGoogleDrive(url: string): boolean {
  return url.includes("drive.google.com");
}

/** True for media a browser renders inline in an `<iframe>`. */
export function isInlinePdf(url: string): boolean {
  const bare = url.split("?")[0].toLowerCase();
  return bare.endsWith(".pdf") || isGoogleDrive(url);
}

/**
 * True when the viewer route may frame this source.
 *
 * Same-origin documents must live under a known document root (a
 * protocol-relative `//evil.example/x.pdf` is rejected because it does not
 * start with one of the roots); everything else must be an http(s) URL on an
 * allowlisted host.
 */
export function isViewableSrc(src: string): boolean {
  const value = src.trim();
  if (!value) return false;

  if (value.startsWith("/")) {
    if (value.startsWith("//")) return false; // protocol-relative URL
    if (value.includes("..")) return false; // path traversal
    return LOCAL_DOC_ROOTS.some((root) => value.startsWith(root));
  }

  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return false;
    return FRAME_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

/** The URL the viewer should actually frame (Drive `/view` → `/preview`). */
export function frameSrcFor(src: string): string {
  return drivePreviewUrl(src) ?? src;
}

/** Viewer-tab href for a document. */
export function pdfViewerHref(src: string, title?: string): string {
  const params = new URLSearchParams({ src });
  const label = title?.trim();
  if (label) params.set("title", label);
  return `${PDF_VIEWER_PATH}?${params.toString()}`;
}

/** `…/liquid-crystal.pdf` → `Liquid Crystal`. */
export function titleFromSrc(src: string): string {
  try {
    const path = new URL(src, "http://local.invalid").pathname;
    const file = path.split("/").filter(Boolean).pop() ?? "";
    const stem = file.replace(/\.[a-z0-9]+$/i, "");
    if (!stem) return "Document";
    return stem.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  } catch {
    return "Document";
  }
}

const DOWNLOAD_EXTS = new Set([".pdf", ".html", ".htm", ".md", ".docx", ".txt"]);

/** `Pioneer Grade 11 Biology — Exam Cram (Enhanced)` → a filesystem-safe name. */
export function downloadFileName(src: string, title?: string): string {
  let ext = "";
  try {
    const path = new URL(src, "http://local.invalid").pathname.toLowerCase();
    const match = path.match(/\.([a-z0-9]+)$/);
    if (match && DOWNLOAD_EXTS.has(`.${match[1]}`)) ext = `.${match[1]}`;
  } catch {
    ext = "";
  }
  if (!ext) ext = ".pdf";

  const base = (title?.trim() || titleFromSrc(src))
    .replace(/[\\/:*?"<>|]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return `${base || "document"}${ext}`;
}

function triggerAnchor(href: string, filename: string, newTab = false) {
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = filename;
  anchor.rel = "noreferrer noopener";
  if (newTab) anchor.target = "_blank";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

function driveDownloadUrl(src: string): string | null {
  const match = src.match(/drive\.google\.com\/file\/d\/([A-Za-z0-9_-]+)/);
  if (match) {
    return `https://drive.usercontent.google.com/download?id=${match[1]}&export=download&confirm=t`;
  }
  const idMatch = src.match(/[?&]id=([A-Za-z0-9_-]+)/);
  if (idMatch && isGoogleDrive(src)) {
    return `https://drive.usercontent.google.com/download?id=${idMatch[1]}&export=download&confirm=t`;
  }
  return null;
}

/**
 * Save a document to disk as its own action (never "open + maybe save").
 *
 * Blob fetch first, so cross-origin files land in the downloads folder instead
 * of opening in a viewer. Any failure (CORS, offline, a Drive confirmation
 * page) degrades to a plain anchor: same-origin files still download thanks to
 * the `download` attribute, and anything else opens in a new tab.
 */
export async function downloadDoc(src: string, filename: string): Promise<void> {
  const target = driveDownloadUrl(src) ?? src;
  try {
    const response = await fetch(target, { credentials: "omit" });
    if (!response.ok) throw new Error(`status ${response.status}`);
    const type = response.headers.get("content-type") ?? "";
    // A Drive "too large / confirm first" page arrives as HTML — not a file.
    if (type.includes("text/html")) throw new Error("html response");
    const blob = await response.blob();
    if (blob.size === 0) throw new Error("empty body");
    const objectUrl = URL.createObjectURL(blob);
    try {
      triggerAnchor(objectUrl, filename);
    } finally {
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
    }
  } catch {
    triggerAnchor(src, filename, true);
  }
}
