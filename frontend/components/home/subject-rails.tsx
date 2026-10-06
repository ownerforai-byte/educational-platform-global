"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Pause, Play } from "lucide-react";
import {
  HOME_SUBJECT_RAILS,
  resolveRailIcon,
  type HomeSubjectRail,
  type HomeSubjectSlide,
} from "@/lib/home-subject-slides";
import {
  normalizeRailOffset,
  parseDurationSecs,
  railResumeDelaySecs,
  resumeTrackFromFreeze,
} from "@/lib/rail-motion";

/**
 * The six continuous subject rails (owner request 2026-10-05).
 *
 * Motion model — pure CSS, no scroll listeners:
 *   • each rail is a `<ul>` holding the slide set twice; the track animates
 *     `translateX(0 → -50%)`, so a slide travels all the way through the right
 *     edge, off the left edge, and the copy behind it takes over with no cut;
 *   • every rail carries its own **Pause / Play** switch in its heading — the
 *     six are independent (`aria-pressed` mirrors the state), so one subject can
 *     hold still while the other five keep moving;
 *   • hovering or keyboard-focusing a rail pauses just that rail;
 *   • an IntersectionObserver freezes rails that scrolled out of view, so six
 *     infinite animations never burn battery off-screen;
 *   • `prefers-reduced-motion` disables the animation entirely and the viewport
 *     becomes a normal horizontal scroller (see globals.css).
 */

type Props = {
  /** Real counts keyed by `statKey` (see home-subject-slides.ts). */
  stats?: Record<string, string>;
  /**
   * Rails to stream — the server wrapper merges agent-authored corpus cards
   * into HOME_SUBJECT_RAILS and passes the result. Defaults to the built-in
   * rails so the component also renders standalone (tests, previews).
   */
  rails?: HomeSubjectRail[];
};

export function SubjectRails({
  stats = {},
  rails = HOME_SUBJECT_RAILS,
}: Props) {
  const totalSlides = rails.reduce((n, rail) => n + rail.slides.length, 0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;

    const viewports =
      root.querySelectorAll<HTMLElement>(".subject-rail-viewport");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle(
            "is-rail-offscreen",
            !entry.isIntersecting,
          );
        }
      },
      { rootMargin: "160px 0px" },
    );
    viewports.forEach((viewport) => observer.observe(viewport));
    return () => observer.disconnect();
  }, []);

  /* Swipe / drag to scrub a rail: press and slide left or right to move the
     stream by hand — cards that already left through the left edge come back
     by swiping right, because the track wraps every loop. Release and the
     rail resumes drifting on its own (in phase, no snap), unless its Pause
     switch is on, in which case it holds exactly where it was dropped. The
     click ending a real drag is swallowed so a card link never fires.
     Reduced-motion readers get the native horizontal scroller instead, so no
     drag handling is attached for them. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const cleanups: (() => void)[] = [];
    root
      .querySelectorAll<HTMLElement>(".subject-rail-viewport")
      .forEach((viewport) => {
        const track = viewport.querySelector<HTMLElement>(".subject-rail-track");
        if (!track) return;

        let activePointer = -1;
        let dragging = false;
        let suppressClick = false;
        let startX = 0;
        let startTx = 0;
        let lastTx = 0;

        const readTx = (): number => {
          const matrix = new DOMMatrixReadOnly(
            getComputedStyle(track).transform,
          );
          return Number.isFinite(matrix.m41) ? matrix.m41 : 0;
        };
        const freeze = (tx: number) => {
          track.style.animation = "none";
          track.style.transform = `translate3d(${tx}px, 0, 0)`;
        };

        const onPointerDown = (event: PointerEvent) => {
          if (!event.isPrimary || activePointer !== -1) return;
          activePointer = event.pointerId;
          dragging = false;
          suppressClick = false;
          startX = event.clientX;
          // Read the live position BEFORE killing the animation: a running
          // or paused CSS animation overrides inline styles, so this order
          // is what keeps the grab from jumping.
          startTx = readTx();
          lastTx = startTx;
          try {
            viewport.setPointerCapture(event.pointerId);
          } catch {
            /* pointer already released — the up handler no-ops */
          }
        };
        const onPointerMove = (event: PointerEvent) => {
          if (event.pointerId !== activePointer) return;
          const dx = event.clientX - startX;
          if (!dragging) {
            if (Math.abs(dx) < 6) return;
            dragging = true;
            freeze(startTx);
            viewport.dataset.dragging = "true";
          }
          lastTx = normalizeRailOffset(startTx + dx, track.scrollWidth / 2);
          track.style.transform = `translate3d(${lastTx}px, 0, 0)`;
        };
        const endDrag = (event: PointerEvent) => {
          if (event.pointerId !== activePointer) return;
          activePointer = -1;
          if (!dragging) return;
          dragging = false;
          delete viewport.dataset.dragging;
          suppressClick = true;
          window.setTimeout(() => {
            suppressClick = false;
          }, 0);
          if (
            track
              .closest("section")
              ?.classList.contains("subject-rail-paused") ??
            false
          ) {
            // Button-paused: hold exactly where dropped; unpausing resumes
            // the loop from there (see the Pause switch below).
            freeze(lastTx);
            return;
          }
          const duration = parseDurationSecs(
            track.style.animationDuration ||
              getComputedStyle(track).animationDuration,
          );
          track.style.animationDelay = `-${railResumeDelaySecs(lastTx, track.scrollWidth / 2, duration)}s`;
          track.style.animation = "";
        };
        const onClickCapture = (event: MouseEvent) => {
          if (!suppressClick) return;
          suppressClick = false;
          event.preventDefault();
          event.stopPropagation();
        };

        viewport.addEventListener("pointerdown", onPointerDown);
        viewport.addEventListener("pointermove", onPointerMove);
        viewport.addEventListener("pointerup", endDrag);
        viewport.addEventListener("pointercancel", endDrag);
        viewport.addEventListener("click", onClickCapture, true);
        cleanups.push(() => {
          viewport.removeEventListener("pointerdown", onPointerDown);
          viewport.removeEventListener("pointermove", onPointerMove);
          viewport.removeEventListener("pointerup", endDrag);
          viewport.removeEventListener("pointercancel", endDrag);
          viewport.removeEventListener("click", onClickCapture, true);
        });
      });
    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div ref={rootRef}>
      <div className="mx-auto mt-7 max-w-6xl px-4">
        <p className="text-xs leading-relaxed text-muted-foreground">
          Six rails, {totalSlides} cards and unit dividers — each one drifts left on its own and
          loops forever, carrying only its own subject&apos;s knowledge, grouped
          by syllabus unit so a unit&apos;s cards always travel together behind
          their divider. Cards
          are wide on purpose: concept, formula, conditions, special cases, a
          worked example, the limitation, the full derivation, the shortcut and
          the board question, in that order. Hover a rail to hold it, drag it
          either way to scrub the stream by hand — swipe right to pull back
          cards that already passed — or use the pause switch in any rail&apos;s
          heading: the six are independent, so Physics can keep moving while
          Chemistry stops.
        </p>
      </div>

      <div className="mt-6 space-y-9">
        {rails.map((rail) => (
          <SubjectRailSection key={rail.slug} rail={rail} stats={stats} />
        ))}
      </div>
    </div>
  );
}

