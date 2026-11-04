import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = { title: "Feedback", description: "Send feedback, report issues or suggest topics." };

export default function FeedbackPage() {
  return (
    <UnderDevelopment
      title="Feedback"
      description="Report wrong content, suggest new topics or rate your experience — your feedback shapes the platform."
      backHref="/home"
      backLabel="Back to Home"
    />
  );
}
