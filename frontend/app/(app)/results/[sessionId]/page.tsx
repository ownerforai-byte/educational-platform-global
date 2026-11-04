import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = { title: "Quiz Results", description: "Your quiz session results." };

export default async function ResultsPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId: _ } = await params;
  return (
    <UnderDevelopment
      title="Quiz Results"
      description="Score, time taken, question-by-question review and correct answers with explanations."
      backHref="/practice"
      backLabel="Back to Practice Hub"
    />
  );
}
