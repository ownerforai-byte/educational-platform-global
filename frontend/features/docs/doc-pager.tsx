"use client";

/**
 * DocPager — the common page renderer for the Academic Docs Viewer.
 *
 * Owner request: document content used to flow as one endless article, which
 * made long topics feel random and tiring to read. DocPager expresses every
 * content block as bound paper pages instead:
 *
 *   1. Every item renders ONCE inside the page card (single DOM — no hidden
 *      duplicate layer). Each wrapper is a `flow-root` block with a trailing
 *      gap, so its `offsetHeight` is the exact space it needs.
 *   2. A pre-paint measuring pass (all items temporarily visible) records the
 *      item heights; packDocPages greedily packs them into fixed-height
 *      pages — a block that does not fit moves to the next page.
 *   3. `keepWithNext` items (section headings, sub-labels) are never stranded
 *      at the bottom of a page; they travel to the next page together with
 *      the block that follows.
 *   4. Off-page items are `hidden print:block`, so the reader sees one paper
 *      page at a time while Print / PDF still outputs the whole document.
 *
 * Re-measuring happens when the items change, the reader font size changes
 * (`measureKey`), the viewport width changes, or web fonts finish loading.
 * In jsdom/no-JS the measuring pass never runs, so every item stays visible
 * on one page — tests and SEO keep seeing the full document.
 */

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface DocPagerItem {
  key: string;
  node: React.ReactNode;
  /** Never leave this item as the last block of a page (headings, labels). */
  keepWithNext?: boolean;
  /** First item of a logical section carries its anchor id (e.g. "doc-map"). */
  sectionId?: string;
}

export interface DocPagerApi {
  goToSection: (sectionId: string) => void;
  pageCount: number;
}

/** Content-height budget of one page on a desktop-class viewport. */
const PAGE_BUDGET_PX = 1024;
/** Tighter budget on small screens so phone pages stay readable. */
const PAGE_BUDGET_MOBILE_PX = 640;

const useIsoEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Pure page packing: greedy fill of the height budget. An item taller than
 * the budget gets a page of its own (the page card grows). Trailing
 * keepWithNext items are CARRIED to the next page (never dropped) so a
 * heading is never separated from its content.
 */
export function packDocPages(
  items: DocPagerItem[],
  heights: number[],
  budget: number,
): number[][] {
  const pages: number[][] = [];
  let current: number[] = [];
  let used = 0;

  const sumHeights = (idx: number[]) =>
    idx.reduce((sum, i) => sum + (heights[i] ?? 0), 0);

  for (let i = 0; i < items.length; i += 1) {
    const height = heights[i] ?? 0;
    if (current.length > 0 && used + height > budget) {
      const carried: number[] = [];
      while (current.length > 0 && items[current[current.length - 1]].keepWithNext) {
        carried.unshift(current.pop() as number);
      }
      if (current.length > 0) {
        pages.push(current);
        current = carried;
        used = sumHeights(carried);
      } else {
        // Everything so far was keepWithNext (or one oversized item): keep
        // it flowing on the same page as the oversized block.
        current = carried;
        used = sumHeights(carried);
      }
    }
    current.push(i);
    used += height;
  }

  if (current.length > 0) pages.push(current);
  return pages;
}

function pageBudgetFor(width: number): number {
  return width < 640 ? PAGE_BUDGET_MOBILE_PX : PAGE_BUDGET_PX;
}

