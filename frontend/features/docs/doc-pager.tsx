"use client";

/**
 * DocPager — the common page renderer for the Academic Docs Viewer.
 *
 * Owner request: document content used to flow as one endless article, which
 * made long topics feel random and tiring to read. DocPager expresses every
 * content block as bound paper pages instead:
 *
 *   1. Every item renders ONCE (single DOM — no hidden duplicate layer). Each
 *      wrapper is a `flow-root` block with a trailing gap, so its
 *      `offsetHeight` is the exact space it needs.
 *   2. A pre-paint measuring pass records the item heights; packDocPages
 *      greedily packs them into fixed-height pages — a block that does not
 *      fit moves to the next page.
 *   3. `keepWithNext` items (section headings, sub-labels) are never stranded
 *      at the bottom of a page; they travel to the next page together with
 *      the block that follows.
 *   4. The pages are bound like a book read vertically: every page is its own
 *      paper sheet with a thin boundary and a folio (page number) at the
 *      foot, stacked in reading order — scrolling down turns the pages.
 *
 * Re-measuring happens when the items change, the reader font size changes
 * (`measureKey`), the viewport width changes, or web fonts finish loading.
 * In jsdom/no-JS the measuring pass never runs, so every item stays visible
 * in one continuous flow — tests and SEO keep seeing the full document.
 */

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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
 * the budget gets a page of its own (the page sheet grows). Trailing
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

/**
 * Can this environment lay content out at all? Browsers yes; jsdom (tests)
 * and static rendering report `offsetHeight === 0` for everything, so the
 * two-phase measure-then-pack flow is pointless there — and its extra render
 * per document is pure memory churn across the 696-topic render gate. The
 * probe runs once and is cached for the process.
 */
let layoutProbeResult: boolean | null = null;
function supportsLayout(): boolean {
  if (typeof document === "undefined") return false;
  if (layoutProbeResult === null) {
    const probe = document.createElement("div");
    probe.setAttribute("style", "position:absolute;visibility:hidden;");
    probe.innerHTML = "<span style=\"display:inline-block;height:10px\">x</span>";
    document.body.appendChild(probe);
    layoutProbeResult = (probe.firstChild as HTMLElement | null)?.offsetHeight === 10;
    probe.remove();
  }
  return layoutProbeResult;
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
  const lastWidth = useRef(0);
  const layoutCapable = useMemo(() => supportsLayout(), []);
  const [measured, setMeasured] = useState<{
    items: DocPagerItem[];
    measureKey?: string;
    heights: number[];
    budget: number;
  } | null>(null);

  // Staleness is derived during render: new items or a font-size change make
  // the previous measurement obsolete, so everything renders in the plain
  // measuring flow again and the pre-paint pass below re-measures before the
  // browser paints. Environments without layout (jsdom, SSR) never measure.
  const stale =
    layoutCapable &&
    (!measured || measured.items !== items || measured.measureKey !== measureKey);

  // Measuring pass: all items are visible in one plain flow, so each
  // wrapper's offsetHeight is its true laid-out height. Runs pre-paint.
  useIsoEffect(() => {
    if (!stale) return;
    const flow = containerRef.current?.querySelector<HTMLElement>("[data-doc-measure]");
    if (!flow || typeof window === "undefined") return;
    const heights = Array.from(flow.children).map(
      (c) => (c as HTMLElement).offsetHeight,
    );
    setMeasured({ items, measureKey, heights, budget: pageBudgetFor(window.innerWidth) });
  }, [stale, items, measureKey]);

  // Viewport width changes re-flow every block → re-measure. Height-only
  // resizes (our own page flips) are ignored to avoid loops.
  useEffect(() => {
    if (!layoutCapable) return;
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
  }, [items, layoutCapable]);

  // Web fonts reflow text after first paint → one extra measuring pass.
  useEffect(() => {
    if (!layoutCapable) return;
    const fonts = (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts;
    if (!fonts?.ready) return;
    let cancelled = false;
    fonts.ready.then(() => {
      if (!cancelled) setMeasured(null);
    });
    return () => {
      cancelled = true;
    };
  }, [items, layoutCapable]);

  const pages = useMemo(() => {
    // No layout engine (jsdom, SSR): everything fits one page by definition,
    // rendered directly — one single render, no measuring pass.
    if (!layoutCapable) return [items.map((_, i) => i)];
    if (stale || !measured || measured.heights.length !== items.length) return null;
    return packDocPages(items, measured.heights, measured.budget);
  }, [layoutCapable, stale, measured, items]);

  const goToSection = useCallback(
    (sectionId: string) => {
      if (!pages) return;
      const itemIndex = items.findIndex((it) => it.sectionId === sectionId);
      if (itemIndex < 0) return;
      const target = pages.findIndex((pageItems) => pageItems.includes(itemIndex));
      if (target < 0) return;
      // The book is bound vertically: jumping to a section scrolls its page
      // sheet into view instead of swapping the content in place.
      containerRef.current
        ?.querySelector(`[data-doc-page="${target + 1}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [items, pages],
  );

  useEffect(() => {
    onApiReady?.({ goToSection, pageCount: pages?.length ?? 0 });
  }, [onApiReady, goToSection, pages]);

  return (
    <div ref={containerRef} className="relative" data-doc-pager="" aria-label={ariaLabel}>
      {!pages ? (
        /*
          Measuring flow: while a pass is pending every item renders visible
          in one plain column so the pre-paint effect reads true heights.
          The reader never sees this state — it is replaced before paint.
        */
        <div data-doc-measure="" className="flow-root">
          {items.map((it) => (
            <div key={it.key} className="flow-root pb-5">
              {it.node}
            </div>
          ))}
        </div>
      ) : (
        /*
          The bound book: paper sheets stacked vertically in reading order.
          Each sheet is a fixed-height page with a thin boundary; content
          that did not fit simply lives on the next sheet. Every sheet keeps
          a book folio at its foot and starts a new printed page.
        */
        <div className="flex flex-col gap-5 sm:gap-7">
          {pages.map((idxs, pi) => (
            <section
              key={`page-${pi + 1}`}
              data-doc-page={pi + 1}
              aria-label={`Page ${pi + 1} of ${pages.length}`}
              className="doc-page-sheet flex min-h-[480px] flex-col rounded-sm border border-border/70 bg-card px-5 py-7 shadow-xs sm:min-h-[760px] sm:px-9 sm:py-9 print:min-h-0 print:break-after-page print:border-border/40 print:shadow-none"
            >
              <div className="flow-root flex-1">
                {idxs.map((i) => (
                  <div
                    key={items[i].key}
                    data-doc-page-item={items[i].sectionId ?? undefined}
                    className="flow-root pb-5"
                  >
                    {items[i].node}
                  </div>
                ))}
              </div>
              <footer className="mt-3 border-t border-border/50 pt-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground print:hidden">
                Page {pi + 1} of {pages.length}
              </footer>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
