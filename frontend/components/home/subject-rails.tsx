"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Pause, Play } from "lucide-react";
import {
  HOME_SUBJECT_RAILS,
  type HomeSubjectRail,
  type HomeSubjectSlide,
} from "@/lib/home-subject-slides";

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
};

const TOTAL_SLIDES = HOME_SUBJECT_RAILS.reduce(
  (n, rail) => n + rail.slides.length,
  0,
);

export function SubjectRails({ stats = {} }: Props) {
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

  return (
    <div ref={rootRef}>
      <div className="mx-auto mt-7 max-w-6xl px-4">
        <p className="text-xs leading-relaxed text-muted-foreground">
          Six rails, {TOTAL_SLIDES} cards — each one drifts left on its own and
          loops forever, carrying only its own subject&apos;s knowledge. Cards
          are wide on purpose: concept, formula, conditions, special cases, a
          worked example, the limitation, the full derivation, the shortcut and
          the board question, in that order. Hover a rail to hold it, or use the
          pause switch in any rail&apos;s heading: the six are independent, so
          Physics can keep moving while Chemistry stops.
        </p>
      </div>

      <div className="mt-6 space-y-9">
        {HOME_SUBJECT_RAILS.map((rail) => (
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
  const Icon = rail.icon;

  return (
    <section
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
            onClick={() => setPaused((value) => !value)}
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
  const Icon = slide.icon;
  const stat = slide.statKey ? stats[slide.statKey] : undefined;

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
