import { HomeAudience } from "@/components/home/home-audience";
import { HomeIntroduction } from "@/components/home/home-introduction";
import { HomeFeaturesSparkGate } from "@/components/home/home-features-spark-gate";

export const metadata = {
  title: "Study workspace | Ravikisan's Platform",
  description: "Study resources for NEB Class 11 and 12: subject notes, past papers, formula sheets and interactive labs. An approved account is required; access depends on your plan.",
};

export default function HomePage() {
  return (
    <HomeAudience
      member={
        <HomeFeaturesSparkGate>
          <HomeIntroduction />
        </HomeFeaturesSparkGate>
      }
    />
  );
}
