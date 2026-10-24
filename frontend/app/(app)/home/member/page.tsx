import type { Metadata } from "next";
import { MemberHome } from "@/components/home/tier-interfaces";
import { TierHomeGate } from "@/components/home/tier-home-gate";

export const metadata: Metadata = {
  title: "Member | Ravikisan's Platform",
  description: "The Member interface — search, Class 11 notes, formula sheets and progress.",
};

export default function MemberHomePage() {
  return (
    <TierHomeGate tier="member">
      <MemberHome />
    </TierHomeGate>
  );
}
