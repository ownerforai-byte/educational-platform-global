import Link from "next/link";
import {
  Atom,
  BookOpen,
  FlaskConical,
  GraduationCap,
  Instagram,
  Sparkles,
  ExternalLink,
  ListTree,
  LineChart,
  Binary,
  Layers,
  Workflow,
  Compass,
  Search,
  ShieldCheck,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/60 backdrop-blur-xl mt-auto">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 sm:py-14 space-y-10">
        {/* ── Main 4-Column Grid ── */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* 1. Brand & Creator Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-md shadow-primary/20"
                aria-label="Ravikisan's Platform home"
              >
                <span className="text-sm font-extrabold text-white">R</span>
              </div>
              <span className="font-bold text-sm tracking-tight text-foreground">
                Ravikisan&apos;s Platform
              </span>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Nepal&apos;s dedicated open-access educational platform for NEB (+2) Science students.
              Built to provide deep conceptual clarity with 3D simulations, interactive formula sheets,
              and CEE medical/engineering entrance integration.
            </p>

            {/* Quick Everything Index badge */}
            <div>
              <Link
                href="/site-index"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-primary/25 bg-primary/10 text-xs font-semibold text-primary hover:bg-primary/15 transition-all shadow-sm group"
              >
                <ListTree className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                <span>Everything Index — All Pages</span>
              </Link>
            </div>

            {/* Creator Attribution */}
            <div className="pt-3 border-t border-border/40">
              <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                <span>Made with curiosity by</span>
                <Link
                  href="https://www.instagram.com/___unxknown___player"
                  className="font-bold text-primary hover:underline inline-flex items-center gap-1 group transition-colors"
                >
                  <span>Ravikisan</span>
                  <ExternalLink className="h-2.5 w-2.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                </Link>
              </p>
              <p className="text-[11px] text-muted-foreground/70 mt-1 flex items-center gap-1.5">
                <Instagram className="h-3 w-3 text-pink-500" />
                <Link
                  href="https://www.instagram.com/___unxknown___player"
                  className="hover:text-foreground transition-colors underline decoration-border hover:decoration-foreground"
                >
                  @___unxknown___player
                </Link>
              </p>
            </div>
          </div>

          {/* 2. Core Curriculum & Spines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-primary" />
              <span>Curriculum &amp; Notes</span>
            </h4>
            <div className="flex flex-col space-y-2 text-xs">
              {[
                ["Class 11 Science Hub", "/class-11-notes"],
                ["Class 12 Science Hub", "/class-12-notes"],
                ["All 6 Core Subjects", "/subjects"],
                ["Official CDC Syllabus", "/syllabus"],
                ["Curriculum Levels & Tracks", "/levels"],
                ["Concept Legends & Facts", "/legend"],
                ["Notes Archive Collection", "/notes"],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center justify-between group"
                >
                  <span>{label}</span>
                  <span className="text-[10px] text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* 3. STEM Labs, Derivations & Rigor */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground flex items-center gap-1.5">
              <FlaskConical className="h-3.5 w-3.5 text-primary" />
              <span>STEM Labs &amp; Rigor</span>
            </h4>
            <div className="flex flex-col space-y-2 text-xs">
              {[
                ["Virtual 3D Simulations", "/lab"],
                ["3D Simulations Hub (96+)", "/lab/3d"],
                ["Cell Organelles 3D Suite", "/lab/bio-3d-organelles"],
                ["Science Graph Bank", "/graphs"],
                ["Practical Lab Manuals", "/practical"],
                ["Formula Derivations Studio", "/derivations"],
                ["Theorems & Formal Proofs", "/theorems"],
                ["Periodic Table 3D & CEE", "/periodic-table"],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center justify-between group"
                >
                  <span>{label}</span>
                  <span className="text-[10px] text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* 4. Knowledge, AI & Discovery */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Knowledge &amp; AI Tools</span>
            </h4>
            <div className="flex flex-col space-y-2 text-xs">
              {[
                ["Everything Index", "/site-index"],
                ["Pro Knowledge Suite", "/knowledge/pro"],
                ["AI Study Assistant", "/chat"],
                ["Adaptive AI Quiz Bank", "/ai-quiz"],
                ["Visual Concept Mindmaps", "/mindmap"],
                ["Loksewa GK Portal", "/loksewa"],
                ["World Knowledge Vault", "/world-knowledge"],
                ["Exam Countdown Timers", "/exam-countdown"],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center justify-between group"
                >
                  <span>{label}</span>
                  <span className="text-[10px] text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Curriculum Standards Alignment Banner ── */}
        <div className="grid gap-3 sm:grid-cols-2 rounded-2xl border border-border/70 bg-muted/20 p-4">
          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-black text-xs">
              NEB
            </span>
            <div className="space-y-0.5">
              <h5 className="font-semibold text-foreground text-xs">
                National Examinations Board Alignment
              </h5>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Unit breakdown, teaching hours, question weights, derivations, and practical experiments strictly map to the official NEB Class 11 &amp; 12 CDC curriculum.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-500/15 text-sky-600 dark:text-sky-400 font-black text-xs">
              CEE
            </span>
            <div className="space-y-0.5">
              <h5 className="font-semibold text-foreground text-xs">
                Common Entrance Exam Integration
              </h5>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Integrated with high-yield medical (MBBS/BDS) and engineering entrance formulas, memory mnemonics, PYQs, and speed calculation shortcuts.
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar & Quick Route Links ── */}
        <div className="pt-6 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p className="text-center md:text-left">
            © 2026 Ravikisan&apos;s Platform. All educational contents aligned with NEB / CDC Nepal standards.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px]">
            <Link href="/site-index" className="hover:text-primary transition-colors font-medium">
              Everything Index
            </Link>
            <span>·</span>
            <Link href="/syllabus" className="hover:text-primary transition-colors">
              Syllabus
            </Link>
            <span>·</span>
            <Link href="/practical" className="hover:text-primary transition-colors">
              Practicals
            </Link>
            <span>·</span>
            <Link href="/theorems" className="hover:text-primary transition-colors">
              Theorems
            </Link>
            <span>·</span>
            <Link href="/graphs" className="hover:text-primary transition-colors">
              Graphs
            </Link>
            <span>·</span>
            <Link href="/search" className="hover:text-primary transition-colors">
              Search
            </Link>
            <span>·</span>
            <Link
              href="https://www.instagram.com/___unxknown___player"
              className="inline-flex items-center gap-1 hover:text-pink-500 transition-colors"
            >
              <Instagram className="h-3 w-3" />
              <span>@___unxknown___player</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
