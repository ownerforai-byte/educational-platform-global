import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = { title: "Announcements", description: "Platform announcements and updates." };

export default function AnnouncementsPage() {
  return (
    <UnderDevelopment
      title="Announcements"
      description="New features, exam date notices, content additions and platform news."
      backHref="/notice"
      backLabel="Back to Notice Board"
    />
  );
}