function SubjectRailSection({
  rail,
  stats,
}: {
  rail: HomeSubjectRail;
  stats: Record<string, string>;
}) {
  // Independent per-rail on/off — pausing one rail never touches the other five.
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const Icon = resolveRailIcon(rail.icon);

  return (
    <section
      ref={sectionRef}
      aria-label={`${rail.name} — continuous knowledge slides`}
      className={paused ? "subject-rail-paused" : undefined}
    >
      {/* Rail heading */}
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${rail.accent.soft} ${rail.accent.icon}`}
          >
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <h3 className="text-lg font-black tracking-tight text-foreground sm:text-xl">
              {rail.name}
            </h3>
            <p className="truncate text-xs text-muted-foreground">
              {rail.tagline}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {/* This rail's own pause/play switch. */}
          <button
            type="button"
            onClick={() =>
              setPaused((value) => {
                if (value) {
                  // Resuming: drop any drag-freeze so the CSS loop takes over
                  // in phase from the dropped position (see rail-motion.ts).
                  const track =
                    sectionRef.current?.querySelector<HTMLElement>(
                      ".subject-rail-track",
                    );
                  if (track) resumeTrackFromFreeze(track);
                }
                return !value;
              })
            }
            aria-pressed={paused}
            aria-label={
              paused
                ? `Play the ${rail.name} slides`
                : `Pause the ${rail.name} slides`
            }
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition-colors ${
              paused
                ? "border-primary/50 bg-primary/10 text-primary"
                : "border-border/70 bg-card text-foreground/70 hover:border-primary/50 hover:text-primary"
            }`}
          >
            {paused ? (
              <Play className="h-3.5 w-3.5" aria-hidden />
            ) : (
              <Pause className="h-3.5 w-3.5" aria-hidden />
            )}
            {paused ? "Play" : "Pause"}
          </button>

          <Link
            href={`/class-11-notes/${rail.slug}`}
            className={`group inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition-colors ${rail.accent.chip} ${rail.accent.border}`}
          >
            Open {rail.name}
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </div>

      {/* Full-bleed viewport: slides travel through both screen edges. */}
      <div className="subject-rail-viewport relative -mx-4 mt-4 overflow-hidden md:-mx-6 lg:-mx-8">
        <ul
          className="subject-rail-track flex w-max list-none"
          style={{ animationDuration: rail.duration }}
        >
          {rail.slides.map((slide, index) => (
            <SlideCard
              key={`${rail.slug}-${index}`}
              rail={rail}
              slide={slide}
              stats={stats}
            />
          ))}
          {/* The identical second set is what makes the loop seamless — it is
              hidden from screen readers and skipped by the Tab key. */}
          {rail.slides.map((slide, index) => (
            <SlideCard
              key={`${rail.slug}-dup-${index}`}
              rail={rail}
              slide={slide}
              stats={stats}
              duplicate
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function SlideCard({
  rail,
  slide,
  stats,
  duplicate = false,
}: {
  rail: HomeSubjectRail;
  slide: HomeSubjectSlide;
  stats: Record<string, string>;
  duplicate?: boolean;
}) {
  const Icon = resolveRailIcon(slide.icon);
  const stat = slide.statKey ? stats[slide.statKey] : undefined;

  // Unit divider: the slim section header that opens each syllabus-unit
  // group in the stream (same loop mechanics, same duplicate treatment).
  if (slide.unitDivider) {
    return (
      <li
        className={`me-4 shrink-0 self-center${duplicate ? " subject-rail-duplicate" : ""}`}
      >
        <Link
          href={slide.href}
          aria-hidden={duplicate || undefined}
          tabIndex={duplicate ? -1 : undefined}
          aria-label={
            duplicate
              ? undefined
              : `${slide.unitDivider.unitTitle} — ${slide.unitDivider.meta}`
          }
          className={`group relative flex w-[13rem] flex-col justify-center gap-1 overflow-hidden rounded-2xl border border-dashed bg-card/60 p-4 backdrop-blur-sm transition-all hover:-translate-y-1 sm:w-[16rem] sm:p-5 ${rail.accent.border}`}
        >
          <span
            className={`text-[10px] font-bold uppercase tracking-wider ${rail.accent.text}`}
          >
            {slide.tag}
          </span>
          <span className="text-base font-black leading-snug tracking-tight text-foreground sm:text-lg">
            {slide.unitDivider.unitTitle}
          </span>
          <span className="text-[11px] font-semibold text-muted-foreground">
            {slide.unitDivider.meta}
          </span>
          <span
            className={`relative inline-flex items-center gap-1 text-[11px] font-bold ${rail.accent.text}`}
          >
            Open
            <ArrowRight
              className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
        </Link>
      </li>
    );
  }

  return (
    <li
      className={`me-4 shrink-0${duplicate ? " subject-rail-duplicate" : ""}`}
    >
      <Link
        href={slide.href}
        aria-hidden={duplicate || undefined}
        tabIndex={duplicate ? -1 : undefined}
        className={`group relative flex h-full w-[19rem] flex-col gap-3 overflow-hidden rounded-2xl border bg-card/80 p-4 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-lg sm:w-[31rem] sm:p-5 xl:w-[36rem] ${
          slide.teaser ? "border-dashed" : ""
        } ${rail.accent.border}`}
      >
        <span
          aria-hidden
          className={`pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full opacity-70 blur-2xl ${rail.accent.glow}`}
        />

        <div className="relative flex items-start justify-between gap-2">
          <span className="inline-flex items-center gap-2">
            <span
              className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${rail.accent.soft} ${rail.accent.icon}`}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span
              className={`whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${rail.accent.chip}`}
            >
              {slide.tag}
            </span>
          </span>

          {stat ? (
            <span className="whitespace-nowrap pt-0.5 font-mono text-[10px] font-semibold text-muted-foreground/80">
              {stat}
            </span>
          ) : null}
        </div>

        <h4 className="relative text-base font-black leading-snug tracking-tight text-foreground sm:text-lg">
          {slide.title}
        </h4>

        {/* Eight labelled rows: Concept → Formula → Conditions → Special cases
            → Solved → Limit → Derivation → Trick → Board use (the data file
            names them per card, e.g. नेपाली uses सूत्र / अपवाद / उदाहरण). */}
        <dl className="relative flex flex-1 flex-col gap-2">
          {slide.rows.map((row, rowIndex) =>
            row.kind === "formula" ? (
              <div key={`${row.label}-${rowIndex}`} className="grid gap-1">
                <dt className="text-[9.5px] font-bold uppercase tracking-wider text-muted-foreground/70">
                  {row.label}
                </dt>
                <dd className="whitespace-pre-wrap break-words rounded-lg border border-border/60 bg-background/60 px-2.5 py-1.5 font-mono text-[11.5px] leading-relaxed text-foreground/90">
                  {row.text}
                </dd>
              </div>
            ) : (
              <div
                key={`${row.label}-${rowIndex}`}
                className="grid gap-0.5 border-t border-border/40 pt-2 first:border-0 first:pt-0 sm:grid-cols-[6.5rem_1fr] sm:gap-x-3"
              >
                <dt className="text-[9.5px] font-bold uppercase tracking-wider text-muted-foreground/70 sm:pt-1">
                  {row.label}
                </dt>
                <dd className="text-[12px] leading-relaxed text-muted-foreground">
                  {row.text}
                </dd>
              </div>
            ),
          )}
        </dl>

        <span
          className={`relative inline-flex items-center gap-1 text-[11px] font-bold ${rail.accent.text}`}
        >
          Open
          <ArrowRight
            className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </Link>
    </li>
  );
}
