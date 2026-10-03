/**
 * VEER ARTEFACT — the on-screen runner for a ```run fence.
 *
 * Owner request (2026-10-03): the tutor writes its code in the BACKGROUND and
 * the chat panel shows the working result — a responsive, interactive widget
 * the student can use, not a wall of syntax.
 *
 * The element is a shadow-DOM card with two faces and a sandbox:
 *
 *   · Preview — the artefact rendered in an iframe with
 *     `sandbox="allow-scripts allow-modals allow-forms"` and NO
 *     `allow-same-origin`. That combination gives the page an opaque origin: it
 *     cannot read cookies, localStorage, the auth session, or the parent DOM,
 *     and it cannot script the chat around it. Everything it does, dies with
 *     the frame.
 *   · Code — the exact source the model wrote, so the student can still read
 *     and copy it. Preview is the default face; the code is one click away.
 *   · While the reply is still streaming (`running`), only the Code face is
 *     shown, live-typing — an incomplete page would mount as a broken frame.
 *
 * Containment inside the frame: we prepend our own CSP meta that allows only
 * inline script/style and no network. Browsers intersect multiple policies, so
 * a meta the model writes cannot widen it; the artefact simply cannot phone
 * home, and the prompt accordingly asks for self-contained pages.
 *
 * Height: a small script we append inside the frame measures the document and
 * posts its height to this host; the parent accepts a message only when it
 * comes from its own iframe window. So a long artefact grows the card instead
 * of hiding content behind a fixed 300px box.
 *
 * Registered once, idempotently, from InteractiveMarkdown (client side).
 */

/** Keep in sync with ARTIFACT_ELEMENT in lib/content/artifacts.ts. */
export const VEER_ARTIFACT_ELEMENT = "veer-artifact";

const MIN_HEIGHT = 140;
const MAX_HEIGHT = 1400;
const DEFAULT_HEIGHT = 380;

/** Platform CSS first: the artefact's own styles come after and win. */
const BASE_STYLE = `<style>
  *,*::before,*::after{box-sizing:border-box}
  html,body{margin:0;padding:0}
  body{
    font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
    font-size:15px;line-height:1.55;color:#0f172a;background:#fff;
    padding:14px;max-width:100%;overflow-x:hidden;
  }
  img,video,canvas,svg,table{max-width:100%}
  body{scroll-behavior:smooth}
</style>`;

/**
 * The height reporter, appended as the LAST thing in the frame. Inline, since
 * the frame CSP only allows inline script. MutationObserver keeps it honest
 * when the artefact changes size after load (tabs, sliders, animations).
 */
const HEIGHT_REPORTER =
  "<script>(function(){" +
  "var last=0;" +
  "function measure(){" +
  "var b=document.body,d=document.documentElement;" +
  "if(!b||!d)return;" +
  // Measure the BODY, not the document element: the root always reports at
  // least the frame's own viewport height, which would make the card able to
  // grow but never to shrink back for a short artefact.
  "var h=Math.max(b.scrollHeight,b.offsetHeight);" +
  "if(h&&h!==last){last=h;try{parent.postMessage({__veerArtifact:h},\"*\")}catch(e){}}" +
  "}" +
  "try{new MutationObserver(measure).observe(d,{childList:true,subtree:true,attributes:true})}catch(e){}" +
  "addEventListener(\"load\",measure);addEventListener(\"resize\",measure);measure();" +
  "})();</" +
  "script>";

const FRAME_CSP =
  `<meta http-equiv="Content-Security-Policy" content="` +
  `default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; ` +
  `img-src data: blob:; font-src data:; connect-src 'none'; form-action 'none'; ` +
  `base-uri 'none'; frame-src 'none'; worker-src 'none'">`;

const VIEWPORT_META = '<meta name="viewport" content="width=device-width, initial-scale=1">';

/**
 * Wrap the model's source into a complete, contained document. A full document
 * keeps its own head/body and only receives the platform pieces; a bare
 * fragment gets a minimal shell around it.
 */
