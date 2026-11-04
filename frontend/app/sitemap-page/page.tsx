import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = {
  title: "Site Map",
  description: "A full human-readable map of every page on NEB Study Vault.",
};

export default function SitemapPage() {
  return (
    <UnderDevelopment
      title="Site Map"
      description="Every page on the platform organized by section — for quick navigation."
      backHref="/"
      backLabel="Back to Home"
    />
  );
}
