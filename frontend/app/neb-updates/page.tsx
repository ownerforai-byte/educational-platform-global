import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = {
  title: "NEB & CDC Updates",
  description: "Official NEB exam date announcements, syllabus changes and CDC notices.",
};

export default function NebUpdatesPage() {
  return (
    <UnderDevelopment
      title="NEB & CDC Updates"
      description="Official exam dates, syllabus additions, CDC notices and NEB announcements — curated in one place."
      backHref="/"
      backLabel="Back to Home"
    />
  );
}
