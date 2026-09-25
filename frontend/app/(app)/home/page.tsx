import { getTheoremIndex } from "@/lib/theorems";
import { getDerivationIndex } from "@/lib/derivations";
import { HomeCommandCenter } from "@/components/home/home-command-center";
import { HomeIntroduction } from "@/components/home/home-introduction";
import { HomePortals } from "@/components/home/home-portals";

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

      {/* Compact gateway: every other section lives on its own hub page */}
      <HomePortals />
    </div>
  );
}
