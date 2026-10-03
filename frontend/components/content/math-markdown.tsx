import { cn } from "@/lib/utils";
import { renderNoteHtml } from "@/lib/content/pipeline";
import { registerVeerArtifact } from "@/components/content/veer-artifact";
import { registerEduVisualInteractive } from "@/components/content/edu-visual";

// The pipeline can emit a <veer-artifact> mount point for a ```run fence; this
// renderer is the one the chat (and every note surface) puts on screen, so it
// registers the runner too. A no-op during SSR — without it the element renders
// as an unknown tag and the artefact is silently invisible.
registerVeerArtifact();
// Automatically activate hover & click inspection interfaces for all SVG diagram
// labels across every MathMarkdown surface (chat, notes, lessons, lab).
registerEduVisualInteractive();

type MathMarkdownProps = {
  content: string;
  className?: string;
};

/**
 * Single source of truth for rendering educational content. Accepts markdown,
 * GFM tables/lists, `$...$` / `$$...$$` / `\(...\)` / `\[...\]` math
 * (including mhchem `\ce{}`), and fenced code — all compiled to
 * sanitized static HTML server-side. No client JS, no React hooks (safe in
 * server components).
 *
 * Renders inside the platform `.prose` typography system (see app/globals.css)
 * so every consumer — note cards, step-by-step solutions, numerical viewers —
 * gets identical styling without wiring it up per call site.
 */
export function MathMarkdown({ content, className }: MathMarkdownProps) {
  return (
    <div
      className={cn("prose dark:prose-invert max-w-none", className)}
      dangerouslySetInnerHTML={{ __html: renderNoteHtml(content) }}
    />
  );
}
