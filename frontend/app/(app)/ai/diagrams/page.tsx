import type { Metadata } from "next";
import { DiagramStudio } from "@/components/ai/diagram-studio";

export const metadata: Metadata = {
  title: "Diagram Hub — detailed labelled diagrams",
  description:
    "Draw detailed, English-labelled study diagrams — researched from real references and rendered as sharp vector figures.",
};

export default function DiagramsPage() {
  return <DiagramStudio />;
}
