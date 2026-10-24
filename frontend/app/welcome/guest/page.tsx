import type { Metadata } from "next";
import { UniversalWelcome } from "@/components/home/tier-welcome-interfaces";
import { TierWelcomeGate } from "@/components/home/tier-home-gate";

export const metadata: Metadata = {
  title: "Welcome | Ravikisan's Platform",
  description: "The universal visitor welcome — browse freely, then Go to sign in.",
};

export default function GuestWelcomePage() {
  return (
    <TierWelcomeGate tier="visitor">
      <UniversalWelcome />
    </TierWelcomeGate>
  );
}
