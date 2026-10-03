import type { Plugin } from "unified";
import type { Code, Root, RootContent } from "mdast";
import { captionFromMeta } from "@/lib/content/visuals";

/**
 * RUNNABLE ARTEFACTS — a fenced `run` block becomes a live mini-app.
 *
 * Owner request (2026-10-03): "make the AI able to behave on screen, by
 * writing its code in background … create responsive [UI] on the chat panel".
 * The tutor (Veer) answers with a fenced block whose language is `run`; the
 * platform mounts it as a SANDBOXED preview inside the chat, so the student can
 * press the sliders, click the buttons and watch the simulation run — the code
 * executes in the background of the message.
 *
 * How this differs from the svg fence (lib/content/visuals.ts) — and why the
 * difference is safe:
 *
 *   · an svg figure is static markup and is sanitized; a `run` artefact is a
 *     real HTML page whose scripts DO execute — inside an iframe with
 *     `sandbox="allow-scripts"` and deliberately WITHOUT `allow-same-origin`,
 *     which gives the page an opaque origin. It sees no cookies, no
 *     localStorage of the site, no parent DOM, no auth state — a hostile or
 *     broken artefact is confined to its own frame.
 *   · the parent CSP does not propagate into an `about:srcdoc` document, and
 *     the iframe is never navigated to a URL, so `frame-src 'none'` is not
 *     exercised. Inside the frame we force
 *     `default-src 'none'; script-src 'unsafe-inline'` — scripts must be
 *     INLINE, which is also what the prompt requires. An artefact therefore
 *     cannot phone home: no fetch endpoint, no CDN, no remote image or font —
 *     only data:/blob: ones it carries inside itself.
 *   · the raw source travels as an HTML ATTRIBUTE of the placeholder element,
 *     fully escaped; the sanitizer allowlist accepts the (dash-named) custom
 *     element and its three attributes but keeps rejecting script/iframe tags,
 *     so the pipeline's trust order is unchanged.
 *
 * The custom element that consumes these attributes is registered by
 * components/content/veer-artifact.ts (imported by InteractiveMarkdown), so
 * every note surface that renders through the pipeline gets live artefacts.
 *
 * Syntax (the caption is optional and lives on the fence line):
 *
 *     ```run Projectile motion playground
 *     <!DOCTYPE html><html> … </html>
 *     ```
 *
 * A fence that is still open (streaming) or lacks the closing `</html>` keeps
 * the "running" flag: the UI shows the code being typed live, and paints the
 * preview only once the document is complete.
 */

/** Fence languages that mean "run this" (aliases keep model variety safe). */
export const RUN_FENCE_LANGS = new Set(["run", "artifact", "app"]);

/** Longest artefact accepted, in characters (a whole mini-app, not an essay). */
export const MAX_ARTIFACT_CHARS = 120_000;

/** The element the UI mounts. Must stay in sync with veer-artifact.ts. */
export const ARTIFACT_ELEMENT = "veer-artifact";

/**
 * Completeness, as far as the pipeline can tell: the artefact's own closing
 * tag ends a document (the prompt makes it the very last line), and a bare
 * fragment is complete as written because the platform shells it. Anything
 * with an open `<html>` and no closing tag is still arriving.
 */
export function isCompleteArtifact(source: string): boolean {
  const body = (source ?? "").trim();
  if (/<\/html>\s*$/i.test(body)) return true;
  return !/^<html[\s>]|<!DOCTYPE\s+html/i.test(body);
}

/**
 * True when the block is something we can actually show: a full HTML document
 * or any markup fragment. Anything else (bare JS, Python, prose) stays an
 * ordinary highlighted code block — honest, never half-rendered.
 */
export function looksLikeHtml(source: string): boolean {
  const body = (source ?? "").trim();
  return /^<[a-z!]/i.test(body);
}

export interface ArtifactInput {
  /** The raw artefact source exactly as the model wrote it. */
  source: string;
  /** Caption from the fence line. */
  caption: string;
  /** True while the document is still arriving (streaming). */
  running: boolean;
}

/** Turn a fenced block into an artefact input, or null to leave it as code. */
export function extractArtifact(code: string, meta?: string | null): ArtifactInput | null {
  const source = (code ?? "").trim();
  if (!source) return null;
  if (!looksLikeHtml(source)) return null;
  if (source.length > MAX_ARTIFACT_CHARS) return null;
  return {
    source,
    caption: captionFromMeta(meta),
    running: !isCompleteArtifact(source),
  };
}

function artifactNode(artifact: ArtifactInput): RootContent {
  return {
    type: "paragraph",
    data: {
      hName: ARTIFACT_ELEMENT,
      hProperties: {
        artifactsource: artifact.source,
        artifactcaption: artifact.caption,
        ...(artifact.running ? { running: "true" } : {}),
      },
    },
    children: [],
  } as unknown as RootContent;
}

function transform(children: RootContent[]): RootContent[] {
  for (let index = 0; index < children.length; index += 1) {
    const node = children[index];

    if (node.type === "code" && node.lang && RUN_FENCE_LANGS.has(node.lang.toLowerCase())) {
      const artifact = extractArtifact((node as Code).value ?? "", (node as Code).meta);
      if (artifact) {
        children[index] = artifactNode(artifact);
        continue;
      }
    }

    // Recurse so an artefact inside a list item or a callout box also mounts.
    const nested = (node as { children?: RootContent[] }).children;
    if (Array.isArray(nested)) {
      (node as { children: RootContent[] }).children = transform(nested);
    }
  }
  return children;
}

/**
 * remark plugin — runs before the raw/sanitize stages like remarkVisuals; it
 * only decides what a `run` fence LOOKS like (a mount point). The security
 * boundary is the iframe sandbox inside the element, not this transform.
 */
export const remarkArtifacts: Plugin<[], Root> = () => (tree) => {
  tree.children = transform(tree.children);
};
