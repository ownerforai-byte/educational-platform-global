import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = {
  title: "Help Center",
  description: "Find answers to common questions about NEB Study Vault.",
};

export default function HelpPage() {
  return (
    <UnderDevelopment
      title="Help Center"
      description="Answers to common questions about plans, sparks, content access and account management."
      backHref="/"
      backLabel="Back to Home"
    />
  );
}
