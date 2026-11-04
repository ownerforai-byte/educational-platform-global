import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = {
  title: "Schools & Institutions",
  description: "Bulk access for schools and colleges. Enquire about institutional plans.",
};

export default function SchoolPage() {
  return (
    <UnderDevelopment
      title="Schools & Institutions"
      description="Institutional plans for schools and colleges — managed accounts, class dashboards and bulk access."
      backHref="/"
      backLabel="Back to Home"
    />
  );
}
