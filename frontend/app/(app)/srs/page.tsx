import type { Metadata } from "next";
import { SrsView } from "@/components/study/srs-view";

export const metadata: Metadata = {
  title: "Spaced Repetition",
  description:
    "Flashcards from concept notes and past questions, scheduled with SM-2.",
};

export default function Page() {
  return <SrsView />;
}
