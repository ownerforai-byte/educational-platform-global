import type { Metadata } from "next";
import { OwnerWelcome } from "@/components/home/tier-welcome-interfaces";
import { TierWelcomeGate } from "@/components/home/tier-home-gate";

export const metadata: Metadata = {
  title: "Welcome — Owner | Ravikisan's Platform",
  description: "The Owner welcome — unlimited sparks, the console, grants and content control.",
};

export default function OwnerWelcomePage() {
  return (
    <TierWelcomeGate tier="owner">
      <OwnerWelcome />
    </TierWelcomeGate>
  );
}
