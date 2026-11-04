import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the NEB Study Vault team.",
};

export default function ContactPage() {
  return (
    <UnderDevelopment
      title="Contact Us"
      description="Send us a message — feedback, questions, bug reports or partnership enquiries."
      backHref="/"
      backLabel="Back to Home"
    />
  );
}
