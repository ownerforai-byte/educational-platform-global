import { getTheoremIndex } from "@/lib/theorems";
import { getDerivationIndex } from "@/lib/derivations";
import { getSyllabusByClass } from "@/lib/syllabus";
import { HomeCommandCenter } from "@/components/home/home-command-center";
import { HomeJourneyStrip } from "@/components/home/home-journey-strip";
import { HomeIntroduction } from "@/components/home/home-introduction";
import { HomePortals } from "@/components/home/home-portals";
import { CurriculumTracksHub } from "@/components/home/curriculum-tracks-hub";
import { VirtualLabsCatalog } from "@/components/home/virtual-labs-catalog";
import { AssessmentExamHub } from "@/components/home/assessment-exam-hub";
import { KnowledgeLoksewaHub } from "@/components/home/knowledge-loksewa-hub";
import { AcademicRigorHub } from "@/components/home/academic-rigor-hub";
import { HomeSubjectRails } from "@/components/home/home-subject-rails";
import { OwnerOnly } from "@/features/auth/owner-only";
import { HomeOwnerNotice } from "@/components/home/home-owner-notice";
import { HomeMindStudio } from "@/components/home/home-mind-studio";
import { DirectoryCard } from "@/features/credits";

export const metadata = {
  title: "Ravikisan's Platform",
  description: "NEB Class 11 & 12 complete curriculum: interactive 3D science labs, computational solvers, step-by-step theorem proofs, derivations, Veer quizzes, and curated notes.",
};

async function getTheoremsSummary() {
  try {
    const entries = await getTheoremIndex();
    return { entries };
  } catch {
    return { entries: [] };
  }
}

async function getDerivationsSummary() {
  try {
    const entries = await getDerivationIndex();
    return { entries };
  } catch {
    return { entries: [] };
  }
}

/** classSlug → subjectSlug → entry count (serializable stand-in for a Map). */
function buildByClass(
  entries: { classSlug: string; subjectSlug: string }[]
): Record<string, Record<string, number>> {
  const out: Record<string, Record<string, number>> = {};
  for (const e of entries) {
    out[e.classSlug] ??= {};
    out[e.classSlug][e.subjectSlug] = (out[e.classSlug][e.subjectSlug] ?? 0) + 1;
  }
  return out;
}

export default async function HomePage() {
  const [{ entries: theoremEntries }, { entries: derivationEntries }] =
    await Promise.all([getTheoremsSummary(), getDerivationsSummary()]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20">
      {/* Opening: hero, smart search, portal jump dock, live stats */}
      <HomeCommandCenter
        totalTheorems={theoremEntries.length}
        totalDerivations={derivationEntries.length}
      />

      {/* My Progress strip — the only section that changes per visitor:
          returning students get their completed/in-progress counts plus the
          last topics they opened, newcomers get the "open a topic, it records
          itself" line, guests get the sign-in door. Client component; renders
          a skeleton while loading and nothing at all if the API is down, so
          the sections below never shift. */}
      <HomeJourneyStrip />

      {/* Welcome introduction: the platform story + 4-step learning journey */}
      <HomeIntroduction />

      {/* Explore Fun — the deep-dive hubs of the learning platform: the full
          portal grid, curriculum tracks, the 3D labs catalog, assessment &
          exam prep, knowledge & loksewa, and the academic rigor board. */}
      <HomePortals />
      <CurriculumTracksHub
        class11={getSyllabusByClass("class-11-notes")!}
        class12={getSyllabusByClass("class-12-notes")!}
      />
      <VirtualLabsCatalog />
      <AssessmentExamHub />
      <KnowledgeLoksewaHub />
      <AcademicRigorHub
        theoremEntriesCount={theoremEntries.length}
        theoremByClass={buildByClass(theoremEntries)}
        derivationEntriesCount={derivationEntries.length}
        derivationByClass={buildByClass(derivationEntries)}
      />

      {/* Six subject rails — owner emails only (owner request 2026-10-05:
          "make this features for owner emails only"). The continuous Class 11
          knowledge marquee streams for the OWNER_EMAILS allowlist
          (frontend/lib/owner.ts) and renders null for every guest, student and
          non-owner account — hidden, never redirected. */}
      <OwnerOnly>
        <HomeSubjectRails />
      </OwnerOnly>

      {/* Owner notice — public, never gated. Owner intro + internal login. */}
      <HomeOwnerNotice />

      {/* Diagram Hub launcher (was Mind Studio, then the hub). Server drawing
          with a puter.js fallback. Owner emails only (owner request
          2026-10-05): the section renders inside the owner gate; the
          /mind-studio route and the drawing endpoints enforce the same
          boundary. */}
      <OwnerOnly>
        <HomeMindStudio />
      </OwnerOnly>

      {/* Unified academic directory — one card, gated behind Gmail sign-in.
          Hero + intro above stay public and structurally unchanged; the AI
          Tutor entry inside the card stays free and public. */}
      <DirectoryCard />
    </div>
  );
}
