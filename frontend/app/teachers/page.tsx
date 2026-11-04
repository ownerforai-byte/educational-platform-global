import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = {
  title: "Teacher Portal",
  description: "Assign topics, track class progress and manage your students on NEB Study Vault.",
};

export default function TeachersPage() {
  return (
    <UnderDevelopment
      title="Teacher Portal"
      description="Assign topics to classes, track student progress, flag weak units and manage your classroom — joining the waitlist opens early access."
      backHref="/"
      backLabel="Back to Home"
    />
  );
}
