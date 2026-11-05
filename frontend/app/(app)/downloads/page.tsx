import type { Metadata } from "next";
import { DownloadsView } from "@/components/study/downloads-view";

export const metadata: Metadata = {
  title: "Offline Study",
  description: "Save unit packs to your device — notes, past questions, drills and formulas readable without an internet connection.",
};

export default function Page() {
  return <DownloadsView />;
}
