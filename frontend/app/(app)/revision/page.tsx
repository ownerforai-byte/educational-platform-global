import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = {
  title: "Quick Revision",
  description: "Full-screen focused revision mode using spaced repetition flashcards.",
};

export default function RevisionPage() {
  return (
    <UnderDevelopment
      title="Quick Revision Mode"
      description="Full-screen focused flashcard sessions from your SRS deck — pick a topic and revise in minutes."
      backHref="/srs"
      backLabel="Back to Spaced Repetition"
    />
  );
}
