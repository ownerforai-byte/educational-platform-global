import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import {
  VEER_ARTIFACT_ELEMENT,
  registerVeerArtifact,
} from "@/components/content/veer-artifact";

const DOC = [
  "<!DOCTYPE html>",
  "<html><head><title>T</title></head>",
  "<body><button id=b>go</button><script>document.getElementById('b').onclick=()=>{};</scr" + "ipt>",
  "</body></html>",
].join("");

function mount(attrs: Record<string, string>): HTMLElement {
  registerVeerArtifact();
  const host = document.createElement(VEER_ARTIFACT_ELEMENT);
  for (const [name, value] of Object.entries(attrs)) host.setAttribute(name, value);
  document.body.appendChild(host);
  return host;
}

const iframeOf = (host: HTMLElement) =>
  host.shadowRoot!.querySelector("iframe") as HTMLIFrameElement;

describe("veer-artifact — the on-screen runner", () => {
  it("registers the element the pipeline emits", () => {
    registerVeerArtifact();
    expect(customElements.get(VEER_ARTIFACT_ELEMENT)).toBeTypeOf("function");
    // Idempotent: a second call must not throw on the duplicate definition.
    expect(() => registerVeerArtifact()).not.toThrow();
  });

  it("sandboxes the frame with no same-origin, so the app is unreachable", () => {
    const host = mount({ artifactsource: DOC, artifactcaption: "Projectile playground" });
    const frame = iframeOf(host);
    expect(frame.getAttribute("sandbox")).toBe("allow-scripts allow-modals allow-forms");
    expect(frame.getAttribute("sandbox")).not.toContain("allow-same-origin");
    // The source is DATA on the host element — it is never live markup in the page.
    expect(host.querySelector("button")).toBeNull();
    expect(document.querySelector("veer-artifact button")).toBeNull();
  });

  it("holds the containment CSP and the height reporter in the mounted document", () => {
    const host = mount({ artifactsource: DOC });
    const srcdoc = iframeOf(host).getAttribute("srcdoc") ?? "";
    expect(srcdoc).toContain("default-src 'none'");
    expect(srcdoc).toContain("connect-src 'none'");
    expect(srcdoc).toContain("__veerArtifact");
    // CSP first, the artefact's own script later.
    expect(srcdoc.indexOf("Content-Security-Policy")).toBeLessThan(srcdoc.indexOf("<script>"));
  });

  it("shows the caption and the running badge, and stays empty while streaming", () => {
    const partial = DOC.replace("</html>", "");
    const host = mount({ artifactsource: partial, artifactcaption: "Pendulum lab", running: "true" });
    const shadow = host.shadowRoot!;
    expect(shadow.querySelector(".title")!.textContent).toBe("Pendulum lab");
    expect(shadow.querySelector(".badge")!.textContent).toBe("Writing the code…");
    expect(iframeOf(host).hasAttribute("srcdoc")).toBe(false);
    // The live source is readable while it arrives.
    expect(shadow.querySelector("pre")!.textContent).toBe(partial);
    expect((shadow.querySelector('[data-pane="code"]') as HTMLElement).hidden).toBe(false);
  });

  it("switches to the code face on click and back to the preview", () => {
    const host = mount({ artifactsource: DOC, artifactcaption: "Quiz" });
    const shadow = host.shadowRoot!;
    (shadow.querySelector('[data-role="code"]') as HTMLElement).click();
    expect((shadow.querySelector('[data-pane="code"]') as HTMLElement).hidden).toBe(false);
    expect((shadow.querySelector('[data-pane="preview"]') as HTMLElement).hidden).toBe(true);
    (shadow.querySelector('[data-role="preview"]') as HTMLElement).click();
    expect((shadow.querySelector('[data-pane="preview"]') as HTMLElement).hidden).toBe(false);
  });

  it("mounts once the streaming document lands", () => {
    const partial = DOC.replace("</html>", "");
    const host = mount({ artifactsource: partial, running: "true" });
    host.setAttribute("artifactsource", DOC);
    host.removeAttribute("running");
    expect(iframeOf(host).getAttribute("srcdoc")).toContain("__veerArtifact");
    expect(host.shadowRoot!.querySelector(".badge")!.textContent).toBe("Runs live");
    host.remove();
  });

  it("is registered by every renderer that can emit the element", () => {
    // The chat (components/chat/study-chat.tsx) renders assistant markdown
    // through MathMarkdown, NOT InteractiveMarkdown. A renderer that emits
    // <veer-artifact> without registering it shows an unknown, invisible tag —
    // the artefact silently vanishes on exactly the surface the owner asked for.
    const renderers = [
      "../../../components/content/math-markdown.tsx",
      "../../../components/content/interactive-markdown.tsx",
    ];
    for (const rel of renderers) {
      const source = readFileSync(new URL(rel, import.meta.url), "utf8");
      expect(source, `${rel} must import the runner`).toContain(
        'from "@/components/content/veer-artifact"',
      );
      expect(source, `${rel} must register the runner`).toContain("registerVeerArtifact();");
    }
  });
});
