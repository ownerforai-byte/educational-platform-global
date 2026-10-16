import { HomeSubjectRails } from "@/components/home/home-subject-rails";
import { HomeFeaturesSparkGate } from "@/components/home/home-features-spark-gate";

export const metadata = {
  title: "Ravikisan's Platform",
  description: "NEB Class 11 & 12 complete curriculum: interactive 3D science labs, computational solvers, step-by-step theorem proofs, derivations, Veer quizzes, and curated notes.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20">
      {/* Six subject rails — the only home section left (every other section
          was removed because it duplicated the header search and the sidebar
          shortcuts). Owners and Pro members see them; everyone else sees the
          Spark lock. */}
      <HomeFeaturesSparkGate>
        <HomeSubjectRails />
      </HomeFeaturesSparkGate>
    </div>
  );
}
