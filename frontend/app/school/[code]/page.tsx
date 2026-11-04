import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = {
  title: "School Dashboard",
  description: "Class-wide analytics and management for schools on NEB Study Vault.",
};

export default async function SchoolDashboardPage({ params }: { params: Promise<{ code: string }> }) {
  const { code: _ } = await params;
  return (
    <UnderDevelopment
      title="School Dashboard"
      description="Class-wide analytics, student lists and content assignments — invite-only for registered schools."
      backHref="/school"
      backLabel="Back to Schools"
    />
  );
}