export function buildArtifactDoc(source: string): string {
  const body = (source ?? "").trim();
  if (!/^<!DOCTYPE\s+html|^<html[\s>]/i.test(body)) {
    return [
      "<!DOCTYPE html><html><head>",
      '<meta charset="utf-8">',
      FRAME_CSP,
      VIEWPORT_META,
      BASE_STYLE,
      "</head><body>",
      body,
      HEIGHT_REPORTER,
      "</body></html>",
    ].join("");
  }

  let doc = body;
  const platformHead = `<meta charset="utf-8">${FRAME_CSP}${VIEWPORT_META}${BASE_STYLE}`;
  // Our CSP must be the FIRST thing in the head: the browser needs it in force
  // before it parses any of the artefact's own scripts.
  const opener = /(<head[^>]*>|<html[^>]*>)/i.exec(doc);
  if (opener) {
    const at = opener.index + opener[0].length;
    doc = `${doc.slice(0, at)}${platformHead}${doc.slice(at)}`;
  } else {
    doc = `${platformHead}${doc}`;
  }
  // The reporter runs last, after the artefact's own scripts.
  const bodyClose = /<\/body>/i.exec(doc);
  return bodyClose
    ? `${doc.slice(0, bodyClose.index)}${HEIGHT_REPORTER}${doc.slice(bodyClose.index)}`
    : `${doc}${HEIGHT_REPORTER}`;
}

const CARD_CSS = `
:host{display:block;margin:14px 0;container-type:inline-size}
.card{border:1px solid rgb(100 116 139 / .38);border-radius:14px;overflow:hidden;
  background:rgb(15 23 42 / .03);color:rgb(15 23 42);
  font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
.head{display:flex;align-items:center;gap:10px;padding:8px 10px;
  border-bottom:1px solid rgb(100 116 139 / .26);background:rgb(255 255 255 / .6)}
.title{font-size:13px;font-weight:650;color:#334155;flex:1;min-width:0;
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.badge{font-size:10.5px;font-weight:650;letter-spacing:.02em;padding:2px 7px;border-radius:999px;
  background:rgb(16 185 129 / .14);color:#047857;white-space:nowrap}
.badge.run{background:rgb(59 130 246 / .14);color:#1d4ed8}
.tabs{display:flex;gap:4px}
button{font:inherit;font-size:12px;font-weight:600;padding:4px 10px;border-radius:8px;cursor:pointer;
  border:1px solid rgb(100 116 139 / .3);background:#fff;color:#475569}
button[data-on="1"]{background:#0f172a;border-color:#0f172a;color:#fff}
button:hover{border-color:#64748b}
.body{position:relative;background:#fff}
iframe{display:block;width:100%;border:0;background:#fff}
pre{margin:0;padding:14px;max-height:420px;overflow:auto;background:#0f172a;color:#e2e8f0;
  font:12px/1.6 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;white-space:pre-wrap;word-break:break-word}
.foot{padding:6px 11px;font-size:11px;color:#64748b;border-top:1px solid rgb(100 116 139 / .22);
  background:rgb(248 250 252 / .7)}
[hidden]{display:none}
@container (max-width: 420px){
  .head{flex-wrap:wrap}
  .title{flex-basis:100%;order:-1}
  .foot{display:none}
}
`;

function pick(root: ShadowRoot, selector: string): HTMLElement {
  return root.querySelector(selector) as HTMLElement;
}

/**
 * The class is built inside this factory instead of at module scope: client
 * components are still evaluated during SSR, where `HTMLElement` is undefined.
 */
