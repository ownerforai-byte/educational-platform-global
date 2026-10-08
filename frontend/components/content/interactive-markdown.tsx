"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { renderNoteHtml } from "@/lib/content/pipeline";
import { registerVeerArtifact } from "@/components/content/veer-artifact";

// The ```run fence renders through this element, so the renderer that emits it
// is also the one that registers it (no-op during SSR).
registerVeerArtifact();

type InteractiveMarkdownProps = {
  content: string;
  className?: string;
};

type PartTip = { text: string; x: number; y: number } | null;

/** Source of one :::copy box: its title (for pairing) and body (for copying). */
type CopySource = { title: string; body: string };

/**
 * Markdown body of every :::copy block in document order (owner request
 * 2026-10-08: "present important information in a separate rectangular block
 * so that you can copy at once … answers, emails, letters, long answers,
 * explanations"). Pairing with the rendered boxes happens by TITLE in the
 * hydration effect below, so a box that arrives by another route — the
 * > [!copy] alert spelling — can never shift its neighbours onto the wrong
 * payload. Fenced code is skipped: a reply that SHOWS the syntax inside a
 * fence must not register a phantom source.
 *
 * An unclosed block (mid-stream) yields nothing, mirroring the pipeline,
 * which refuses to convert an unclosed :::copy either — no box, no source.
 */