export function DocPager({
  items,
  measureKey,
  ariaLabel = "Academic document pages",
  onApiReady,
}: {
  items: DocPagerItem[];
  /** Change this to force a re-measure (e.g. the reader font size). */
  measureKey?: string;
  ariaLabel?: string;
  onApiReady?: (api: DocPagerApi) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pendingScroll = useRef(false);
  const lastWidth = useRef(0);
  const [measured, setMeasured] = useState<{
    items: DocPagerItem[];
    measureKey?: string;
    heights: number[];
    budget: number;
  } | null>(null);
  const [page, setPage] = useState(0);

  // Staleness is derived during render: new items or a font-size change make
  // the previous measurement obsolete, so everything renders visible again
  // and the pre-paint pass below re-measures before the browser paints.
  const stale =
    !measured || measured.items !== items || measured.measureKey !== measureKey;

  // Measuring pass: all items are visible (nothing hidden yet), so each
  // wrapper's offsetHeight is its true laid-out height. Runs pre-paint.
  useIsoEffect(() => {
    if (!stale) return;
    const el = containerRef.current;
    if (!el || typeof window === "undefined") return;
    const heights = Array.from(el.children).map(
      (c) => (c as HTMLElement).offsetHeight,
    );
    setMeasured({ items, measureKey, heights, budget: pageBudgetFor(window.innerWidth) });
  }, [stale, items, measureKey]);

  // Viewport width changes re-flow every block → re-measure. Height-only
  // resizes (our own hide/show flips) are ignored to avoid loops.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    lastWidth.current = el.getBoundingClientRect().width;
    const ro = new ResizeObserver(() => {
      if (typeof window === "undefined") return;
      const width = el.getBoundingClientRect().width;
      if (Math.abs(width - lastWidth.current) > 1) {
        lastWidth.current = width;
        setMeasured(null);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [items]);

  // Web fonts reflow text after first paint → one extra measuring pass.
  useEffect(() => {
    const fonts = (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts;
    if (!fonts?.ready) return;
    let cancelled = false;
    fonts.ready.then(() => {
      if (!cancelled) setMeasured(null);
    });
    return () => {
      cancelled = true;
    };
  }, [items]);

  const pages = useMemo(() => {
    if (stale || !measured || measured.heights.length !== items.length) return null;
    return packDocPages(items, measured.heights, measured.budget);
  }, [stale, measured, items]);

  const pageOfItem = useMemo(() => {
    if (!pages) return null;
    const map = new Array<number>(items.length).fill(0);
    pages.forEach((idxs, pi) => idxs.forEach((i) => { map[i] = pi; }));
    return map;
  }, [pages, items.length]);

  // `page` may temporarily exceed the page count after a re-measure shrunk
  // the document; every consumer clamps through safePage, so no effect is
  // needed to normalize it.
  const goToSection = useCallback(
    (sectionId: string) => {
      if (!pages) return;
      const itemIndex = items.findIndex((it) => it.sectionId === sectionId);
      if (itemIndex < 0) return;
      const target = pages.findIndex((pageItems) => pageItems.includes(itemIndex));
      if (target < 0) return;
      pendingScroll.current = true;
      setPage(target);
    },
    [items, pages],
  );

  useEffect(() => {
    onApiReady?.({ goToSection, pageCount: pages?.length ?? 0 });
  }, [onApiReady, goToSection, pages]);

  // Smooth-scroll the freshly shown page card into view after a jump.
  useIsoEffect(() => {
    if (!pendingScroll.current) return;
    pendingScroll.current = false;
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [page]);

  const safePage = pages ? Math.min(page, pages.length - 1) : 0;

  const stepPage = (delta: number) => {
    if (!pages) return;
    pendingScroll.current = true;
    setPage((p) => Math.min(Math.max(p + delta, 0), pages.length - 1));
  };

  return (
    <div className="relative" data-doc-pager="">
      {/*
        The single page card. While a measuring pass is pending (`stale`),
        every item is visible so the pass reads true heights; afterwards,
        off-page items are hidden on screen but restored for Print / PDF
        (`hidden print:block`), so printing always outputs the whole document.
      */}
      <div
        role="group"
        aria-label={`${ariaLabel}${pages ? ` — page ${safePage + 1} of ${pages.length}` : ""}`}
        className="doc-page-card rounded-2xl border border-border/80 bg-card p-6 shadow-xs min-h-[480px] sm:min-h-[640px] sm:p-10 print:min-h-0 print:border-none print:bg-white print:p-0 print:shadow-none"
      >
        <div ref={containerRef} className="min-h-[440px] sm:min-h-[600px]">
          {items.map((it, i) => {
            const offPage = !stale && pageOfItem !== null && pageOfItem[i] !== safePage;
            return (
              <div
                key={it.key}
                data-doc-page-item={it.sectionId ?? undefined}
                className={`flow-root pb-5 ${offPage ? "hidden print:block" : ""}`}
              >
                {it.node}
              </div>
            );
          })}
        </div>
        {pages && (
          <p className="border-t border-border/60 pt-3 text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground print:hidden">
            Page {safePage + 1} of {pages.length}
          </p>
        )}
      </div>

      {/* Floating reader controls: prev / next with the page position. */}
      {pages && pages.length > 1 && (
        <nav
          aria-label="Document pages"
          className="sticky bottom-4 z-20 mt-5 flex justify-center print:hidden"
        >
          <div className="flex items-center gap-1.5 rounded-full border border-border/70 bg-background/95 py-1.5 pr-1.5 pl-2 shadow-lg backdrop-blur">
            <button
              type="button"
              onClick={() => stepPage(-1)}
              disabled={safePage === 0}
              title="Previous page"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs font-bold tabular-nums text-foreground">
              Page {safePage + 1}
              <span className="font-medium text-muted-foreground"> of {pages.length}</span>
            </span>
            <button
              type="button"
              onClick={() => stepPage(1)}
              disabled={safePage >= pages.length - 1}
              title="Next page"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
