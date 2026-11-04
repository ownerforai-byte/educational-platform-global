import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = {
  title: "Features",
  description: "Everything the platform offers — tier by tier. See what Member, Plus, Pro and Owner unlock.",
};

export default function FeaturesPage() {
  return (
    <UnderDevelopment
      title="Features"
      description="A full feature grid showing exactly what each tier unlocks — from free flashcards to full entrance prep."
      backHref="/plans"
      backLabel="View Plans"
    />
  );
}
