import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/60 backdrop-blur-xl mt-auto">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 sm:py-10">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-md shadow-primary/20"
                aria-label="Ravikisan's Platform home"
              >
                <span className="text-sm font-extrabold text-white">R</span>
              </div>
              <span className="font-bold text-sm tracking-tight text-foreground">
                Ravikisan's Platform
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Empowering NEB (+2) students across Nepal with free, syllabus-aligned
              learning resources — notes, mind maps, labs, and more.
            </p>
            <p className="text-xs text-muted-foreground/60">
              Made with care by{" "}
              <Link
                href="https://www.instagram.com/___unxknown___player"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground hover:text-primary transition-colors underline decoration-primary/30 hover:decoration-primary underline-offset-4"
              >
                Ravikishan
              </Link>
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Navigate
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                ["Class 11", "/class-11"],
                ["Class 12", "/class-12"],
                ["Subjects", "/subjects"],
                ["Lab", "/lab"],
                ["Loksewa", "/loksewa"],
                ["World Knowledge", "/world-knowledge"],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Standards */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Educational Standards
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">N</span>
                <span>
                  <strong className="text-foreground">NEB</strong> — National Examination Board
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 font-bold text-[10px]">C</span>
                <span>
                  <strong className="text-foreground">CDC</strong> — Curriculum Development Centre
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground/60 leading-relaxed">
              Content aligned with official Nepal education guidelines for Class 11 & 12.
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-border/40 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground/60">
            © 2026 Ravikisan's Platform · Owner:{" "}
            <Link
              href="https://www.instagram.com/___unxknown___player"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Ravikishan
            </Link>
            · All rights reserved
          </p>
          <Link
            href="https://www.instagram.com/___unxknown___player"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground/50 hover:text-primary transition-colors"
          >
            Instagram: @___unxknown___player
          </Link>
        </div>
      </div>
    </footer>
  );
}
