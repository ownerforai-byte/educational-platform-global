import type { Metadata } from "next";
import { PlusWelcome } from "@/components/home/tier-welcome-interfaces";
import { TierWelcomeGate } from "@/components/home/tier-home-gate";

export const metadata: Metadata = {
  title: "Welcome — Plus | Ravikisan's Platform",
  description: "The Plus welcome — Class 12, journal, PYQ banks and the CEE track.",
};

export default function PlusWelcomePage() {
  return (
    <TierWelcomeGate tier="plus">
      <PlusWelcome />
    </TierWelcomeGate>
  );
}
