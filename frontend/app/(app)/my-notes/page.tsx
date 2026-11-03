import type { Metadata } from "next";
import { MyNotesView } from "@/components/study/my-notes-view";

export const metadata: Metadata = {
  title: "My Notes",
  description: "Your own notes and annotations, kept separate from the curriculum notes.",
};

export default function Page() {
  return <MyNotesView />;
}
