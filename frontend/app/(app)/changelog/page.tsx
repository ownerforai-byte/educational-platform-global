import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What's new on NEB Study Vault — feature updates in reverse chronological order.",
};

export default function ChangelogPage() {
  return (
    <UnderDevelopment
      title="Changelog"
      description="Every platform update, new feature and content addition listed in reverse chronological order."
      backHref="/home"
      backLabel="Back to Home"
    />
  );
}