function defineArtifactElement(): CustomElementConstructor {
  class VeerArtifactElement extends HTMLElement {
    private shadow?: ShadowRoot;
    private frame?: HTMLIFrameElement;
    private tabs?: { preview: HTMLButtonElement; code: HTMLButtonElement };
    private panes?: { preview: HTMLElement; code: HTMLElement };
    private badge?: HTMLElement;
    private heightListener?: (event: MessageEvent) => void;
    private shownCode = "";
    /** True once the complete source has been mounted into the frame. */
    private mounted = false;

    connectedCallback(): void {
      this.render();
    }

    disconnectedCallback(): void {
      this.detachHeight();
    }

    static get observedAttributes(): string[] {
      return ["artifactsource", "artifactcaption", "running"];
    }

    attributeChangedCallback(): void {
      if (this.shadow) this.render();
    }

    private get source(): string {
      return this.getAttribute("artifactsource") ?? "";
    }

    private get running(): boolean {
      return this.hasAttribute("running");
    }

    private detachHeight(): void {
      if (!this.heightListener) return;
      window.removeEventListener("message", this.heightListener);
      this.heightListener = undefined;
    }

    private render(): void {
      if (!this.shadow) this.build();

      const shadow = this.shadow as ShadowRoot;
      const source = this.source;
      const running = this.running;
      const caption = (this.getAttribute("artifactcaption") ?? "").trim();

      pick(shadow, ".title").textContent = caption || "Interactive artefact";
      const badge = this.badge as HTMLElement;
      badge.textContent = running ? "Writing the code…" : "Runs live";
      badge.className = `badge${running ? " run" : ""}`;

      const pre = pick(shadow, "pre");
      if (source !== this.shownCode) {
        this.shownCode = source;
        pre.textContent = source;
      }

      if (running) {
        // Still typing: show the live source, keep the frame empty.
        this.detachHeight();
        this.frame?.removeAttribute("srcdoc");
        this.mounted = false;
        if (this.panes?.code?.hidden !== false) this.switchFace("code");
        return;
      }

      if (this.mounted) return;
      this.mounted = true;
      this.mount();
      // The complete page arrived while the student was reading the code.
      if (this.panes?.code?.hidden === false) this.switchFace("preview");
    }

    private build(): void {
      const root = this.attachShadow({ mode: "open" });
      this.shadow = root;
      root.innerHTML = `
        <style>${CARD_CSS}</style>
        <div class="card">
          <div class="head">
            <span class="title"></span>
            <span class="badge"></span>
            <div class="tabs">
              <button type="button" data-role="preview">Preview</button>
              <button type="button" data-role="code">Code</button>
              <button type="button" data-role="copy">Copy</button>
              <button type="button" data-role="rerun">Re-run</button>
            </div>
          </div>
          <div class="body">
            <div data-pane="preview"><iframe title="Interactive artefact" sandbox="allow-scripts allow-modals allow-forms"></iframe></div>
            <div data-pane="code" hidden><pre></pre></div>
          </div>
          <div class="foot">Runs sandboxed inside this card — no site data, no network. Code written by Veer.</div>
        </div>`;

      this.frame = root.querySelector("iframe") as HTMLIFrameElement;
      this.badge = pick(root, ".badge");
      this.panes = { preview: pick(root, '[data-pane="preview"]'), code: pick(root, '[data-pane="code"]') };
      this.tabs = {
        preview: pick(root, '[data-role="preview"]') as HTMLButtonElement,
        code: pick(root, '[data-role="code"]') as HTMLButtonElement,
      };
      this.tabs.preview.addEventListener("click", () => this.switchFace("preview"));
      this.tabs.code.addEventListener("click", () => this.switchFace("code"));
      pick(root, '[data-role="copy"]').addEventListener("click", () => {
        void navigator.clipboard?.writeText(this.source);
      });
      pick(root, '[data-role="rerun"]').addEventListener("click", () => this.mount());
      this.switchFace("preview");
    }

    private switchFace(which: "preview" | "code"): void {
      if (!this.panes || !this.tabs) return;
      const code = which === "code";
      this.panes.code.hidden = !code;
      this.panes.preview.hidden = code;
      this.tabs.preview.dataset.on = code ? "0" : "1";
      this.tabs.code.dataset.on = code ? "1" : "0";
    }

    private mount(): void {
      this.detachHeight();
      const frame = this.frame;
      if (!frame || !this.source) return;
      this.heightListener = (event: MessageEvent) => {
        // Only this frame's own document may size this card.
        if (event.source !== frame.contentWindow) return;
        const data = event.data as { __veerArtifact?: unknown } | null;
        const height = typeof data?.__veerArtifact === "number" ? data.__veerArtifact : 0;
        if (!height) return;
        frame.style.height = `${Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, Math.round(height)))}px`;
      };
      window.addEventListener("message", this.heightListener);
      frame.style.height = `${DEFAULT_HEIGHT}px`;
      frame.srcdoc = buildArtifactDoc(this.source);
    }
  }

  return VeerArtifactElement;
}

/** Idempotent registration — safe to call from every client entry point. */
export function registerVeerArtifact(): void {
  if (typeof window === "undefined" || typeof window.HTMLElement !== "function") return;
  if (customElements.get(VEER_ARTIFACT_ELEMENT)) return;
  customElements.define(VEER_ARTIFACT_ELEMENT, defineArtifactElement());
}
