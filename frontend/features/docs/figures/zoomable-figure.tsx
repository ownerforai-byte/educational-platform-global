"use client";

import { useCallback, useEffect, useState } from "react";
import type { ComponentType } from "react";

/**
 * ZoomableFigure — owner request 2026-11-21: diagrams must be zoomable.
 * Renders the figure inline at reading size; clicking it opens a fullscreen
 * lightbox where the same figure re-renders at viewport scale. Two kinds of
 * figure live behind this shell:
 *   • SVG components (`Component`) — crisp at any zoom, used for
 *     classification-style diagrams.
 *   • Rich raster illustrations (`src`) — detailed, realistic artwork for
 *     biology and other visual subjects (owner request 2026-11-22).
 * Close by clicking the backdrop, the × button, or pressing Escape.
 */
export function ZoomableFigure({
  Component,
  src,
  caption,
  alt,
}: {
  Component?: ComponentType<{ className?: string }>;
  /** Rich raster illustration (public/ asset path). Mutually exclusive with Component. */
  src?: string;
  caption: string;
  alt: string;
}) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <>
      <figure className="group my-5 overflow-hidden rounded-2xl border border-border/70 bg-card p-4 print:border-gray-300">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Zoom in: ${alt}`}
          title="Click to zoom in"
          className="relative block w-full cursor-zoom-in rounded-xl transition-colors hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-primary print:cursor-default"
        >
          {Component ? (
            <Component className="mx-auto w-full max-w-[640px] text-foreground print:text-black" />
          ) : (
            // Static generated artwork from /public — next/image adds nothing
            // here (single fixed-size plate) and breaks the lightbox sizing.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt}
              loading="lazy"
              className="mx-auto w-full max-w-[860px] rounded-lg bg-white"
            />
          )}
          <span className="pointer-events-none absolute right-2 top-2 hidden items-center gap-1 rounded-full bg-primary/90 px-2.5 py-1 text-[10px] font-bold text-primary-foreground shadow-sm group-hover:inline-flex print:hidden">
            ⤢ Zoom
          </span>
        </button>
        <figcaption className="mt-2 border-t border-border/60 pt-2 text-xs leading-relaxed text-muted-foreground print:border-gray-300 print:text-gray-700">
          {caption}
        </figcaption>
      </figure>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-background/95 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <div className="absolute right-4 top-4 flex items-center gap-2">
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
              Scroll-free zoom · press Esc or click outside to close
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Close zoomed diagram"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground shadow-lg transition-transform hover:scale-105"
            >
              ×
            </button>
          </div>
          <div
            className="max-h-[86vh] max-w-[94vw] overflow-auto rounded-2xl border border-border bg-card p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {Component ? (
              <Component className="mx-auto h-auto w-full max-w-[1400px] min-w-[720px] text-foreground" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={alt}
                className="mx-auto max-h-[70vh] w-auto max-w-full rounded-lg bg-white"
              />
            )}
            <p className="mt-4 border-t border-border/60 pt-3 text-center text-sm leading-relaxed text-muted-foreground">
              {caption}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