function extractCopySources(content: string): CopySource[] {
  const sources: CopySource[] = [];
  let inFence = false;
  let title: string | null = null;
  let body: string[] = [];

  for (const line of content.split("\n")) {
    if (/^```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    if (title === null) {
      const open = /^:{3,}\s*copy\b\s*(.*)$/i.exec(line);
      if (open) {
        title = open[1].trim();
        body = [];
      }
      continue;
    }
    if (/^:{3,}\s*$/.test(line)) {
      sources.push({ title, body: body.join("\n").trim() });
      title = null;
      body = [];
      continue;
    }
    body.push(line);
  }
  return sources;
}

/**
 * One-tap clipboard write: Clipboard API first (secure contexts), then a
 * hidden textarea + execCommand for older WebViews and plain-http dev, false
 * when both refuse (the button then asks for the manual shortcut).
 */
async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // private mode / permission denied — fall through to the legacy path
  }
  try {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand("copy");
    field.remove();
    return ok;
  } catch {
    return false;
  }
}

/**
 * INTERACTIVE MARKDOWN — MathMarkdown's renderer plus live figure explainers.
 *
 * Owner request (2026-10-02): every labelled organ/structure of a drawn figure
 * should open its explanation on hover OR click, so the picture explains itself
 * while the answer streams.
 *
 * The tutor already writes each labelled part as
 * `<g><title>name — what it does</title>…</g>` (backend deep-answer.ts), and the
 * sanitizer keeps `<g>`/`<title>` (lib/content/visuals.ts). So nothing new is
 * generated — this component only HYDRATES what is already in the HTML:
 *
 *   · every `<g>` that owns a direct `<title>` becomes a focusable part
 *   · hover / focus / click opens a positioned tooltip carrying that title text
 *   · Escape, blur or leaving the part dismisses it; listeners are removed
 *     whenever the content re-renders (streaming), so nothing leaks
 *
 * Safe by construction: the tooltip only ever renders text that was already
 * inside the sanitized `<title>` — React escapes it on render — and no script,
 * handler or id is ever added to the figure markup itself.
 *
 * Drop-in for MathMarkdown: same props, same `.prose` typography.
 */
export function InteractiveMarkdown({ content, className }: InteractiveMarkdownProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<PartTip>(null);
  const html = useMemo(() => renderNoteHtml(content), [content]);
  const copySources = useMemo(() => extractCopySources(content), [content]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    setTip(null);

    const cleanups: Array<() => void> = [];

    root.querySelectorAll<SVGGElement>(".edu-visual svg g").forEach((part) => {
      const titleEl = part.querySelector(":scope > title");
      const text = (titleEl?.textContent ?? "").trim();
      if (!text) return;

      part.classList.add("edu-visual__part");
      part.setAttribute("tabindex", "0");
      part.setAttribute("role", "button");
      part.setAttribute("aria-label", text);

      const show = () => {
        const box = part.getBoundingClientRect();
        const host = root.getBoundingClientRect();
        setTip({
          text,
          x: Math.round(box.left + box.width / 2 - host.left),
          y: Math.round(box.top - host.top),
        });
      };
      const hide = () => setTip(null);
      const onKeydown = (event: Event) => {
        const key = (event as KeyboardEvent).key;
        if (key === "Enter" || key === " ") {
          (event as KeyboardEvent).preventDefault();
          show();
        } else if (key === "Escape") {
          hide();
        }
      };

      part.addEventListener("mouseenter", show);
      part.addEventListener("mouseleave", hide);
      part.addEventListener("focus", show);
      part.addEventListener("blur", hide);
      part.addEventListener("click", show);
      part.addEventListener("keydown", onKeydown);

      cleanups.push(() => {
        part.removeEventListener("mouseenter", show);
        part.removeEventListener("mouseleave", hide);
        part.removeEventListener("focus", show);
        part.removeEventListener("blur", hide);
        part.removeEventListener("click", show);
        part.removeEventListener("keydown", onKeydown);
        part.classList.remove("edu-visual__part");
        part.removeAttribute("tabindex");
        part.removeAttribute("role");
        part.removeAttribute("aria-label");
      });
    });

    // ONE-TAP COPY BLOCKS (owner 2026-10-08): every :::copy rectangle gets its
    // own button, so a lift-ready chunk — final answer, email, letter, worked
    // solution — copies on ONE click, independent of the whole-reply copy that
    // already sits below the bubble. The payload is the box's MARKDOWN source
    // (LaTeX and all), paired by the box's own title before the button exists,
    // so the button's label can never leak into what gets copied; when no
    // source matches (alert-spelled box), the box's visible text is copied.
    const remaining = [...copySources];
    root.querySelectorAll<HTMLElement>(".edu-callout--copy").forEach((block) => {
      const heading =
        block.querySelector(".edu-callout__heading")?.textContent?.trim() ?? "";
      const at = heading ? remaining.findIndex((s) => s.title === heading) : -1;
      const matched = at >= 0 ? remaining.splice(at, 1)[0].body : "";
      const source = matched || (block.innerText || block.textContent || "").trim();

      const button = document.createElement("button");
      button.type = "button";
      button.className = "edu-copy-btn";
      button.textContent = "Copy";
      button.setAttribute("aria-label", "Copy this block");
      let resetTimer: ReturnType<typeof setTimeout> | undefined;

      const onClick = () => {
        void (async () => {
          const ok = await copyTextToClipboard(source);
          button.textContent = ok ? "Copied ✓" : "Press Ctrl+C";
          button.classList.toggle("edu-copy-btn--done", ok);
          if (resetTimer) clearTimeout(resetTimer);
          resetTimer = setTimeout(() => {
            button.textContent = "Copy";
            button.classList.remove("edu-copy-btn--done");
          }, 1600);
        })();
      };

      button.addEventListener("click", onClick);
      block.appendChild(button);
      cleanups.push(() => {
        if (resetTimer) clearTimeout(resetTimer);
        button.removeEventListener("click", onClick);
        button.remove();
      });
    });

    return () => cleanups.forEach((off) => off());
  }, [html, copySources]);

  return (
    <div className="relative">
      <div
        ref={rootRef}
        className={cn("prose dark:prose-invert max-w-none", className)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {tip && (
        <div className="edu-visual__tip" style={{ left: tip.x, top: tip.y }} role="tooltip">
          {tip.text}
        </div>
      )}
    </div>
  );
}