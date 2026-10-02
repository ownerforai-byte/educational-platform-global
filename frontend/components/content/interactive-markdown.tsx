"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { renderNoteHtml } from "@/lib/content/pipeline";

type InteractiveMarkdownProps = {
  content: string;
  className?: string;
};

type PartTip = { text: string; x: number; y: number } | null;

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

    return () => cleanups.forEach((off) => off());
  }, [html]);

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