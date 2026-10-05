import { Sparkles } from "lucide-react";
import { getFormulaSheetSummaries } from "@/lib/formula-sheet";
import { getSubjectPyqBank } from "@/lib/pyq-bank";
import { HOME_SUBJECT_RAILS } from "@/lib/home-subject-slides";
import { SubjectRails } from "./subject-rails";

/**
 * Six subject rails on the home page (owner request 2026-10-05):
 * "create 6 new interfaces on home where slides animate continuously … in
 * horizontal position … like going continuously through the end, and those
 * slides are of the 6 subjects — hints for exam, solved pyqs, formulas,
 * diagrams of biology … in their respective place".
 *
 * Server shell: it reads the platform's own counts (formula sheets + the PYQ
 * bank) and hands them to the client rails so a card can say "184 formulas · 14
 * units" or "196 solved · 10 yrs" without a single hard-coded number. A missing
 * count simply renders no badge — never a wrong one.
 *
 * Placement: straight after <HomeIntroduction /> (user choice 2026-10-05).
 */

const CLASS_SLUG = "class-11-notes";
/** Same 10-year window the PYQ bank page advertises, so the numbers match. */
const MAX_YEARS = 10;

/** The six rail subjects — read straight from the slide data, never duplicated. */
const RAIL_SUBJECT_SLUGS = HOME_SUBJECT_RAILS.map((rail) => rail.slug);

type RailStats = Record<string, string>;

async function collectRailStats(): Promise<RailStats> {
  const stats: RailStats = {};

  // Formula sheets (physics, mathematics, chemistry) — already read by the
  // intro on this same page, so loadData's module cache makes this cheap.
  try {
    const summaries = await getFormulaSheetSummaries();
    for (const summary of summaries) {
      stats[`formula:${summary.slug}`] =
        `${summary.formulaCount} formulas · ${summary.unitCount} units`;
    }
  } catch {
    // Notes tree unavailable (stripped build) — formula cards render without counts.
  }

  // Solved PYQ counts, one read per subject, failures isolated per subject.
  await Promise.all(
    RAIL_SUBJECT_SLUGS.map(async (subjectSlug) => {
      try {
        const { pyqs } = await getSubjectPyqBank(
          CLASS_SLUG,
          subjectSlug,
          MAX_YEARS,
        );
        const questions = pyqs.reduce(
          (total, year) => total + year.questions.length,
          0,
        );
        if (questions > 0) {
          stats[`pyq:${subjectSlug}`] =
            `${questions} solved · ${pyqs.length} yrs`;
        }
      } catch {
        // Subject bank unavailable — the PYQ card shows no badge.
      }
    }),
  );

  return stats;
}

export async function HomeSubjectRails() {
  const stats = await collectRailStats();

  return (
    <section className="relative border-b border-border/60 py-14 sm:py-16">
      <div className="absolute top-4 left-1/4 h-64 w-64 rounded-full bg-violet-500/5 blur-[110px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Six subjects · six continuous streams</span>
          </div>

          <h2 className="mt-4 text-2xl sm:text-4xl font-black tracking-tight text-foreground leading-tight">
            Each subject keeps its own lane of knowledge{" "}
            <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
              moving, slide after slide
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
            Every card below is a full Class 11 knowledge card, not a link
            blurb: the concept, its formula, the conditions it holds under, the
            special cases, a worked example, where the idea breaks down, the
            full derivation, the exam shortcut and exactly how the board asks it
            — Physics, Chemistry, Biology, Mathematics, English and Nepali, each
            in its own lane. The slides never stop: one crosses the screen,
            reaches the very end and keeps going as the next one follows, so the
            stream only ever reads as continuous. Class 12 cards join these rails
            later; one placeholder per rail already says so.
          </p>
        </div>
      </div>

      <SubjectRails stats={stats} />
    </section>
  );
}
