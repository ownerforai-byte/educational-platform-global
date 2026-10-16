import { HomeAudience } from "@/components/home/home-audience";
import { HomeSubjectRails } from "@/components/home/home-subject-rails";
import { HomeFeaturesSparkGate } from "@/components/home/home-features-spark-gate";

export const metadata = {
  title: "Ravikisan's Platform",
  description:
    "NEB Class 11 & 12 complete curriculum: interactive 3D science labs, computational solvers, step-by-step theorem proofs, derivations, Veer quizzes, and curated notes. Login works after administrative approval and system verification only.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20">
      {/* One route, two audiences: signed-in viewers get the member home
          (six subject rails behind the Spark gate — owner + Pro pass);
          signed-out visitors get the designed public home with the standing
          access message and everything that is open without an account.
          The rails are a SERVER component (node:fs data modules), so they are
          rendered here and passed into the client switcher as a prop — the
          switcher itself must never import them. */}
      <HomeAudience
        member={
          <HomeFeaturesSparkGate>
            <HomeSubjectRails />
          </HomeFeaturesSparkGate>
        }
      />
    </div>
  );
}
