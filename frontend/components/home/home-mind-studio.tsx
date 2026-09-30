import Link from "next/link";
import {
  ArrowRight,
  Atom,
  FileJson,
  MousePointerClick,
  Network,
  Tags,
} from "lucide-react";

/**
 * Mind Studio launcher — the home entry for the local mind-map workspace.
 *
 * Copy stays literal about what the feature actually does: nodes on a canvas,
 * deterministic classification that runs in the browser (no AI calls, no
 * network requests), a seeded Physics demo, JSON import/export, and
 * localStorage persistence. The preview on the right is a static mockup of the
 * workspace chrome — purely decorative, renders nothing interactive.
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
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-3.5 py-1.5 text-xs font-semibold text-violet-600 dark:text-violet-300">
              <Network className="h-3.5 w-3.5" />
              <span>Local workspace · no AI calls, no server round-trips</span>
            </div>

            <h2
              id="mind-studio-heading"
              className="mt-4 text-2xl sm:text-4xl font-black tracking-tight text-foreground leading-tight"
            >
              Mind Studio —{" "}
              <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
                map the concept, classify the fact
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
              Open a dark, glassy workspace where a chapter becomes a living
              map: drag, zoom and collapse concept nodes on a canvas with a
              minimap, then watch every fact get classified locally — domain →
              subject → topic → concept, with fact type, tags, confidence and
              plain-language reasoning. It all runs inside your browser:
              deterministic keyword rules, no AI service, no network requests.
            </p>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              You start from a seeded{" "}
              <span className="font-semibold text-foreground/80">
                Physics demo
              </span>{" "}
              — circular motion, centripetal force,{" "}
              <span className="font-mono">F = mv²/r</span>, a practice question
              and a gravity side-branch — then rename, add, or import your own
              map as JSON, export it back out, and keep your classifier
              overrides. Your map stays saved in this browser.
            </p>

            <ul className="mt-5 flex flex-wrap gap-2.5">
              <li className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-card/80 px-3 py-2 text-xs font-semibold text-foreground/80">
                <MousePointerClick className="h-3.5 w-3.5 text-sky-500" />
                Drag-and-drop canvas + minimap
              </li>
              <li className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-card/80 px-3 py-2 text-xs font-semibold text-foreground/80">
                <Tags className="h-3.5 w-3.5 text-violet-500" />
                Facts classified locally
              </li>
              <li className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-card/80 px-3 py-2 text-xs font-semibold text-foreground/80">
                <Atom className="h-3.5 w-3.5 text-cyan-500" />
                Seeded Physics demo
              </li>
              <li className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-card/80 px-3 py-2 text-xs font-semibold text-foreground/80">
                <FileJson className="h-3.5 w-3.5 text-emerald-500" />
                JSON import / export
              </li>
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                href="/mind-studio"
                className="group inline-flex h-11 items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-violet-500 px-6 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition-all hover:brightness-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
              >
                Open Mind Studio
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <p className="text-xs text-muted-foreground">
                Opens the full workspace — your map and overrides stay on this
                device.
              </p>
            </div>
          </div>

          {/* ── Decorative preview of the workspace chrome ─────────── */}
          <div
            aria-hidden="true"
            className="relative hidden select-none overflow-hidden rounded-3xl border border-white/10 bg-[#040916] shadow-2xl shadow-violet-500/10 lg:block"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
              <span className="text-xs font-medium text-slate-200">
                Mind Studio · demo map
              </span>
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>

            <div className="relative h-60 overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.14),transparent_50%)]">
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 410 240"
                preserveAspectRatio="none"
              >
                <line x1="54" y1="30" x2="201" y2="106" stroke="rgba(59,130,246,0.55)" strokeWidth="1.5" />
                <line x1="201" y1="106" x2="322" y2="50" stroke="rgba(168,85,247,0.55)" strokeWidth="1.5" />
                <line x1="201" y1="106" x2="333" y2="170" stroke="rgba(34,211,238,0.45)" strokeWidth="1.5" />
                <line x1="201" y1="106" x2="167" y2="186" stroke="rgba(236,72,153,0.45)" strokeWidth="1.5" />
              </svg>

              <span className="absolute left-4 top-4 rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-2.5 py-1.5 text-[11px] font-semibold text-cyan-100 backdrop-blur">
                Physics
              </span>
              <span className="absolute left-[136px] top-[92px] rounded-lg border border-sky-400/40 bg-sky-400/10 px-2.5 py-1.5 text-[11px] font-semibold text-sky-100 backdrop-blur">
                Circular Motion
              </span>
              <span className="absolute left-[276px] top-9 rounded-lg border border-violet-400/40 bg-violet-400/10 px-2.5 py-1.5 font-mono text-[11px] font-semibold text-violet-100 backdrop-blur">
                F = mv²/r
              </span>
              <span className="absolute left-[268px] top-[156px] rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-1.5 text-[11px] font-semibold text-emerald-100 backdrop-blur">
                centripetal force
              </span>
              <span className="absolute left-[112px] top-[172px] rounded-lg border border-fuchsia-400/40 bg-fuchsia-400/10 px-2.5 py-1.5 text-[11px] font-semibold text-fuchsia-100 backdrop-blur">
                gravity concept
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 bg-white/5 px-4 py-3">
              <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                Fact type · formula
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-emerald-300">
                confidence 98%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
