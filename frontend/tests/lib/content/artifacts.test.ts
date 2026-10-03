import { describe, expect, it } from "vitest";
import { renderNoteHtml } from "@/lib/content/pipeline";
import {
  MAX_ARTIFACT_CHARS,
  extractArtifact,
  isCompleteArtifact,
  looksLikeHtml,
  remarkArtifacts,
  RUN_FENCE_LANGS,
} from "@/lib/content/artifacts";
import { buildArtifactDoc } from "@/components/content/veer-artifact";

/** A complete artefact of the shape the prompt asks for. */
const DOC = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>Projectile playground</title></head>
<body>
  <input id="v" type="range" min="1" max="40" value="20">
  <canvas id="c" width="600" height="300"></canvas>
  <script>
    const v = document.getElementById("v");
    v.addEventListener("input", () => console.log(v.value));
  </script>
</body>
</html>`;

/** The same document mid-stream: no closing tag yet. */
const PARTIAL = DOC.replace("</html>", "");

const fence = (body: string, info = "run") => "```" + info + "\n" + body + "\n```";

describe("extractArtifact — the guard", () => {
  it("accepts a complete HTML document and keeps it whole", () => {
    const artifact = extractArtifact(DOC);
    expect(artifact).not.toBeNull();
    expect(artifact!.running).toBe(false);
    expect(artifact!.source).toContain("<canvas");
    expect(artifact!.source).toContain("addEventListener");
  });

  it("flags a document that is still arriving", () => {
    const artifact = extractArtifact(PARTIAL);
    expect(artifact).not.toBeNull();
    expect(artifact!.running).toBe(true);
    expect(isCompleteArtifact(PARTIAL)).toBe(false);
    expect(isCompleteArtifact(DOC)).toBe(true);
  });

  it("takes the caption from the fence line", () => {
    expect(extractArtifact(DOC, "Projectile motion playground")?.caption).toBe(
      "Projectile motion playground",
    );
  });

  it("refuses anything that is not markup the frame can show", () => {
    expect(extractArtifact("const a = 1;")).toBeNull();
    expect(extractArtifact("def f():\n    return 1")).toBeNull();
    expect(extractArtifact("# Hello there")).toBeNull();
    expect(extractArtifact("   ")).toBeNull();
    // A bare fragment is still showable — the platform shells it.
    expect(looksLikeHtml("<div>fragment</div>")).toBe(true);
  });

  it("refuses an absurdly large artefact", () => {
    const huge = `<!DOCTYPE html><html><body>${"a".repeat(MAX_ARTIFACT_CHARS + 10)}</body></html>`;
    expect(extractArtifact(huge)).toBeNull();
  });

  it("recognises the alias languages", () => {
    expect([...RUN_FENCE_LANGS].sort()).toEqual(["app", "artifact", "run"]);
  });
});

describe("buildArtifactDoc — containment inside the frame", () => {
  it("puts the platform CSP before any of the artefact's scripts", () => {
    const doc = buildArtifactDoc(DOC);
    const cspAt = doc.indexOf("Content-Security-Policy");
    const scriptAt = doc.indexOf("<script>");
    expect(cspAt).toBeGreaterThan(-1);
    expect(cspAt).toBeLessThan(scriptAt);
    expect(doc).toContain("default-src 'none'");
    expect(doc).toContain("connect-src 'none'");
  });

  it("appends the height reporter after the artefact's own scripts", () => {
    const doc = buildArtifactDoc(DOC);
    expect(doc).toContain("__veerArtifact");
    expect(doc.indexOf("__veerArtifact")).toBeGreaterThan(doc.indexOf("console.log"));
  });

  it("shells a bare fragment and keeps a viewport meta", () => {
    const doc = buildArtifactDoc("<button>Click</button>");
    expect(doc.startsWith("<!DOCTYPE html>")).toBe(true);
    expect(doc).toContain("width=device-width");
    expect(doc).toContain("<button>Click</button>");
  });

  it("injects into <html> when the document has no <head>", () => {
    const doc = buildArtifactDoc("<!DOCTYPE html><html><body><p>hi</p></body></html>");
    expect(doc).toContain("Content-Security-Policy");
    expect(doc).toContain("<p>hi</p>");
  });
});

describe("remarkArtifacts — the pipeline surface", () => {
  it("turns a run fence into a mount point, not a code block", () => {
    const html = renderNoteHtml(fence(DOC, "run Projectile playground"));
    expect(html).toContain("<veer-artifact");
    expect(html).toContain("artifactcaption=\"Projectile playground\"");
    expect(html).toContain("DOCTYPE");
    // The source is carried as data on the element: nothing else is rendered.
    expect(html).not.toContain("<iframe");
    expect(html).not.toContain("<pre");
  });

  it("marks a still-streaming artefact as running", () => {
    const html = renderNoteHtml(fence(PARTIAL));
    expect(html).toContain("<veer-artifact");
    expect(html).toContain("running=\"true\"");
  });

  it("leaves other fences as ordinary highlighted code", () => {
    const html = renderNoteHtml(fence("print('hi')", "python"));
    expect(html).not.toContain("veer-artifact");
    expect(html).toContain("language-python");
  });

  it("leaves a run fence that holds no markup as ordinary code", () => {
    const html = renderNoteHtml(fence("const x = 1;", "run"));
    expect(html).not.toContain("veer-artifact");
    expect(html).toContain("language-run");
  });

  it("escapes the source so it cannot break out of its attribute", () => {
    const evil = '<!DOCTYPE html><html><body><span data-x="out">a</span></body></html>';
    const html = renderNoteHtml(fence(evil));
    // Quotes are entity-encoded, so the payload stays inside one attribute and
    // exactly one element is emitted.
    expect((html.match(/<veer-artifact/g) ?? []).length).toBe(1);
    expect(html).toContain("data-x=&#x22;out&#x22;");
  });

  it("mounts an artefact nested in a list item", () => {
    const html = renderNoteHtml(`- here is the sim:\n\n  ${fence(DOC).replace(/\n/g, "\n  ")}`);
    expect(html).toContain("<veer-artifact");
  });

  it("is the plugin the pipeline registers", () => {
    expect(typeof remarkArtifacts).toBe("function");
  });
});
