import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = {
  title: "Platform Status",
  description: "Live status of NEB Study Vault services.",
};

export default function StatusPage() {
  return (
    <UnderDevelopment
      title="Platform Status"
      description="Live health check for the backend, frontend and content delivery — coming soon."
      backHref="/home"
      backLabel="Back to Home"
    />
  );
}
