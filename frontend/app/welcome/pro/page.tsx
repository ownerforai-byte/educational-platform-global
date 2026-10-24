import type { Metadata } from "next";
import { ProWelcome } from "@/components/home/tier-welcome-interfaces";
import { TierWelcomeGate } from "@/components/home/tier-home-gate";

export const metadata: Metadata = {
  title: "Welcome — Pro | Ravikisan's Platform",
  description: "The Pro welcome — every index, derivations, PDF library and knowledge hubs.",
};

export default function ProWelcomePage() {
  return (
    <TierWelcomeGate tier="pro">
      <ProWelcome />
    </TierWelcomeGate>
  );
}
