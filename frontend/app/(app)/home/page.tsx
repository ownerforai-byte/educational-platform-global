import { getTheoremIndex } from "@/lib/theorems";
import { getDerivationIndex } from "@/lib/derivations";
import { HomeCommandCenter } from "@/components/home/home-command-center";
import { HomeIntroduction } from "@/components/home/home-introduction";
import { HomeOwnerNotice } from "@/components/home/home-owner-notice";
import { DirectoryCard } from "@/features/credits";

export const metadata = {
  title: "Ravikisan's Platform",
  description: "NEB Class 11 & 12 complete curriculum: interactive 3D science labs, computational solvers, step-by-step theorem proofs, derivations, AI quizzes, and curated notes.",
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

      {/* Welcome introduction: the platform story + 4-step learning journey */}
      <HomeIntroduction />

      {/* Owner notice — public, never gated. Owner intro + internal login. */}
      <HomeOwnerNotice />

      {/* Unified academic directory — one card, gated behind Gmail sign-in.
          Hero + intro above stay public and structurally unchanged; the AI
          Tutor entry inside the card stays free and public. */}
      <DirectoryCard />
    </div>
  );
}
