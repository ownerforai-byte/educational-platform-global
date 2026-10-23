import type { Metadata } from "next";
import { HomeIntroduction } from "@/components/home/home-introduction";
import { HomeSubjectRails } from "@/components/home/home-subject-rails";
import { HomeSections } from "@/components/home/home-sections";
import { HomeFeaturesSparkGate } from "@/components/home/home-features-spark-gate";

export const metadata: Metadata = {
  title: "Study | Ravikisan's Platform",
  description:
    "Curriculum-aligned study tools for NEB Class 11 and 12: notes, past papers, formula sheets and interactive science resources.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HomeFeaturesSparkGate>
        <>
          <HomeIntroduction />
          <HomeSubjectRails />
          <HomeSections />
        </>
      </HomeFeaturesSparkGate>
    </div>
  );
}
