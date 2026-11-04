import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Sign up, set your goals, and study smart. Here's how NEB Study Vault works.",
};

export default function HowItWorksPage() {
  return (
    <UnderDevelopment
      title="How It Works"
      description="Three steps: sign up → set your goals → study smart with notes, PYQs and Veer AI."
      backHref="/"
      backLabel="Back to Home"
    />
  );
}
