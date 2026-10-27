import { memo } from "react";
import { cn } from "@/lib/utils";
import { renderNoteHtml } from "@/lib/content/pipeline";
import { splitStepBlocks } from "@/lib/content/steps-blocks";
import { StepCards } from "@/components/chat/step-cards";
import { registerVeerArtifact } from "@/components/content/veer-artifact";
import { registerEduVisualInteractive } from "@/components/content/edu-visual";
import { createLru } from "@/lib/perf/memo";

// The pipeline can emit a <veer-artifact> mount point for a ```run fence; this
// renderer is the one the chat (and every note surface) puts on screen, so it
// registers the runner too. A no-op during SSR — without it the element renders
// as an unknown tag and the artefact is silently invisible.
registerVeerArtifact();
// Automatically activate hover & click inspection interfaces for all SVG diagram
// labels across every MathMarkdown surface (chat, notes, lessons, lab).
registerEduVisualInteractive();

/**
 * Bounded LRU cache of rendered markdown/math HTML so re-renders (tab switches,
 * quiz interactions, sliders) never re-run the synchronous unified + KaTeX
 * pipeline on the same string.
 */
const renderedHtmlCache = createLru<string>(512);

function renderCachedNoteHtml(content: string): string {
  if (!content) return "";
  const hit = renderedHtmlCache.get(content);
  if (hit !== undefined) return hit;
  const html = renderNoteHtml(content);
  renderedHtmlCache.set(content, html);
  return html;
}

type MathMarkdownProps = {
  content: string;
  className?: string;
};

/**
 * Single source of truth for rendering educational content. Accepts markdown,
 * GFM tables/lists, `$...$` / `$$...$$` / `\(...\)` / `\[...\]` math
 * (including mhchem `\ce{}`), fenced code — and Veer `steps` fences, which
 * become numbered step cards — all compiled to sanitized static HTML
 * server-side. No client JS, no React hooks (safe in server components).
 *
 * Steps fences are rendered HERE (owner report 2026-10-27: "the step by step
 * derivations [must be] clean") so EVERY surface that shows a model reply —
 * the chat consoles (which pre-split themselves), deep-dive, the history
 * console, the quick panel — shows real step cards with working KaTeX,
 * never a raw ```steps code block.
 *
 * Renders inside the platform `.prose` typography system (see app/globals.css)
 * so every consumer — note cards, step-by-step solutions, numerical viewers —
 * gets identical styling without wiring it up per call site.
 *
 * Memoized: chat surfaces render one instance per reply segment, so a
 * keystroke re-render of the thread would otherwise re-split and reconcile
 * every historical message. Same props ⇒ same output, no hooks needed.
 */
export const MathMarkdown = memo(function MathMarkdown({
  content,
  className,
}: MathMarkdownProps) {
  const segments = splitStepBlocks(content);

  // The common case: pure prose/math — one cached HTML blob, unchanged shape.
  if (segments.length === 1 && segments[0].kind === "text") {
    return (
      <div
        className={cn("prose dark:prose-invert max-w-none", className)}
        dangerouslySetInnerHTML={{ __html: renderCachedNoteHtml(segments[0].text) }}
      />
    );
  }

  return (
    <div className={cn("prose dark:prose-invert max-w-none", className)}>
      {segments.map((segment, index) =>
        segment.kind === "text" ? (
          <div
            key={`text-${index}`}
            dangerouslySetInnerHTML={{ __html: renderCachedNoteHtml(segment.text) }}
          />
        ) : (
          <StepCards key={`steps-${index}`} steps={segment.steps} />
        ),
      )}
    </div>
  );
});
