"use client";

/**
 * Hotspot — guided "call-out tour" overlay for flagship labs.
 *
 * Drop <Hotspots> inside the visual's `relative` container. Each step is a
 * clickable marker pinned at a % coordinate; clicking it (or "next") reveals
 * a short explanation card, walking the learner through the scene in order.
 * A "Skip tour" control dismisses it. Pure 2D HTML overlay — no three.js.
 *
 *   <Hotspots
 *     steps={[
 *       { x: 50, y: 30, title: "Origin", body: "..." },
 *       { x: 70, y: 55, title: "Vector A", body: "..." },
 *     ]}
 *     autoStart
 *   />
 */
import { useCallback, useEffect, useState } from "react";
import { X, ChevronRight, Sparkles } from "lucide-react";

export interface HotspotStep {
  /** Horizontal % position inside the container (0–100). */
  x: number;
  /** Vertical % position inside the container (0–100). */
  y: number;
  /** Short title shown in the callout card. */
  title: string;
  /** Explanation body. */
  body: string;
}

export interface HotspotsProps {
  steps: HotspotStep[];
  /** Begin with the first callout open (guided mode). */
  autoStart?: boolean;
  /** A stable id to key this tour (so sibling tours don't collide). */
  tourId?: string;
}

export function Hotspots({ steps, autoStart = false, tourId = "tour" }: HotspotsProps) {
  const [open, setOpen] = useState<boolean>(autoStart);
  const [active, setActive] = useState<number>(autoStart ? 0 : -1);

  const close = useCallback(() => {
    setOpen(false);
    setActive(-1);
  }, []);

  const next = useCallback(() => {
    if (active >= steps.length - 1) close();
    else setActive((i) => i + 1);
  }, [active, steps.length, close]);

  const prev = useCallback(() => setActive((i) => Math.max(0, i - 1)), []);

  // Optional auto-dismiss on unmount-safe Esc.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, next, prev, close]);

  if (steps.length === 0) return null;
  const step = active >= 0 ? steps[active] : null;

  return (
    <div className="pointer-events-none absolute inset-0 z-30">
      {/* Markers */}
      {open &&
        steps.map((s, i) => {
          const isActive = i === active;
          return (
            <button
              key={`${tourId}-${i}`}
              type="button"
              onClick={() => (isActive ? next() : setActive(i))}
              className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
              aria-label={s.title}
            >
              <span
                className={`grid h-6 w-6 place-items-center rounded-full border-2 text-[11px] font-bold transition-all ${
                  isActive
                    ? "scale-110 border-amber-400 bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/40"
                    : "border-white/80 bg-slate-900/80 text-white hover:scale-110"
                }`}
              >
                {i + 1}
              </span>
            </button>
          );
        })}

      {/* Callout card */}
      {step && (
        <div
          key={`card-${tourId}-${active}`}
          className="pointer-events-auto absolute z-40 w-64 -translate-x-1/2 rounded-xl border border-amber-400/40 bg-slate-900/95 p-3 text-slate-100 shadow-2xl backdrop-blur"
          style={{
            left: `clamp(5.5rem, ${step.x}%, calc(100% - 5.5rem))`,
            top: `${Math.max(6, Math.min(step.y + 6, 78))}%`,
          }}
        >
          <div className="flex items-start gap-2">
            <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-amber-500/20 text-amber-300">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-amber-200">{step.title}</div>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-300">{step.body}</p>
            </div>
            <button
              onClick={close}
              className="shrink-0 rounded p-0.5 text-slate-400 hover:text-white"
              aria-label="Skip tour"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-500">
              {active + 1} / {steps.length}
            </span>
            <div className="flex items-center gap-1">
              {active > 0 && (
                <button
                  onClick={prev}
                  className="rounded-md border border-slate-600 px-2 py-0.5 text-[10px] text-slate-300 hover:bg-slate-700"
                >
                  Back
                </button>
              )}
              <button
                onClick={next}
                className="inline-flex items-center gap-1 rounded-md bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-slate-900 hover:bg-amber-400"
              >
                {active >= steps.length - 1 ? "Done" : "Next"}
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reopen pill when the tour is closed */}
      {!open && (
        <button
          onClick={() => {
            setOpen(true);
            setActive(0);
          }}
          className="pointer-events-auto absolute left-2 top-2 inline-flex items-center gap-1.5 rounded-lg border border-amber-400/40 bg-slate-900/85 px-2.5 py-1.5 text-[11px] font-semibold text-amber-200 backdrop-blur hover:bg-slate-800"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Guided tour
        </button>
      )}
    </div>
  );
}
