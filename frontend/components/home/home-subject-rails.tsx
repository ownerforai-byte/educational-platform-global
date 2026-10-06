import { Sparkles } from "lucide-react";
import { getFormulaSheetSummaries } from "@/lib/formula-sheet";
import { getSubjectPyqBank } from "@/lib/pyq-bank";
import {
  HOME_SUBJECT_RAILS,
  type HomeSubjectRail,
  type HomeSubjectSlide,
} from "@/lib/home-subject-slides";
import {
  HOME_RAIL_CLASS_12_SLUG,
  groupReadyByUnit,
  loadHomeRailCorpus,
  toRailSlideData,
  type HomeRailEntry,
} from "@/lib/home-rails-corpus";
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
  const rails = mergeCorpusRails();

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

      <SubjectRails rails={rails} stats={stats} />
    </section>
  );
}

/**
 * Agent-authored corpus cards for the rails, classified by syllabus unit.
 *
 * `content/ravikishan/<class>/<subject>/<unit>/rails/*.rail.json`
 * (contract: frontend/AGENTS.md §9) carries one canonical card per syllabus
 * unit. Ready cards (draft flipped off, all nine rows written) stream here —
 * grouped under a divider per unit in syllabus order (Class 11 units, then
 * Class 12), after the hand-written opening cards and before the Class 12
 * teaser — so any agent adding content to the corpus changes what the home
 * page shows on the next build, with zero frontend edits. Draft/TODO
 * skeletons and broken files never reach the rail; `--check` reports them
 * instead. Class 12 cards retire the teaser once they exist.
 */
function mergeCorpusRails(): HomeSubjectRail[] {
  let entries: HomeRailEntry[] = [];
  try {
    entries = loadHomeRailCorpus();
  } catch {
    // Corpus unreadable (stripped build) — rails stream the built-in cards.
    return HOME_SUBJECT_RAILS;
  }

  return HOME_SUBJECT_RAILS.map((rail) => {
    const groups = groupReadyByUnit(entries, rail.slug);
    if (groups.length === 0) return rail;
    const last = rail.slides[rail.slides.length - 1];
    const curated = last?.teaser ? rail.slides.slice(0, -1) : rail.slides;
    // Class 12 cards retire the teaser once they exist — the promise is kept.
    const hasClass12 = groups.some(
      (group) => group.classSlug === HOME_RAIL_CLASS_12_SLUG,
    );
    const teaser = last?.teaser && !hasClass12 ? [last] : [];
    /* Icons cross to the client as NAMES (the client resolves them through
       `HOME_RAIL_ICONS`) — a lucide component in these props would throw at
       build: "Functions cannot be passed directly to Client Components." */
    const resolve = (
      data: ReturnType<typeof toRailSlideData>,
    ): HomeSubjectSlide => ({
      ...data,
      icon: data.iconName,
    });
    const grouped: HomeSubjectSlide[] = groups.flatMap((group) => [
      {
        tag: group.classSlug === HOME_RAIL_CLASS_12_SLUG ? "Class 12" : "Class 11",
        title: group.unitTitle,
        rows: [],
        href: `/${group.classSlug}/${rail.slug}`,
        icon: rail.icon,
        unitDivider: {
          unitId: group.unitId,
          unitTitle: group.unitTitle,
          meta: `${group.classSlug === HOME_RAIL_CLASS_12_SLUG ? "Class 12" : "Class 11"} · ${group.entries.length} card${group.entries.length === 1 ? "" : "s"}`,
        },
      },
      ...group.entries.map((entry) => resolve(toRailSlideData(entry))),
    ]);
    const slides: HomeSubjectSlide[] = [...curated, ...grouped, ...teaser];
    return { ...rail, duration: rescaleDuration(rail.duration, rail.slides.length, slides.length), slides };
  });
}

/**
 * Keep the slide speed constant as agent cards join a rail: the curated
 * duration covers the curated slide count, so each slide keeps ~the same
 * seconds-per-card no matter how many corpus cards agents add.
 */
function rescaleDuration(base: string, baseSlides: number, slides: number): string {
  const seconds = Number.parseFloat(base);
  if (!Number.isFinite(seconds) || baseSlides <= 0 || slides <= baseSlides) {
    return base;
  }
  return `${Math.round((seconds / baseSlides) * slides)}s`;
}
