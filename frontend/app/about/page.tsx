import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = {
  title: "About NEB Study Vault",
  description: "Our mission: smarter students, free Nepal. Learn about the platform, the team and our story.",
};

export default function AboutPage() {
  return (
    <UnderDevelopment
      title="About NEB Study Vault"
      description="Our mission, story and the team behind Nepal's most organized study platform."
      backHref="/"
      backLabel="Back to Home"
    />
  );
}
