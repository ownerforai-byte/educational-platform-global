"use client";

/**
 * TopicKnowledgeFloat — wraps any drawing sheet (DerivationVisual, etc.) so
 * the topic's knowledge floats OVER the drawing instead of living in a
 * separate box below it.
 *
 * - A compact symbol chip (§ ƒ ✎ ★ ⚠) sits above the sheet; hovering or
 *   clicking it shows the rectangular knowledge block pinned inside the
 *   sheet's top-right corner. Click pins it open, ✕ / Esc closes.
 * - The symbol → meaning legend is rendered permanently below the sheet —
 *   meanings never hide, only the symbol-bearing rows do.
 * - Renders nothing extra when there are no rows (children pass through).
 *
 * Rows cross the RSC boundary, so `text` must be a plain string.
 */

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { BookMarked } from "lucide-react";
import {
  KnowledgeBlock,
  SymbolLegend,
  KNOWLEDGE_SYMBOLS,
  type KnowledgeRow,
} from "@/components/lab/knowledge-block";

export interface TopicKnowledgeRow {
  symbol: string;
  text: string;
  mono?: boolean;
}

interface TopicKnowledgeFloatProps {
  title: string;
  /** Accent colour for the block dot / border (topic or subject colour). */
  color?: string;
  rows: TopicKnowledgeRow[];
  children: ReactNode;
}

export function TopicKnowledgeFloat({
  title,
  color = "hsl(var(--primary))",
  rows,
  children,
}: TopicKnowledgeFloatProps) {
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    },
    [],
  );

  if (rows.length === 0) return <>{children}</>;

  const visible = pinned || hovered;

  const cancelHide = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  };
  const scheduleHide = () => {
    cancelHide();
    // Small grace period so the pointer can travel chip → block.
    hideTimer.current = setTimeout(() => setHovered(false), 180);
  };
  const enter = (e: ReactPointerEvent<HTMLElement>) => {
    if (e.pointerType === "touch") return; // touch uses tap-to-pin only
    cancelHide();
    setHovered(true);
  };

  const close = () => {
    setPinned(false);
    setHovered(false);
  };

  const kbRows: KnowledgeRow[] = rows.map((r) => ({
    symbol: r.symbol,
    text: r.text,
    mono: r.mono,
  }));

  return (
    <div className="viz-in relative">
      <div className="flex justify-end">
        <button
          type="button"
          aria-expanded={visible}
          aria-pressed={pinned}
          onClick={() => setPinned((p) => !p)}
          onPointerEnter={enter}
          onPointerLeave={scheduleHide}
          onFocus={cancelHide}
          className="group inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/80 px-2.5 py-1 text-[11px] font-bold text-muted-foreground shadow-sm backdrop-blur-sm transition-all hover:border-primary/50 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <BookMarked className="h-3.5 w-3.5 text-primary" aria-hidden />
          <span className="hidden sm:inline">topic knowledge</span>
          <span aria-hidden className="font-black tracking-widest text-foreground/80">
            {KNOWLEDGE_SYMBOLS.map((s) => s.glyph).join("")}
          </span>
        </button>
      </div>

      <div className="relative mt-2">
        {children}

        {visible && (
          <KnowledgeBlock
            title={title}
            color={color}
            rows={kbRows}
            onClose={close}
            onPointerEnter={cancelHide}
            onPointerLeave={scheduleHide}
            style={{
              position: "absolute",
              top: "0.75rem",
              right: "0.75rem",
              zIndex: 20,
              width: "min(21rem, calc(100% - 1.5rem))",
              maxHeight: "min(60%, 22rem)",
            }}
          />
        )}
      </div>

      <SymbolLegend hint="hover / tap the knowledge chip" />
    </div>
  );
}
