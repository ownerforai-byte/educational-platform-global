import type { Metadata } from "next";
import { MemberWelcome } from "@/components/home/tier-welcome-interfaces";
import { TierWelcomeGate } from "@/components/home/tier-home-gate";

export const metadata: Metadata = {
  title: "Welcome — Member | Ravikisan's Platform",
  description: "The Member welcome — what your plan opens and the way to your study desk.",
};

export default function MemberWelcomePage() {
  return (
    <TierWelcomeGate tier="member">
      <MemberWelcome />
    </TierWelcomeGate>
  );
}
