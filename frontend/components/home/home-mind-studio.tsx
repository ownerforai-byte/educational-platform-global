import Link from "next/link";
import {
  ArrowRight,
  Download,
  History as HistoryIcon,
  MousePointerClick,
  Sparkles,
} from "lucide-react";

/**
 * Diagram Hub launcher — the home entry for the drawing studio (owner request
 * 2026-10-02: the Mind Studio workspace became the hub; renamed Diagram Hub on
 * 2026-10-07, when the owner asked that no vendor name and no "AI" wording
 * appear anywhere in it). The server drawing engine runs first, puter.js in
 * the browser is the fallback; owner emails only since 2026-10-05.
 *
 * The section renders inside <OwnerOnly> on the home page, so the copy speaks
 * to the owner, not to the student. The preview on the right is a static
 * mockup of a gallery card — purely decorative, renders nothing interactive.
 */
export function HomeMindStudio() {
  return (
    <section
      aria-labelledby="mind-studio-heading"
      className="relative border-b border-border/60 py-14 sm:py-16"
    >
      <div className="absolute top-6 left-1/4 h-64 w-64 rounded-full bg-violet-500/5 blur-[110px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/5 h-56 w-56 rounded-full bg-sky-500/5 blur-[110px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
          {/* ── Copy + CTA ─────────────────────────────────────────── */}
          <div>
            <h2
              id="mind-studio-heading"
              className="mt-4 text-2xl sm:text-4xl font-black tracking-tight text-foreground leading-tight"
            >
              <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
                Diagram Hub
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
              Type what you want to see — a labelled diagram, a structure, an
              apparatus, a nature scene — and the hub draws it on the server.
              The picture lands in a gallery with a download button, newest
              first, saved to your account.
            </p>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              When the server engine is busy, the same prompt retries{" "}
              <span className="font-semibold text-foreground/80">
                in your browser through puter.js
              </span>{" "}
              — its User-Pays model costs the platform nothing and needs no
              key. Every drawing is saved to your account history: newest
              first, ready to download on any device you sign in from.
            </p>

            <ul className="mt-5 flex flex-wrap gap-2.5">
              <li className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-card/80 px-3 py-2 text-xs font-semibold text-foreground/80">
                <Sparkles className="h-3.5 w-3.5 text-violet-500" />
                Server drawing engine
              </li>
              <li className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-card/80 px-3 py-2 text-xs font-semibold text-foreground/80">
                <MousePointerClick className="h-3.5 w-3.5 text-sky-500" />
                puter.js browser fallback
              </li>
              <li className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-card/80 px-3 py-2 text-xs font-semibold text-foreground/80">
                <Download className="h-3.5 w-3.5 text-emerald-500" />
                Gallery + downloads
              </li>
              <li className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-card/80 px-3 py-2 text-xs font-semibold text-foreground/80">
                <HistoryIcon className="h-3.5 w-3.5 text-amber-500" />
                History saved to your account
              </li>
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                href="/mind-studio"
                className="group inline-flex h-11 items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-violet-500 px-6 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition-all hover:brightness-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
              >
                Open Diagram Hub
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <p className="text-xs text-muted-foreground">
                Owner-only studio — drawings burn the platform key and the
                gallery is saved to your owner account.
              </p>
            </div>
          </div>

          {/* ── Decorative preview: a gallery card ──────────────────── */}
          <div
            aria-hidden="true"
            className="relative hidden select-none overflow-hidden rounded-3xl border border-white/10 bg-[#040916] shadow-2xl shadow-violet-500/10 lg:block"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
              <span className="text-xs font-medium text-slate-200">
                Diagram Hub · gallery
              </span>
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </div>

            <div className="relative h-60 overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.2),transparent_50%)]">
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 410 240"
                preserveAspectRatio="none"
              >
                {/* stylised mountain + sun "generated picture" */}
                <circle cx="320" cy="64" r="26" fill="rgba(250,204,21,0.75)" />
                <path
                  d="M0 240 L120 96 L190 172 L250 118 L410 240 Z"
                  fill="rgba(148,163,184,0.35)"
                />
                <path
                  d="M0 240 L96 140 L188 240 Z"
                  fill="rgba(148,163,184,0.55)"
                />
              </svg>

              <span className="absolute left-4 top-4 rounded-lg border border-sky-400/40 bg-sky-400/10 px-2.5 py-1 text-[11px] font-semibold text-sky-100 backdrop-blur">
                server draw
              </span>
              <span className="absolute left-4 bottom-12 rounded-lg border border-violet-400/40 bg-violet-400/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-violet-100 backdrop-blur">
                512 × 512
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 bg-white/5 px-4 py-3">
              <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                prompt · himalayan dawn
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-emerald-300">
                ready · download
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
