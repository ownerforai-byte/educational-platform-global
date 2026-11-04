import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = { title: "Certificates", description: "Your unit completion certificates." };

export default function CertificatesPage() {
  return (
    <UnderDevelopment
      title="Certificates"
      description="Unit and subject completion certificates — earned automatically as you finish units."
      backHref="/progress"
      backLabel="Back to Progress"
    />
  );
}
