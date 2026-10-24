import type { Metadata } from "next";
import { PlusHome } from "@/components/home/tier-interfaces";
import { TierHomeGate } from "@/components/home/tier-home-gate";

export const metadata: Metadata = {
  title: "Plus | Ravikisan's Platform",
  description: "The Plus interface — Journal, PYQ banks, worked numericals and the CEE track.",
};

export default function PlusHomePage() {
  return (
    <TierHomeGate tier="plus">
      <PlusHome />
    </TierHomeGate>
  );
}
