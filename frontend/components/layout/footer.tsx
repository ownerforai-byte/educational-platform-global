import Link from "next/link";
import { Atom, BookOpen, FlaskConical, GraduationCap, Instagram, Sparkles, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/60 backdrop-blur-xl mt-auto">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 sm:py-14">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* 1. Brand & Creator Info */}
          <div className="space-y-3.5">
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

            {/* Creator Attribution requested by user */}
            <div className="pt-2 border-t border-border/40">
              <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                <span>Made with curiosity by</span>
                <Link
                  href="https://www.instagram.com/___unxknown___player"
                  target="_blank"
                  rel="noopener noreferrer"
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
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors underline decoration-border hover:decoration-foreground"
                >
                  @___unxknown___player
                </Link>
              </p>
            </div>
          </div>

          {/* 2. Core Curriculum Shortcuts */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-primary" />
              <span>Syllabus &amp; Notes</span>
            </h4>
            <div className="flex flex-col space-y-2 text-xs">
              {[
                ["Class 11 Science Notes", "/class-11-notes"],
                ["Class 12 Science Notes", "/class-12-notes"],
                ["All Core Subjects", "/subjects"],
                ["Official CDC Syllabus", "/syllabus"],
                ["Theorem & Proof Bank", "/theorems"],
                ["Formula Derivations", "/derivations"],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* 3. Interactive Tools & CEE */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground flex items-center gap-1.5">
              <Atom className="h-3.5 w-3.5 text-primary" />
              <span>Interactive &amp; CEE</span>
            </h4>
            <div className="flex flex-col space-y-2 text-xs">
              {[
                ["Periodic Table 3D & CEE", "/periodic-table"],
                ["Virtual 3D Simulations", "/lab"],
                ["Interactive Mindmaps", "/mindmap"],
                ["NEB Practice Quiz", "/ai-quiz"],
                ["Curriculum Levels", "/levels"],
                ["Loksewa GK Portal", "/loksewa"],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* 4. Detailed NEB & CDC Curriculum Standards */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground flex items-center gap-1.5">
              <GraduationCap className="h-3.5 w-3.5 text-primary" />
              <span>Curriculum Standards</span>
            </h4>
            <div className="space-y-2 text-xs text-muted-foreground leading-relaxed">
              <div className="rounded-xl border border-border/70 bg-muted/20 p-3 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                    NEB
                  </span>
                  <span className="font-semibold text-foreground text-xs">
                    National Examinations Board
                  </span>
                </div>
                <p className="text-[11px]">
                  All chapter divisions, teaching hours, question weights, and numerical requirements strictly map to the official NEB Class 11 and 12 science curriculum.
                </p>
              </div>

              <div className="rounded-xl border border-border/70 bg-muted/20 p-3 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-sky-500/15 text-sky-600 dark:text-sky-400 font-bold text-[10px]">
                    CEE
                  </span>
                  <span className="font-semibold text-foreground text-xs">
                    Common Entrance Exam
                  </span>
                </div>
                <p className="text-[11px]">
                  Engineered with high-yield entrance shortcuts, memory traps, past questions (IOM, KU, MOE), and speed formulas for medical &amp; engineering entrance aspirants.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="mt-8 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>
            © 2026 Ravikisan&apos;s Platform. All educational contents aligned with NEB / CDC Nepal standards.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="https://www.instagram.com/___unxknown___player"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-pink-500 transition-colors"
            >
              <Instagram className="h-3.5 w-3.5" />
              <span>@___unxknown___player</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
