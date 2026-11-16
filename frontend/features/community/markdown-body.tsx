"use client";

import { MathMarkdown } from "@/components/content/math-markdown";
import { cn } from "@/lib/utils";

/**
 * Community post and comment bodies are authored as markdown (composer toolbar).
 * Read path uses the same sanitized note pipeline as academic docs and chat.
 */
export function MarkdownBody({
  text,
  clamp,
  className,
}: {
  text: string;
  clamp?: boolean;
  className?: string;
}) {
  if (!text.trim()) return null;
  return (
    <div
      className={cn(
        clamp && "line-clamp-4 [&_.prose]:text-inherit",
        className,
      )}
    >
      <MathMarkdown
        content={text}
        className={cn(
          "prose-sm dark:prose-invert max-w-none text-foreground",
          "[&_img]:my-3 [&_img]:w-full [&_img]:max-h-52 [&_img]:rounded-xl [&_img]:border [&_img]:border-border/70 [&_img]:object-cover [&_img]:shadow-sm",
          "[&_p]:leading-relaxed",
          clamp && "prose-headings:my-1 prose-p:my-0.5 prose-ul:my-0.5 prose-ol:my-0.5 [&_img]:max-h-40",
        )}
      />
    </div>
  );
}