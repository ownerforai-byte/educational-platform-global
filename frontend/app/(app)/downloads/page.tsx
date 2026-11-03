import type { Metadata } from "next";
import { DownloadsView } from "@/components/study/downloads-view";

export const metadata: Metadata = {
  title: "Downloads",
  description: "Offline unit packs with concept notes, past questions, drills and formulas.",
};

export default function Page() {
  return <DownloadsView />;
}
